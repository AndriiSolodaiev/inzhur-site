import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.company__title, .company-block').forEach(block => {
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
