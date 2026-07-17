const menuButton = document.getElementById('menuButton');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const drawerClose = document.getElementById('drawerClose');
const backToTop = document.getElementById('backToTop');
const yearNode = document.getElementById('year');
const shareButton = document.getElementById('shareButton');

function openDrawer() {
  mobileDrawer.classList.add('open');
  mobileDrawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  mobileDrawer.classList.remove('open');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  drawerBackdrop.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  expanded ? closeDrawer() : openDrawer();
});

drawerClose?.addEventListener('click', closeDrawer);
drawerBackdrop?.addEventListener('click', closeDrawer);

mobileDrawer?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 420) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

yearNode.textContent = new Date().getFullYear();

shareButton?.addEventListener('click', async () => {
  const shareData = {
    title: '朱老師 AI 圍棋教學平台',
    text: '30+年教學經驗 × AI 圍棋分析 × 個人化教學',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert('網站連結已複製');
    } else {
      alert(window.location.href);
    }
  } catch (error) {
    console.log(error);
  }
});

// Build 010.7 registration and LINE sharing
const registerForm = document.getElementById('registerForm');
const copyRegister = document.getElementById('copyRegister');
const lineRegister = document.getElementById('lineRegister');
const smsRegister = document.getElementById('smsRegister');
const registerStatus = document.getElementById('registerStatus');

function buildRegisterMessage() {
  const name = document.getElementById('regName')?.value.trim() || '';
  const phone = document.getElementById('regPhone')?.value.trim() || '';
  const level = document.getElementById('regLevel')?.value || '';
  const course = document.getElementById('regCourse')?.value || '';
  const note = document.getElementById('regNote')?.value.trim() || '無';
  return `朱老師您好，我想洽詢圍棋課程。\n姓名：${name}\n電話：${phone}\n目前棋力：${level}\n課程需求：${course}\n其他需求：${note}`;
}

function validateRegister() {
  if (!registerForm?.reportValidity()) return false;
  return true;
}

copyRegister?.addEventListener('click', async () => {
  if (!validateRegister()) return;
  const text = buildRegisterMessage();
  try {
    await navigator.clipboard.writeText(text);
    registerStatus.textContent = '報名內容已複製，可貼到 LINE 傳給朱老師。';
  } catch {
    registerStatus.textContent = text;
  }
});

lineRegister?.addEventListener('click', (event) => {
  event.preventDefault();
  if (!validateRegister()) return;
  const text = encodeURIComponent(buildRegisterMessage());
  window.location.href = `https://line.me/R/msg/text/?${text}`;
});

smsRegister?.addEventListener('click', (event) => {
  if (!validateRegister()) {
    event.preventDefault();
    return;
  }
  smsRegister.href = `sms:0931399910&body=${encodeURIComponent(buildRegisterMessage())}`;
});
