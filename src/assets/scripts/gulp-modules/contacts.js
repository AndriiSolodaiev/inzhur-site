import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

gsap.set('.footer-contacts-section', { y: 150, opacity: 0 });
window.addEventListener('loaderLoaded', () => {
  gsap.timeline().to(
    '.footer-contacts-section',

    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    },
    '<',
  );
});
