import { gsap, ScrollTrigger } from 'gsap/all';

global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
gsap.core.globals('ScrollTrigger', ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);
export function animateCards (selector) {
  // if(window.innerWidth< 1024) return
const contentElements = [...document.querySelectorAll(selector)];
const totalContentElements = contentElements.length;

// Loop through each content element to set up animations
contentElements.forEach((el, position) => {
  const isLast = position === totalContentElements - 1;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=100%', // Adjust this as needed
        scrub: true,
      },
    })
    .to(
      el,
      {
        ease: 'none',
        startAt: { filter: 'brightness(100%)' },
        filter: isLast ? 'none' : 'brightness(50%)',
        scale: 0.95,
        borderRadius: 40,
      },
      0,
    )
    .to(
      el.querySelector(`${selector} img`),
      {
        ease: 'power1.in',
        y: -10,
        scale: 1.2,
        rotation: -10,
      },
      0,
    );
});
}

// Get the last card element
// const lastCard = contentElements[contentElements.length - 1];

// const trigger =
//   document.querySelector('.advantages-homepage-inner .section-title-wrap') ||
//   document.querySelector('.terms-page-purchase-inner .section-title-wrap');

// const textGray =
//   document.querySelector('.advantages-homepage-inner .section-title-wrap .text-gray-text') ||
//   document.querySelector('.terms-page-purchase-inner .section-title-wrap .text-gray-text');

// // Main ScrollTrigger for the title wrap
// ScrollTrigger.create({
//   trigger: trigger,
//   start: 'top 10',
//   pin: true,
//   end: () => {
//     // Calculate the end position based on the last card's bottom position
//     const lastCardBottom = lastCard.getBoundingClientRect().bottom; // Get the last card's bottom position relative to the viewport
//     const viewportHeight = window.innerHeight; // Get the height of the viewport

//     return lastCardBottom - viewportHeight + 10; // Adjust the calculation if needed
//   },
//   onEnter: () => {
//     if (window.innerWidth < 1024) {
//       gsap.to(textGray, {
//         opacity: 0,
//         duration: 0.5,
//       });
//     }
//     // gsap.to(textGray, {
//     //   opacity: 0,
//     //   duration: 0.5,
//     // });
//   },
//   onLeave: () => {
//     if (window.innerWidth < 1024) {
//       gsap.to(textGray, {
//         opacity: 1,
//         duration: 0.5,
//       });
//     }
//   },
//   onEnterBack: () => {
//     if (window.innerWidth < 1024) {
//       gsap.to(textGray, {
//         opacity: 0,
//         duration: 0.5,
//       });
//     }
//   },
//   onLeaveBack: () => {
//     if (window.innerWidth < 1024) {
//       gsap.to(textGray, {
//         opacity: 1,
//         duration: 0.5,
//       });
//     }
//   },
//   // onEnterBack: () => {
//   //   gsap.to(textGray, {
//   //     opacity: 1, // Optional: Restore opacity when entering back
//   //     duration: 0.5,
//   //   });
//   // },
// });