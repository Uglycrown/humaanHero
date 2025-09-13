// 1. Initialize Lenis for smooth scrolling
const lenis = new Lenis();

// 2. Tell ScrollTrigger to update on every scroll event fired by Lenis
// This is a crucial step for synchronization.
lenis.on("scroll", ScrollTrigger.update);

// 3. Use GSAP's ticker to drive Lenis's animation frame requests.
// This ensures both libraries are perfectly synchronized on the same loop.
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // lenis needs time in milliseconds
});
gsap.ticker.lagSmoothing(0);

// 4. Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 5. Create the GSAP timeline for the scroll-based animation
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: ".hero-content",
  },
});

// 6. Define the animations on the timeline
tl.to(".video", {
  width: "70%",
  height: "80%",
  borderRadius: "30px",
  ease: "power1.inOut",
});

tl.to(
  ".video-container",
  {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "1.3vw",
    ease: "power1.inOut",
  },
  "<" // The "<" ensures this animation starts at the same time as the one above
);
