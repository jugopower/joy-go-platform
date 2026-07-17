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
