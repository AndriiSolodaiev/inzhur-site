import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  gsap.utils.toArray('.payment__block').forEach(block => {
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

document.addEventListener('DOMContentLoaded', function() {
  gsap.to('#decoration-ellipse', {
    rotation: 360,
    duration: 5,
    transformOrigin: '50% 50%',
    repeat: -1,
    ease: 'none',
  });
});
