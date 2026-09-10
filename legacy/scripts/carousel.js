"use strict";

/* ===== Certification Carousel ===== */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const track = carousel.querySelector("[data-carousel-track]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");

    // Original slides BEFORE we touch the DOM
    const realSlides = Array.from(track.children);
    const realCount = realSlides.length;

    /* ---- Clone the first slide and append it to the end ---- */
    const firstClone = realSlides[0].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    firstClone.classList.add("is-clone");
    track.appendChild(firstClone);

    // Now query slides AGAIN so it includes the clone
    const allSlides = Array.from(track.children); // length = realCount + 1

    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    let currentIndex = 0; // always refers to allSlides index
    let autoplayTimer = null;
    let resumeTimer = null;
    let isResetting = false; // guards against interaction during the silent jump

    const AUTOPLAY_DELAY = 5000;
    const RESUME_DELAY = 8000;
    const TRANSITION_MS = 500; // must match your CSS transition duration

    /* ---- Core render ---- */
    function setPosition(index, animate = true) {
        track.style.transition = animate ? "" : "none";
        track.style.transform = `translateX(-${index * 100}%)`;
        if (!animate) {
            // force reflow so the next transition doesn't get skipped
            void track.offsetHeight;
            track.style.transition = "";
        }
    }

    function updateDots(realIndex) {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === realIndex);
        });
    }

    /* ---- Move forward one slide (this is the only direction that hits the clone) ---- */
    function nextSlide() {
        if (isResetting) return;

        currentIndex++;
        setPosition(currentIndex, true);

        // Did we just animate onto the clone?
        if (currentIndex === realCount) {
            isResetting = true;
            // Wait for the slide transition to finish, THEN jump silently
            setTimeout(() => {
                setPosition(0, false); // no animation, instant jump to real slide 1
                currentIndex = 0;
                isResetting = false;
            }, TRANSITION_MS);
        }

        updateDots(currentIndex % realCount);
    }

    /* ---- Move backward (no clone needed on this side for a "next" forever loop,
       but if you also want infinite backward, you'd clone the LAST slide at the
       start too — see note below) ---- */
    function prevSlide() {
        if (isResetting) return;

        if (currentIndex === 0) {
            // jump silently to just past the last real slide, then animate back
            setPosition(realCount, false);
            currentIndex = realCount;
            // next frame, animate to realCount - 1
            requestAnimationFrame(() => {
                currentIndex = realCount - 1;
                setPosition(currentIndex, true);
            });
        } else {
            currentIndex--;
            setPosition(currentIndex, true);
        }

        updateDots(currentIndex % realCount);
    }

    /* ---- Dots always jump to a real slide directly ---- */
    function goToSlide(realIndex) {
        if (isResetting) return;
        currentIndex = realIndex;
        setPosition(currentIndex, true);
        updateDots(currentIndex);
    }

    /* ---- Autoplay ---- */
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function pauseThenResume() {
        stopAutoplay();
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAutoplay, RESUME_DELAY);
    }

    /* ---- Button events ---- */
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            pauseThenResume();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            pauseThenResume();
        });
    }

    /* ---- Dot events ---- */
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            goToSlide(i);
            pauseThenResume();
        });
    });

    /* ---- Clicking a slide pauses autoplay ---- */
    allSlides.forEach((slide) => {
        slide.addEventListener("click", () => pauseThenResume());
    });

    /* ---- Init ---- */
    setPosition(0, false);
    updateDots(0);
    startAutoplay();
});