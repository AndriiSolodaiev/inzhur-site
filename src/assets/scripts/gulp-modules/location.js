import googleMap from '../modules/map/map';
import { gsap, ScrollTrigger } from 'gsap/all';
import { animateOnScroll } from '../modules/effects/animateOnsScroll';
import { animateCards } from '../modules/effects/animateCards';

gsap.registerPlugin(ScrollTrigger);

googleMap();

// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('.nearby-title, .nearby-item').forEach(block => {
//     gsap.fromTo(
//       block,
//       { y: 100, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         scrollTrigger: {
//           trigger: block,
//           start: 'top 80%',
//           toggleActions: 'play none none none',
//         },
//       },
//     );
//   });
// });

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.harmony-section',
    start: 'top bottom',
    end: 'bottom top',
    //  onLeave: self => self.kill(),
    scrub: 1,
  },
});

aboutTl
  .fromTo(
    '.harmony-sky-img',
    { scale: 1.05, yPercent: -10 },
    { scale: 1.05, yPercent: 5, ease: 'none' },
    '<',
  )
  .fromTo('.harmony-house-wrapper  img', { scale: 1 }, { scale: 1.1, ease: 'none' }, '<');


  animateCards(".nearby-item")