const lenis = new Lenis({
  smooth: true,
});

let scrollBlockCount = 0;
let isScrollBlocked = false;
let videoAtTop = false;

// Function to check if video container is at the top
function checkVideoPosition() {
  const videoContainer = document.querySelector(".video-container");
  const rect = videoContainer.getBoundingClientRect();
  return rect.top <= 10; // Small threshold for better detection
}

// Custom scroll handler with blocking
lenis.on("scroll", (e) => {
  const wasVideoAtTop = videoAtTop;
  videoAtTop = checkVideoPosition();

  // When video first reaches the top, start blocking
  if (videoAtTop && !wasVideoAtTop && !isScrollBlocked) {
    isScrollBlocked = true;
    scrollBlockCount = 0;
    console.log("Video reached top - blocking scrolling for 5 attempts");
  }

  ScrollTrigger.update();
});

// Block all scroll-related events
function blockScrollEvent(e) {
  if (isScrollBlocked && scrollBlockCount < 5) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    scrollBlockCount++;
    console.log(`Scroll blocked: ${scrollBlockCount}/5`);

    if (scrollBlockCount >= 5) {
      isScrollBlocked = false;
      scrollBlockCount = 0;
      console.log("Scrolling unblocked!");
    }
    return false;
  }
}

// Add comprehensive scroll blocking
window.addEventListener("wheel", blockScrollEvent, {
  passive: false,
  capture: true,
});
window.addEventListener("touchmove", blockScrollEvent, {
  passive: false,
  capture: true,
});
window.addEventListener("touchstart", blockScrollEvent, {
  passive: false,
  capture: true,
});
window.addEventListener("touchend", blockScrollEvent, {
  passive: false,
  capture: true,
});
document.addEventListener("wheel", blockScrollEvent, {
  passive: false,
  capture: true,
});
document.addEventListener("scroll", blockScrollEvent, {
  passive: false,
  capture: true,
});

// Block keyboard scrolling
window.addEventListener(
  "keydown",
  (e) => {
    if (isScrollBlocked && scrollBlockCount < 5) {
      // Block arrow keys, page up/down, space, home, end
      if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        scrollBlockCount++;
        console.log(`Scroll blocked (keyboard): ${scrollBlockCount}/5`);

        if (scrollBlockCount >= 5) {
          isScrollBlocked = false;
          scrollBlockCount = 0;
          console.log("Scrolling unblocked!");
        }
        return false;
      }
    }
  },
  { passive: false, capture: true }
);

// Temporarily disable Lenis during blocking
const originalRaf = lenis.raf;
lenis.raf = function (time) {
  if (isScrollBlocked && scrollBlockCount < 5) {
    // Skip Lenis updates during blocking
    return;
  }
  originalRaf.call(this, time);
};

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
  scale: 1.03,
  ease: "power2.inOut",
})
  .to(video, {
    scale: 1.04,
    ease: "power2.inOut",
  })
  .to(video, {
    scale: 1.2,
    height: "110vh",
    ease: "power2.inOut",
  });
