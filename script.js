const lenis = new Lenis({
  smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector(".video");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
  },
});

tl.to(video, {
  scale: 1.176, // 1 / 0.85 to fill the screen
  ease: "power2.inOut",
}).to(video, {
  scale: 1,
  ease: "power2.inOut",
});
