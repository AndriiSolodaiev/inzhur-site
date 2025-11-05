import { gsap, ScrollTrigger } from 'gsap/all';
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