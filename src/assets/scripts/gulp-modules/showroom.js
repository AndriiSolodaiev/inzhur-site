import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

gsap.set('.showroom__block', { y: 100, opacity: 0, filter: 'blur(10px)' });
gsap.set('.showroom__3d', { y: 100, opacity: 0, filter: 'blur(10px)' });

window.addEventListener('loaderLoaded', () => {
  gsap
    .timeline()
    .to(
      '.showroom__block',

      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        filter: 'blur(0px)',
      },
      '<',
    )
    .to(
      '.showroom__3d',

      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        filter: 'blur(0px)',
      },
      '<+=0.2',
    );
});
