/* ═══════════════════════════════════════════
   NNZ — No Numberz
   script.js
   ─────────────────────────────────────────
   Table of Contents:
   1.  Footer year
   2.  Loader
   3.  Navigation scroll effect
   4.  Hamburger / Mobile menu
   5.  Scroll reveal
   6.  Video filter + lightbox
   7.  Gallery lightbox
   8.  Contact form (Formspree AJAX)
═══════════════════════════════════════════ */


/* ─── 1. Footer Year ────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();


/* ─── 2. Loader ─────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 1900);
});


/* ─── 3. Navigation Scroll Effect ───────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ─── 4. Hamburger / Mobile Menu ────────────── */
const hbg = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');

hbg.addEventListener('click', () => {
  const isOpen = hbg.classList.toggle('open');
  mob.classList.toggle('open', isOpen);
  hbg.setAttribute('aria-expanded', isOpen);
  mob.setAttribute('aria-hidden', !isOpen);
});

function closeMenu() {
  hbg.classList.remove('open');
  mob.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  mob.setAttribute('aria-hidden', 'true');
}

// Expose closeMenu globally so inline onclick attributes in the HTML can call it
window.closeMenu = closeMenu;


/* ─── 5. Scroll Reveal ───────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 6. Video Filter + Lightbox ────────────── */

// Filter buttons
document.querySelectorAll('.vf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.vcard').forEach(card => {
      const show = filter === 'all' || card.dataset.artist === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Video lightbox open/close
const vbox      = document.getElementById('vbox');
const vboxFrame = document.getElementById('vboxFrame');

function closeVideoBox() {
  vbox.classList.remove('open');
  vboxFrame.src = '';
}

document.getElementById('vboxClose').addEventListener('click', closeVideoBox);
vbox.addEventListener('click', e => { if (e.target === vbox) closeVideoBox(); });

// Open lightbox on thumbnail click / keyboard
document.querySelectorAll('.vcard-thumb').forEach(thumb => {
  const openVideo = () => {
    const vid = thumb.closest('.vcard').dataset.vid;
    if (!vid || vid.startsWith('REPLACE')) {
      alert('Add a real YouTube video ID to this card in the HTML.');
      return;
    }
    vboxFrame.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
    vbox.classList.add('open');
  };

  thumb.addEventListener('click', openVideo);
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openVideo();
  });
});


/* ─── 7. Gallery Lightbox ────────────────────── */
const gbox    = document.getElementById('gbox');
const gboxImg = document.getElementById('gboxImg');
let galleryItems = [];
let galleryIdx   = 0;

// Build gallery item list from data attributes
document.querySelectorAll('.gitem').forEach((item, i) => {
  galleryItems.push({ src: item.dataset.src, label: item.dataset.label });

  item.addEventListener('click', () => {
    galleryIdx   = i;
    gboxImg.src  = galleryItems[i].src;
    gboxImg.alt  = galleryItems[i].label;
    gbox.classList.add('open');
  });
});

function closeGalleryBox() { gbox.classList.remove('open'); }

document.getElementById('gboxClose').addEventListener('click', closeGalleryBox);
gbox.addEventListener('click', e => { if (e.target === gbox) closeGalleryBox(); });

document.getElementById('gboxPrev').addEventListener('click', () => {
  galleryIdx = (galleryIdx - 1 + galleryItems.length) % galleryItems.length;
  gboxImg.src = galleryItems[galleryIdx].src;
  gboxImg.alt = galleryItems[galleryIdx].label;
});

document.getElementById('gboxNext').addEventListener('click', () => {
  galleryIdx = (galleryIdx + 1) % galleryItems.length;
  gboxImg.src = galleryItems[galleryIdx].src;
  gboxImg.alt = galleryItems[galleryIdx].label;
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeVideoBox();
    closeGalleryBox();
  }
  if (gbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  document.getElementById('gboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('gboxNext').click();
  }
});


/* ─── 8. Contact Form (Formspree AJAX) ───────── */
const form    = document.getElementById('cform');
const status  = document.getElementById('fstatus');
const sendBtn = document.getElementById('fsend');

const SEND_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
  <line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/>
</svg>`;

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Loading state
  sendBtn.disabled    = true;
  sendBtn.textContent = 'Sending…';
  status.className    = 'fstatus';

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      status.className = 'fstatus ok';
      status.textContent = "✓ Message sent! We'll get back to you soon.";
      form.reset();

      // Track conversion in GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label:    'NNZ Contact Form',
        });
      }
    } else {
      const data = await res.json();
      throw new Error(data?.errors?.[0]?.message || 'Submission failed.');
    }
  } catch (err) {
    status.className = 'fstatus err';
    status.textContent = '✗ ' + (err.message || 'Could not send. Email us directly.');
  } finally {
    sendBtn.disabled   = false;
    sendBtn.innerHTML  = 'Send Message ' + SEND_ICON;
  }
});
