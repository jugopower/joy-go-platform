// Joy Go Platform Build 008.2 — guarded interactive controls
(() => {
  "use strict";

  const byId = (id) => document.getElementById(id);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const safely = (fn) => {
    try {
      fn();
    } catch (error) {
      console.error("Joy Go interaction error:", error);
    }
  };

  // Footer year
  const year = byId("year");
  if (year) year.textContent = new Date().getFullYear();

  // Daily Go tip: optional because Build 008 hero may not contain this element.
  const dailyTip = byId("dailyTip");
  if (dailyTip) {
    const tips = [
      "攻擊的目的，不一定是殺棋，而是取得利益。",
      "厚勢不是用來圍地，而是用來攻擊。",
      "先處理弱棋，再考慮進攻對手。",
      "領先時選擇簡明，落後時尋找變化。",
      "落子前先問：這一手的目的到底是什麼？",
      "局部便宜，不一定等於全局有利。",
      "能輕靈處理，就不要把棋走重。"
    ];
    const today = new Date();
    const tipIndex = (today.getFullYear() + today.getMonth() + today.getDate()) % tips.length;
    dailyTip.textContent = tips[tipIndex];
  }

  // Critical visibility safety for Safari.
  const showEverything = () => {
    all(".reveal").forEach((element) => {
      element.classList.add("visible", "is-visible");
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";
    });
  };
  showEverything();
  window.addEventListener("pageshow", showEverything);

  // Independent iPad/mobile drawer.
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const drawer = byId("mobileDrawer");
  const backdrop = byId("drawerBackdrop");
  const drawerClose = byId("drawerClose");
  const backToTop = byId("backToTop");

  const drawerAvailable = menuButton && drawer && backdrop && drawerClose;
  const drawerIsOpen = () => Boolean(drawer && drawer.classList.contains("is-open"));

  const closeDrawer = () => {
    if (!drawerAvailable) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "開啟主選單");
    window.setTimeout(() => {
      if (!drawerIsOpen()) backdrop.hidden = true;
    }, 280);
  };

  const openDrawer = () => {
    if (!drawerAvailable) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    document.body.classList.add("drawer-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "關閉主選單");
  };

  if (drawerAvailable) {
    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      drawerIsOpen() ? closeDrawer() : openDrawer();
    });

    drawerClose.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
    all("a", drawer).forEach((link) => link.addEventListener("click", closeDrawer));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawerIsOpen()) closeDrawer();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1280 && drawerIsOpen()) closeDrawer();
    });
  }

  // Course filters.
  const filterButtons = all(".course-filter button[data-filter]");
  const courseCards = all(".course-card[data-category]");
  const filterStatus = byId("courseFilterStatus");

  if (filterButtons.length && courseCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        filterButtons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle("active", selected);
          item.setAttribute("aria-pressed", String(selected));
        });

        let visibleCount = 0;
        courseCards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !show);
          card.hidden = !show;
          if (show) visibleCount += 1;
        });

        if (filterStatus) {
          const label = button.textContent.trim();
          filterStatus.textContent = `目前顯示「${label}」共 ${visibleCount} 項課程`;
        }
      });
    });
  }

  // Registration form.
  const form = byId("registerForm");
  const resultBox = byId("resultBox");
  const resultText = byId("resultText");
  const formStatus = byId("formStatus");
  const copyAgain = byId("copyAgain");
  const smsLink = byId("smsLink");
  let generatedText = "";

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {}
    }
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const success = document.execCommand("copy");
    field.remove();
    return success;
  };

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = byId("name")?.value.trim() || "";
      const phone = byId("phone")?.value.trim() || "";
      const lineName = byId("lineName")?.value.trim() || "";
      const level = byId("level")?.value || "";
      const course = byId("course")?.value || "";
      const message = byId("message")?.value.trim() || "";

      if (!name || !phone || !level || !course) {
        if (formStatus) formStatus.textContent = "請先填寫姓名、電話、棋力與課程需求。";
        return;
      }

      generatedText = `朱老師您好，我想洽詢圍棋課程。

姓名：${name}
電話：${phone}
LINE 顯示名稱：${lineName || "未填"}
目前棋力：${level}
課程需求：${course}
其他需求：${message || "無"}

謝謝。`;

      const copied = await copyText(generatedText);
      if (resultText) resultText.textContent = generatedText;
      if (resultBox) {
        resultBox.hidden = false;
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (formStatus) {
        formStatus.textContent = copied
          ? "報名內容已複製，可直接貼到 LINE 或簡訊傳送。"
          : "已產生報名內容，請長按內容手動複製。";
      }
      if (smsLink) smsLink.href = `sms:0931399910?body=${encodeURIComponent(generatedText)}`;
    });

    form.addEventListener("input", () => form.classList.add("form-active"), { once: true });
  }

  if (copyAgain) {
    copyAgain.addEventListener("click", async () => {
      const copied = await copyText(generatedText);
      if (formStatus) formStatus.textContent = copied ? "已再次複製。" : "請長按報名內容手動複製。";
    });
  }


  // Build 011.7: render editable content from data.js.
  const siteData = window.JOY_GO_DATA || {};

  const experienceGrid = byId("experienceGrid");
  if (experienceGrid && Array.isArray(siteData.teacherExperience)) {
    experienceGrid.innerHTML = siteData.teacherExperience.map((item, index) => `
      <article class="experience-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>${item.badge || ""}</strong>
        <h3>${item.title || ""}</h3>
        <p>${item.description || ""}</p>
      </article>
    `).join("");
  }

  const galleryGrid = byId("galleryGrid");
  if (galleryGrid && Array.isArray(siteData.gallery)) {
    galleryGrid.innerHTML = siteData.gallery.map((item, index) => `
      <button class="gallery-item${item.large ? " gallery-large" : ""}" type="button"
        data-image="${item.image || ""}" data-title="${item.title || "活動相片"}">
        <div class="gallery-photo gallery-data-photo" style="background-image:linear-gradient(145deg,rgba(27,68,49,.45),rgba(181,139,76,.45)),url('${item.image || ""}')"></div>
        <span>${item.title || `活動相片 ${index + 1}`}</span>
      </button>
    `).join("");
  }

  // Build 011.7: iPad-safe gallery lightbox.
  const lightbox = byId("galleryLightbox");
  const lightboxImage = byId("lightboxImage");
  const lightboxTitle = byId("lightboxTitle");
  const lightboxClose = byId("lightboxClose");
  let previousOverflow = "";

  if (lightbox && lightboxImage && lightboxTitle) {
    const openLightbox = (item) => {
      lightboxImage.src = item.dataset.image || "";
      lightboxImage.alt = item.dataset.title || "活動相片";
      lightboxTitle.textContent = item.dataset.title || "";
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => lightboxClose?.focus({ preventScroll: true }));
    };

    const closeLightbox = () => {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      document.body.style.overflow = previousOverflow;
    };

    all(".gallery-item[data-image]").forEach((item) => {
      item.addEventListener("click", () => openLightbox(item));
    });

    lightboxClose?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeLightbox();
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });

    window.addEventListener("pagehide", closeLightbox);
    window.addEventListener("pageshow", () => {
      if (lightbox.hidden) document.body.style.overflow = "";
    });
  }

  // Share and LINE buttons.
  const shareSite = byId("shareSite");
  if (shareSite) {
    shareSite.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        text: "朱老師 AI 圍棋教學平台",
        url: location.href
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch {}
      } else {
        const copied = await copyText(location.href);
        alert(copied ? "網址已複製。" : "請手動複製網址。");
      }
    });
  }

  const lineButton = byId("lineButton");
  if (lineButton) {
    lineButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const text = "朱老師您好，我想洽詢圍棋課程。";
      const copied = await copyText(text);
      alert(copied ? "洽詢文字已複製，請開啟 LINE 貼上傳送。" : text);
    });
  }

  // Current drawer section highlight. Optional on older Safari.
  const drawerLinks = all(".drawer-nav a[data-section]");
  if ("IntersectionObserver" in window && drawerLinks.length) {
    const sections = drawerLinks
      .map((link) => byId(link.dataset.section))
      .filter(Boolean);

    const setActive = (id) => {
      drawerLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.section === id);
      });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, {
      rootMargin: "-22% 0px -62% 0px",
      threshold: [0.05, 0.2, 0.5]
    });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Header shadow and back to top.
  const updateScrollUI = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 700);
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      closeDrawer();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Touch feedback.
  all(".button, .event-card a, .news-content a").forEach((element) => {
    element.addEventListener("pointerdown", () => element.classList.add("is-pressed"));
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      element.addEventListener(eventName, () => element.classList.remove("is-pressed"));
    });
  });
})();


// Build 009: FAQ single-open behavior
(() => {
  const faqItems = Array.from(document.querySelectorAll(".accordion details"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
})();

// Build 011 collapsible contact controls.
(() => {
  const toggle = document.getElementById('contactToggle');
  const actions = document.getElementById('contactActions');
  if (!toggle || !actions) return;
  const close = () => {
    actions.classList.remove('is-open');
    actions.setAttribute('aria-hidden','true');
    toggle.setAttribute('aria-expanded','false');
  };
  toggle.addEventListener('click',(event)=>{
    event.stopPropagation();
    const open = !actions.classList.contains('is-open');
    actions.classList.toggle('is-open',open);
    actions.setAttribute('aria-hidden',String(!open));
    toggle.setAttribute('aria-expanded',String(open));
  });
  actions.addEventListener('click',(event)=>event.stopPropagation());
  document.addEventListener('click',close);
  document.addEventListener('keydown',(event)=>{ if(event.key==='Escape') close(); });
})();
