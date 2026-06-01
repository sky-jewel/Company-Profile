/* Sky Jewel — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Scroll progress ---------- */
  const progress = $('#scrollProgress');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = (scrolled * 100).toFixed(2) + '%';
    nav.classList.toggle('is-scrolled', h.scrollTop > 30);
  };
  const nav = $('#nav');
  const toTop = $('#toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const _onScroll = onScroll;
  window.addEventListener('scroll', () => {
    _onScroll();
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------- Counters ---------- */
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => counterIO.observe(el));

  /* ---------- Hero parallax (light) ---------- */
  const heroPattern = document.querySelector('.hero__pattern');
  const heroGlow1 = document.querySelector('.hero__glow--1');
  const heroGlow2 = document.querySelector('.hero__glow--2');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (heroPattern) heroPattern.style.transform = `translateY(${y * 0.15}px)`;
        if (heroGlow1) heroGlow1.style.transform = `translate(${y * -0.05}px, ${y * 0.15}px)`;
        if (heroGlow2) heroGlow2.style.transform = `translate(${y * 0.05}px, ${y * -0.1}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  /* ---------- Horizontal scroll: vertical wheel -> horizontal ---------- */
  const hscroll = document.getElementById('hscroll');
  if (hscroll) {
    hscroll.addEventListener('wheel', (e) => {
      const canScrollX = hscroll.scrollWidth > hscroll.clientWidth;
      if (!canScrollX) return;
      // Convert vertical wheel to horizontal only when fully in view & user scrolling vertically
      const rect = hscroll.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.6;
      if (inView && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = hscroll.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = hscroll.scrollLeft + hscroll.clientWidth >= hscroll.scrollWidth - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          hscroll.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });
  }

  /* ---------- Language toggle ---------- */
  const langToggle = $('#langToggle');
  const html = document.documentElement;
  const apply = (lang) => {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    $$('[data-en], [data-ar]').forEach((el) => {
      const v = el.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
      if (v != null) el.textContent = v;
    });
    try { localStorage.setItem('sj_lang', lang); } catch {}
  };
  langToggle.addEventListener('click', () => {
    const next = html.getAttribute('lang') === 'ar' ? 'en' : 'ar';
    apply(next);
  });
  // Restore preference
  try {
    const saved = localStorage.getItem('sj_lang');
    if (saved) apply(saved);
  } catch {}

  /* ---------- Smooth anchor scroll w/ offset (already CSS smooth) ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
