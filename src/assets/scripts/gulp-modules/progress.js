import { paginationInit } from '../modules/pagination';
import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

gsap.set('.progress-page__content .progress-card', { y: 100, opacity: 0, filter: 'blur(10px)' });

window.addEventListener('loaderLoaded', () => {
  gsap.timeline().to(
    '.progress-page__content .progress-card ',

    {
      y: 0,
      opacity: 1,
      stagger: 0.2,

      filter: 'blur(0px)',
    },
    '<',
  );
});
paginationInit('.progress-page__content', '.progress-card');
