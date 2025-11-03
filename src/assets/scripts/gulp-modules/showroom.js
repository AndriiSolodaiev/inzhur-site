import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);

gsap.fromTo(
  '.showroom__block',
  {
    yPercent: 10,
    opacity: 0,
  },
  {
    yPercent: 0,
    opacity: 1,
    stagger: 0.2,
  },
);

gsap.fromTo(
  '.showroom__3d',
  {
    yPercent: 10,
    opacity: 0,
  },
  {
    yPercent: 0,
    opacity: 1,
    stagger: 0.2,
  },
);
