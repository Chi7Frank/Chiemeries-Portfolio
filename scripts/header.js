"use strict";

/* ===== Sticky Header on Scroll ===== */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    function handleScroll() {
        if (window.scrollY > 0) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    window.addEventListener("scroll", handleScroll);

    // run once on load, in case the page loads already scrolled (e.g. via anchor link)
    handleScroll();
});