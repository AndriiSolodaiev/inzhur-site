import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

gsap.set('.present-content .present-card ', { y: 100, opacity: 0, filter: 'blur(10px)' });

window.addEventListener('loaderLoaded', () => {
  gsap.timeline().to(
    '.present-content .present-card ',

    {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      filter: 'blur(0px)',
    },
    '<',
  );
});
