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
    let autoplayStopped = false;

    const AUTOPLAY_DELAY = 5000;

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

    /* Permanently stop autoplay once the user interacts with the carousel */
    function haltAutoplayOnInteraction() {
        autoplayStopped = true;
        stopAutoplay();
    }

    /* ---- Button events ---- */
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            haltAutoplayOnInteraction();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            haltAutoplayOnInteraction();
        });
    }

    /* ---- Dot events ---- */
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            goToSlide(i);
            haltAutoplayOnInteraction();
        });
    });

    /* ---- Clicking anywhere on a slide also stops autoplay ---- */
    slides.forEach((slide) => {
        slide.addEventListener("click", () => {
            haltAutoplayOnInteraction();
        });
    });

    /* ---- Init ---- */
    goToSlide(0);
    startAutoplay();
});