import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
import googleMap from '../modules/map/map';
// import device from 'current-device';
// if (device.iphone()) {
//   document.querySelector('html').style.overscrollBehavior = 'none';
// }
googleMap();

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

const swiper = new Swiper('.swiper-advantages', {
  modules: [Navigation],
  slidesPerView: 1,
  speed: 800,
  navigation: {
    nextEl: '[data-advantages-button-next]',
    prevEl: '[data-advantages-button-prev]',
  },
  slidesPerView: 1,
  spaceBetween: 20,
});
if (window.innerWidth < 768) {
  const swiperTechMob = new Swiper('.swiper-tech-mobile', {
    modules: [Navigation],
    slidesPerView: 1,
    speed: 800,
    navigation: {
      nextEl: '[data-tech-button-next]',
      prevEl: '[data-tech-button-prev]',
    },
    slidesPerView: 1,
  });
} else {
  const swiperTech = new Swiper('.swiper-tech-tablet', {
    modules: [Navigation],
    slidesPerView: 1,
    speed: 800,
    navigation: {
      nextEl: '[data-tech-button-next]',
      prevEl: '[data-tech-button-prev]',
    },
    slidesPerView: 1,
  });
}

const swiperProgress = new Swiper('.swiper-progress', {
  slidesPerView: 1,
  speed: 800,

  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    768: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    1024: { slidesPerView: 3 },
  },
});

// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: '.progress-list',
//       start: 'top bottom',
//       end: 'bottom top',
//       //  onLeave: self => self.kill(),
//     },
//   })
//   .fromTo(
//     '.progress-card',
//     {
//       yPercent: 10,
//       opacity: 0,
//     },
//     {
//       yPercent: 0,
//       opacity: 1,
//       stagger: 0.2,
//     },
//   )
//   .fromTo(
//     '.progress-homepage-description-wrap',
//     {
//       opacity: 0,
//       x: -10,
//       yPercent: 10,
//     },
//     {
//       yPercent: 0,
//       x: 0,
//       opacity: 1,
//     },
//     '>-=0.3',
//   );

//hero animation
gsap.set('.video-frame img', { scale: 1.2 });
gsap.set('.hero-promo-wrap .hero-promo-item', { xPercent: -100 });
gsap.set('.hero-bottom-items .hero-bottom-item', { yPercent: 100 });
gsap.set('.hero-bottom-block img', { yPercent: 100 });

window.addEventListener('loaderLoaded', () => {
  gsap
    .timeline()
    .to(
      '.video-frame img',
      {
        scale: 1,
        duration: 1.2,
      },
      '<',
    )
    .to(
      '.hero-bottom-items .hero-bottom-item',
      {
        yPercent: 0,
        stagger: 0.2,
        duration: 1,
      },

      '<',
    )
    .to(
      '.hero-promo-wrap .hero-promo-item',
      {
        xPercent: 0,
        stagger: 0.2,
        duration: 1,
      },
      '<',
    )
    .to(
      '.hero-bottom-block img',
      {
        yPercent: 0,

        duration: 1,
      },
      '<',
    );
});

// 2. Hero піниться (але друга секція налізає)
ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: '+=100%',
  pin: true,
  pinSpacing: false, // <-- без відступу!
});
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.hero-bg',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  })
  .to('.hero-bg', {
    opacity: 1,
    ease: 'none',
  })
  .to(
    '.hero .video-frame img',
    {
      yPercent: -10,
      ease: 'none',
    },
    '<',
  );

// about-project-animation

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about-project',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

aboutTl
  .fromTo(
    '.about-project .sky',
    { scale: 1.05, yPercent: -10 },
    { scale: 1.05, yPercent: 5, ease: 'none' },
    '<',
  )
  .fromTo('.about-project .about-project-img img', { scale: 1 }, { scale: 1.1, ease: 'none' }, '<');

export function animateOnScroll(selector, options = {}) {
  const {
    y = 60,
    x = 0,
    blur = 10,
    delay = 0,
    stagger = 0,
    duration = 0.6,
    ease = 'power2.out',
    start = 'top 80%',
    markers = false,
    scale = 1,
  } = options;

  gsap.fromTo(
    selector,
    {
      y,
      scale,
      x,
      opacity: 0,
      filter: `blur(${blur}px)`,
    },
    {
      y: 0,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      ease,
      delay,
      stagger,
      scale: 1,
      scrollTrigger: {
        trigger: selector,
        start,
        once: true,
        markers,
      },
    },
  );
}
animateOnScroll('.about-project-text', { y: 20, duration: 0.6 });
animateOnScroll('.about-project-video', { y: 20, duration: 0.6, delay: 0.2 });

animateOnScroll('.location-homepage .location-homepage__content .section-title', { y: -60 });
animateOnScroll('.location-homepage .location-homepage__text-wrap', { y: -40, delay: 0.2 });
animateOnScroll('.location-homepage .location-homepage .general-btn', { y: -30, delay: 0.4 });
animateOnScroll('.map-main-wrap', { scale: 0.95, blur: 10, duration: 0.6, delay: 0.6 });

// 🔹 Використання для різних елементів
animateOnScroll('.section.advantages .section-title', { y: -40 });
animateOnScroll('.swiper-advantages', { y: 80, delay: 0.1 });

animateOnScroll('.tech-params .section-title', { y: -40, duration: 0.6 });
animateOnScroll('.tech-params .swipers-tech-wrap', { y: 80, duration: 0.6 });
// 🔹 Приклад для множинних елементів (з затримкою між ними)
const developerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.developer-homepage',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

developerTl.fromTo(
  '.developer-homepage__bg img',
  { scale: 1.05, yPercent: -5 },
  { scale: 1.15, yPercent: 5, ease: 'none' },
  '<',
);

animateOnScroll('.developer-homepage__title-wrap', { y: -40, duration: 0.6 });
animateOnScroll('.developer-homepage .developer-color-block', { y: 40, duration: 0.6 });
animateOnScroll('.developer-homepage .developer-descr-block h3', {
  y: 50,
  duration: 0.6,
  delay: 0.2,
});
animateOnScroll('.developer-homepage .developer-descr-block__text-wrap p', {
  y: 30,
  duration: 0.6,
  delay: 0.2,
  stagger: 0.2,
});
animateOnScroll('.terms-homepage .terms-homepage__title-wrap', { y: -40, duration: 0.6 });

animateOnScroll('.terms-homepage .terms-img-block', {
  y: 60,
});
animateOnScroll('.terms-homepage .terms-banner-block', {
  x: 40,
  duration: 0.6,
  delay: 0.2,
  stagger: 0.2,
});

const fillerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler-3d',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

fillerTl.fromTo(
  '.filler-3d .filler-3d__bg',
  { scale: 1.05, yPercent: -10 },
  { scale: 1.05, yPercent: 10, ease: 'none' },
  '<',
);
animateOnScroll('.filler-3d__content ', { y: -20, duration: 0.8, scale: 1.1 });

animateOnScroll('.filler-3d__content .terms-img-block', {
  y: 60,
});
animateOnScroll('.filler-3d__content .terms-banner-block', {
  x: 40,
  duration: 0.6,
  delay: 0.2,
  stagger: 0.2,
});
animateOnScroll('.progress-homepage .location-homepage__content .section-title', { y: -60 });
animateOnScroll('.progress-homepage .location-homepage__text-wrap', { y: -40, delay: 0.2 });
animateOnScroll('.progress-homepage .location-homepage .general-btn', { y: -30, delay: 0.4 });
animateOnScroll('.progress-homepage .swiper-progress  .progress-card', { y: 60, stagger: 0.2 });

document.addEventListener('DOMContentLoaded', function() {
  // Знаходимо всі блоки з відео
  const videoBlocks = document.querySelectorAll('.video-wrapper');

  videoBlocks.forEach(block => {
    const videoBtn = block.querySelector('.controls-wrap');

    const video = block.querySelector('video');
    videoBtn.classList.add('hidden');
    video.play();
    video.classList.add('playing');

    // Клік по кнопці
    videoBtn.addEventListener('click', function() {
      videoBtn.classList.add('hidden');
      video.play();
      video.classList.add('playing');
    });

    // Коли відео закінчиться — повернути кнопку й опис
    video.addEventListener('ended', function() {
      videoBtn.classList.remove('hidden');

      video.classList.remove('playing');
    });

    // Якщо користувач натисне паузу до кінця — теж повернути кнопку
    video.addEventListener('pause', function() {
      if (video.currentTime < video.duration) {
        videoBtn.classList.remove('hidden');
      }
    });

    //При перемотці по шкалі, приховувати кнопку після відтворення відео
    video.addEventListener('seeked', function() {
      if (!video.paused) {
        videoBtn.classList.add('hidden');
      }
    });
  });
});

// Запуск після завантаження DOM

// function bigTitles() {
//   // Працює тільки на мобільних
//   if (window.innerWidth > 500) return;

//   document.querySelectorAll('[data-big-title]').forEach(el => {
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: el,
//           start: 'top center',
//           end: 'bottom top',
//           scrub: 1,
//         },
//       })
//       .fromTo(el.querySelector('h2'), { xPercent: 10, ease: 'power1' }, { xPercent: -10 })
//       .fromTo(el.querySelector('h3'), { xPercent: -10, ease: 'power1' }, { xPercent: 10 }, '<');
//   });
// }

// bigTitles();
