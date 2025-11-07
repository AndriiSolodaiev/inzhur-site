import googleMap from '../modules/map/map';
import { gsap, ScrollTrigger } from 'gsap/all';
import { animateOnScroll } from '../modules/effects/animateOnsScroll';

gsap.registerPlugin(ScrollTrigger);

googleMap();

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nearby-title, .nearby-item').forEach(block => {
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
