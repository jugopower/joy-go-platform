const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

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
