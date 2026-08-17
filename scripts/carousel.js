"use strict";

/* ===== Certification Carousel ===== */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    let currentIndex = 0;
    let autoplayTimer = null;
    let resumeTimer = null;

    const AUTOPLAY_DELAY = 5000;
    const RESUME_DELAY = 8000; // how long to wait after a click before autoplay resumes

    /* ---- Core render ---- */
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    /* ---- Autoplay ---- */
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            nextSlide();
        }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    /* Pause autoplay after user interaction, then resume after RESUME_DELAY of no further clicks */
    function pauseThenResume() {
        stopAutoplay();

        if (resumeTimer) {
            clearTimeout(resumeTimer);
        }

        resumeTimer = setTimeout(() => {
            startAutoplay();
        }, RESUME_DELAY);
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

    /* ---- Clicking anywhere on a slide also pauses, then resumes ---- */
    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            pauseThenResume();
        });
    });

    /* ---- Init ---- */
    goToSlide(0);
    startAutoplay();
});