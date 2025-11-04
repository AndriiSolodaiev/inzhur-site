import Swiper, { Navigation } from 'swiper';
import { gsap, ScrollTrigger } from 'gsap/all';

function formatNumber(number) {
  let result;

  if (number < 10) {
    result = `0${number}`;
  } else result = `${number}`;

  return result;
}

function updateCounter(swiper) {
  const counter = document.querySelector('.news__swiper-counter');
  if (counter) {
    counter.innerHTML = `
    <span>${formatNumber(swiper.realIndex + 1)}</span>
    <span>/</span>
    <span>${formatNumber(swiper.slides.length)}</span>
    `;
  }
}

new Swiper('.swiper', {
  modules: [Navigation],
  loop: true,
  allowTouchMove: true,
  speed: 1000,

  navigation: {
    prevEl: '.news__swiper-button-prev',
    nextEl: '.news__swiper-button-next',
  },
  on: {
    init() {
      updateCounter(this);
    },
    slideChange() {
      updateCounter(this);
    },
  },
});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  document
    .querySelectorAll(
      '.single-news__back-btn, .single-news__title, .news__date, .news__title, .news__list-container, .news__text-first, .news__swiper-container, .news__text-second, .news__single-img-container , .news__video, .general-btn.news__button, .more-news__title, .progress-card',
    )
    .forEach(block => {
      gsap.fromTo(
        block,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
});
