import Swiper, { Navigation, Autoplay } from 'swiper';
import { gsap, ScrollTrigger } from 'gsap/all';

function formatNumber(number) {
  let result;

  if (number < 10) {
    result = `0${number}`;
  } else result = `${number}`;

  return result;
}

function updateCounter(swiper) {
  const counter = document.querySelector('.swiper__counter');
  if (counter) {
    counter.innerHTML = `
    <span>${formatNumber(swiper.realIndex + 1)}</span>
    <span>/</span>
    <span>${formatNumber(swiper.slides.length)}</span>
    `;
  }
}

new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  loop: true,
  allowTouchMove: true,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: '.swiper__button-prev',
    nextEl: '.swiper__button-next',
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
  document.querySelectorAll('.offer, .harmony, .conditions').forEach(block => {
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

  const requirementsBlock = document.querySelectorAll(
    '.requirements__title, .require-documents__item',
  );

  gsap.fromTo(
    requirementsBlock,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: requirementsBlock[0],
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    },
  );

  const planElements = document.querySelectorAll('.plan__logo, .plan__subtitle, .plan__button');

  gsap.fromTo(
    planElements,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: planElements[0],
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    },
  );
});

ScrollTrigger.create({
  trigger: '.conditions',
  pin: true,
  start: 'top top',
  end: () => '+=' + document.querySelector('.requirements').offsetHeight,
  pinSpacing: false,
});
