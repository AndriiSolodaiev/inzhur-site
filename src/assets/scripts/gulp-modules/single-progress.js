import Swiper, { Autoplay, EffectFade, Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);
console.log('floors');
const swiper = new Swiper('.swiper-sp', {
  modules: [Navigation],
  slidesPerView: 1,
  speed: 800,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,

  spaceBetween: 0,
});

document.addEventListener('DOMContentLoaded', function() {
  gsap.timeline().fromTo(".page-title__wrap", {
    y:-150,
    opacity:0
  }, {
    y:0,
    opacity:1
  })
})