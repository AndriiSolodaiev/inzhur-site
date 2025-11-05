import { gsap, ScrollTrigger, CustomEase, CSSRulePlugin } from 'gsap/all';
import { animateOnScroll } from './index';

gsap.registerPlugin(ScrollTrigger, CustomEase, CSSRulePlugin);
const phraseTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.phrase',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

phraseTL.fromTo(
  '.phrase__bg-container img',
  { scale: 1.05, yPercent: -10 },
  { scale: 1.05, yPercent: 10, ease: 'none' },
  '<',
);

animateOnScroll('.container.phrase__text span', {
  x: 40,
  duration: 0.8,

  stagger: 0.2,
});

const choiceTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.choice__right',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

choiceTL.fromTo(
  '.choice__right img',
  { scale: 1.05, yPercent: -10 },
  { scale: 1.05, yPercent: 10, ease: 'none' },
  '<',
);

animateOnScroll('.choice__left>*', {
  x: 40,
  duration: 0.8,

  stagger: 0.2,
});

const harmonyTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.harmony-section',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

harmonyTL.fromTo(
  '.harmony-sky-wrapper',
  { scale: 1.05, yPercent: -10 },
  { scale: 1.05, yPercent: 10, ease: 'none' },
  '<',
);

animateOnScroll('.harmony-text-content-wrapper ', { y: 60, duration: 1.2, scale: 1.1 });
