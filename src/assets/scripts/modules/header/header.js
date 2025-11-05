import { initSmoothScrolling } from '../scroll/leniscroll';
import device from 'current-device';
import { animateTitleOnScroll } from '../../modules/effects/animateTitle';
import { animateOnScroll } from '../../gulp-modules';
import { gsap, ScrollTrigger } from 'gsap/all';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

initSmoothScrolling();

let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 10; // мінімальна зміна для реагування

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Якщо прокрутка незначна — нічого не робимо
  if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;

  if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
    // Користувач крутить вниз
    header.classList.add('hide');
  } else {
    // Користувач крутить вгору
    header.classList.remove('hide');
  }

  lastScroll = currentScroll;
});

const menuTimeline = gsap.timeline({
  paused: true,
  defaults: { ease: 'power3.out', duration: 1 },
});

const cycleSection = CSSRulePlugin.getRule('.menu-container .cycle-section::after');
menuTimeline
  .to('.menu-overlay', {
    visibility: 'visible',
    pointerEvents: 'all',
    opacity: 1,
    duration: 0.3,
  })
  .from(
    '.menu-overlay .cycle-section__mask',
    {
      scale: 3,
      duration: 1.5,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-overlay .cycle-section__house img',
    {
      scale: 1.5,
      duration: 1.5,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-nav-list .menu-main-link',
    {
      yPercent: -50,
      stagger: 0.15,
      duration: 0.8,
      opacity: 0,
      ease: 'power3.out',
      filter: 'blur(10px)',
    },
    '<+=0.5',
  )
  .from(
    cycleSection,
    {
      yPercent: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    },
    '<',
  )
  .from(
    '.menu-subnav-list .menu-link',
    {
      yPercent: 50,
      filter: 'blur(10px)',
      stagger: {
        each: 0.15, // інтервал між елементами
        from: 'end', // почати з останнього
      },
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
    '<',
  );

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');
  const btnMob = evt.target.closest('[data-mob-call-btn]');
  const overflowMob = document.querySelector('[data-mob-call__overflow]');
  const closeMob = evt.target.closest('[data-mob-call-close]');
  const countryList = evt.target.closest('.iti__country-list');
  const btnUp = evt.target.closest('[data-btn-up]');
  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu = document.querySelector('[data-menu]');
  const menu = document.querySelector('[data-menu]');
  const menuItem = evt.target.closest('.menu-item');
  if (btnMenuTarget || menuItem) {
    const isHidden = menu.classList.contains('hidden');

    if (isHidden) {
      window.dispatchEvent(new Event('stop-scroll'));
      menu.classList.remove('hidden');
      header.classList.add('menu-is-open');

      menuTimeline.play();
    } else {
      window.dispatchEvent(new Event('start-scroll'));
      menuTimeline.reverse();
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 500);

      header.classList.remove('menu-is-open');
    }

    return;
  }
  if (btnUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      overflowMob.classList.add('hidden');
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }

  if (btnMob) {
    if (overflowMob.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflowMob.classList.remove('hidden');
    }
    return;
  }
  if (closeMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hidden');
  }

  if (evt.target === overflowMob) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowMob.classList.add('hidden');
  }
});

const inputs = document.querySelectorAll('.form-field-input');

if (inputs.length) {
  inputs.forEach(field => {
    const input = field.querySelector('.form-field__input');
    if (!input) {
      console.warn('Поле не містить <input>', field);
      return;
    }
    input.addEventListener('focus', () => {
      field.classList.add('is-focused');
    });

    input.addEventListener('blur', () => {
      // прибирати фокус тільки якщо поле порожнє
      if (!input.value) {
        field.classList.remove('is-focused');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.iti__country-list').forEach(el => {
    el.setAttribute('data-lenis-prevent', '');
  });
});

// gsap.to('.page-title__wrap svg', {
//   rotate: 0,
//   duration: 1,
// });

// if (window.location.pathname === '/') {
//   document.querySelector('.loader-wrap').style.display = 'flex';
// }
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader-wrap');
  const percentText = document.querySelector('.loader__percent');
  const lineFill = document.querySelector('.loader__line-fill');

  let percent = 0;
  const speed = 30;

  // Етап 1: Імітація завантаження
  const simulateLoading = setInterval(() => {
    percent += Math.random() * 5;
    if (percent > 90) percent = 90;
    percentText.textContent = `${Math.floor(percent)}%`;
    lineFill.style.width = `${percent}%`;
  }, speed);

  // Етап 2: Коли сторінка реально завантажилась
  window.addEventListener('load', () => {
    clearInterval(simulateLoading);

    let finalProgress = percent;

    const increase = setInterval(() => {
      finalProgress += 2;
      if (finalProgress >= 100) {
        finalProgress = 100;
        clearInterval(increase);

        percentText.textContent = `100%`;
        lineFill.style.width = `100%`;

        // невелика затримка перед стартом основної анімації
        setTimeout(() => startExitAnimation(), 200);
      } else {
        percentText.textContent = `${Math.floor(finalProgress)}%`;
        lineFill.style.width = `${finalProgress}%`;
      }
    }, 30);
  });

  // Етап 3: Основна анімація виходу прелоадера
  function startExitAnimation() {
    const tl = gsap.timeline({
      onComplete: () => {
        loader.classList.add('loaded');
      },
    });

    tl.to('.loader__percent', {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
      .to(
        '.loader__line',
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<',
      )
      .to(
        '.loader-svg-decor',
        {
          yPercent: -100,
          // opacity: 0,
          duration: 1,
          ease: 'none',
        },
        '<',
      )
      .to(
        '.loader-logo',
        {
          y: '-55vh',
          // opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'none',
        },
        '<',
      )
      .to(
        '.loader-left-part',
        {
          xPercent: -100,
          duration: 1.5,
          ease: 'power4.out',
        },
        '<+=0.2',
      )
      .to(
        '.loader-right-part',
        {
          xPercent: 100,
          duration: 1.5,
          ease: 'power4.out',
        },
        '<',
      )
      .call(
        () => {
          window.dispatchEvent(new Event('loaderLoaded'));
          document.querySelector('.header').classList.add('visible');
        },
        null,
        '-=1.2',
      );
  }
});

//Global-animations

window.addEventListener('orientationchange', () => {
  // трохи почекати, поки браузер перерахує розміри
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});

animateOnScroll('.footer-form-section__blocks-wrap .footer-form-section__block', {
  y: 60,
  stagger: 0.2,
});
animateOnScroll('.footer-contacts-section>* ', {
  y: 20,
  stagger: 0.2,
});

// gsap.set('.page-title__wrap', { y: -150, opacity: 0 });
const pageTitle = document.querySelector('.page-title__wrap');
if (pageTitle) {
  gsap.set('.page-svg', { yPercent: -40, opacity: 0, rotate: -20 });
}
// Анімація запускається після завершення лоадера
window.addEventListener('loaderLoaded', () => {
  gsap.set('.page-title__wrap', { y: -150, opacity: 0 });
  const pageTitle = document.querySelector('.page-title__wrap');
  if (!pageTitle) return;

  const tl = gsap.timeline();

  tl.to('.page-title__wrap', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }).to(
    '.page-svg',
    {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
    },
    '<+=0.4',
  );
});
const heroTitle = document.querySelector('.hero-page ');
if (heroTitle) {
  gsap.set('.breadcrumbs>*', { x: -150, opacity: 0, stagger: 0.2 });
  gsap.set('.left-side__subtitle', { yPercent: 20, opacity: 0 });
  gsap.set('.left-side__text-block ', { yPercent: 20, opacity: 0 });
  gsap.set('.left-side__title ', { opacity: 0 });
  gsap.set('.right-side__bg ', { scale: 1.3 });
  gsap.set('.right-side .right-side__overlap', { scale: 0.5, transformOrigin: '0% 100%' });
  // gsap.set('.left-side .left-side__overlap', { scale: 0.5, transformOrigin: '0% 100%' });
  gsap.set('.left-side__down-button', { yPercent: 20, opacity: 0 });
}
export function animateTextByLetters(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  // Зберігаємо перенос рядків
  const htmlWithLetters = el.innerHTML
    .split(/(<br\s*\/?>)/gi)
    .map(part => {
      if (part.match(/<br\s*\/?>/i)) return part;
      return part
        .split('')
        .map(char => {
          if (char === ' ') return ' ';
          return `<span class="char">${char}</span>`;
        })
        .join('');
    })
    .join('');

  el.innerHTML = htmlWithLetters;

  gsap.fromTo(
    `${selector} .char`,
    { opacity: 0, y: 40, filter: 'blur(10px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      stagger: 0.03,
      duration: 0.6,
      ease: 'power3.out',
    },
  );
}
// Анімація запускається після завершення лоадера
window.addEventListener('loaderLoaded', () => {
  const heroTitle = document.querySelector('.hero-page ');
  if (!heroTitle) return;

  const tl = gsap.timeline();

  tl.to('.breadcrumbs>*', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
  })
    .to(
      '.left-side__title',
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,

        ease: 'power2.out',
      },
      '<',
    )
    .to(
      '.right-side__bg',
      {
        scale: 1,

        duration: 0.8,
        ease: 'power2.out',
      },
      '<',
    )
    .add(() => {
      animateTextByLetters('.left-side__title');
    }, '<')
    .to(
      '.left-side__subtitle',
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,

        ease: 'power2.out',
      },
      '<',
    )
    .to(
      '.right-side .right-side__overlap',
      {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      '<',
    )
    // .to(
    //   '.left-side .left-side__overlap',
    //   {
    //     scale: 1,
    //     duration: 1.2,
    //     ease: 'power2.out',
    //   },
    //   '<',
    // )
    .to(
      '.left-side__down-button',
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,

        ease: 'back.out(1.7)',
      },
      '<',
    )
    .to(
      '.left-side__text-block',
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      },
      '<',
    );
});

document.addEventListener('DOMContentLoaded', () => {
  const startPod = window.innerWidth > 768 ? '-100px top' : '0px top';
  const svgHeight = window.innerWidth > 768 ? -40 : -20;
  const titleHeight = window.innerWidth > 768 ? -60 : -40;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: '.page-title__wrap',
        start: startPod,
        end: '300% top',
        scrub: true,
      },
    })
    .fromTo(
      '.page-title__wrap',
      {
        y: 0,
      },
      {
        y: titleHeight,
      },
    )
    .fromTo(
      '.page-title__wrap svg',
      {
        y: 0,
      },
      {
        y: svgHeight,
      },
      '<',
    )
    .fromTo(
      '.page-title__wrap h1',
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
      '<',
    );
});
