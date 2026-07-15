document.getElementById("year").textContent = new Date().getFullYear();

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
const index = (today.getFullYear() + today.getMonth() + today.getDate()) % tips.length;
document.getElementById("dailyTip").textContent = tips[index];

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const form = document.getElementById("registerForm");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const status = document.getElementById("formStatus");
const copyAgain = document.getElementById("copyAgain");
const smsLink = document.getElementById("smsLink");
let generatedText = "";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const success = document.execCommand("copy");
    field.remove();
    return success;
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const lineName = document.getElementById("lineName").value.trim();
  const level = document.getElementById("level").value;
  const course = document.getElementById("course").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !level || !course) {
    status.textContent = "請先填寫姓名、電話、棋力與課程需求。";
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
  resultText.textContent = generatedText;
  resultBox.hidden = false;
  status.textContent = copied
    ? "報名內容已複製，可直接貼到 LINE 或簡訊傳送。"
    : "已產生報名內容，請長按內容手動複製。";

  const encoded = encodeURIComponent(generatedText);
  smsLink.href = `sms:0931399910?body=${encoded}`;
  resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyAgain.addEventListener("click", async () => {
  const copied = await copyText(generatedText);
  status.textContent = copied ? "已再次複製。" : "請長按報名內容手動複製。";
});

document.querySelectorAll(".course-filter button").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".course-filter button").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    const f=button.dataset.filter;
    document.querySelectorAll(".course-card").forEach(card=>{
      card.classList.toggle("is-hidden",f!=="all"&&card.dataset.category!==f);
    });
  });
});
const lb=document.getElementById("galleryLightbox"),lbImg=document.getElementById("lightboxImage"),lbTitle=document.getElementById("lightboxTitle");
document.querySelectorAll(".gallery-item[data-image]").forEach(item=>item.addEventListener("click",()=>{
  lbImg.src=item.dataset.image;lbImg.alt=item.dataset.title;lbTitle.textContent=item.dataset.title;lb.hidden=false;document.body.style.overflow="hidden";
}));
function closeLB(){lb.hidden=true;lbImg.removeAttribute("src");document.body.style.overflow="";}
document.getElementById("lightboxClose").addEventListener("click",closeLB);
lb.addEventListener("click",e=>{if(e.target===lb)closeLB();});
document.getElementById("shareSite").addEventListener("click",async()=>{
  const data={title:document.title,text:"朱老師 AI 圍棋教學平台",url:location.href};
  if(navigator.share){try{await navigator.share(data);}catch(e){}}
  else{await navigator.clipboard.writeText(location.href);alert("網址已複製。");}
});
document.getElementById("lineButton").addEventListener("click",async e=>{
  e.preventDefault();const t="朱老師您好，我想洽詢圍棋課程。";
  try{await navigator.clipboard.writeText(t);alert("洽詢文字已複製，請開啟 LINE 貼上傳送。");}
  catch(err){alert(t);}
});


// Build 007.2: independent iPad / mobile drawer
(() => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const closeButton = document.getElementById("drawerClose");
  const backToTop = document.getElementById("backToTop");

  if (!menuButton || !drawer || !backdrop || !closeButton) return;

  const drawerIsOpen = () => drawer.classList.contains("is-open");

  const openDrawer = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("is-visible"));
    document.body.classList.add("drawer-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "關閉主選單");
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "開啟主選單");
    window.setTimeout(() => {
      if (!drawerIsOpen()) backdrop.hidden = true;
    }, 260);
  };

  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    drawerIsOpen() ? closeDrawer() : openDrawer();
  });

  closeButton.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawerIsOpen()) closeDrawer();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920 && drawerIsOpen()) closeDrawer();
  });

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
})();
