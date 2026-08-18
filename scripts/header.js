"use strict";

/* ===== Header Behavior: Sticky Scroll + Mobile Hamburger Menu ===== */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Sticky Header on Scroll ---------- */
    const header = document.querySelector(".header");

    if (header) {
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
    }

    /* ---------- Mobile Hamburger Menu ---------- */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.querySelector(".nav-links");

    if (hamburgerBtn && navLinks) {
        const icon = hamburgerBtn.querySelector("i");

        function openMenu() {
            navLinks.classList.add("mobile-open");
            hamburgerBtn.setAttribute("aria-expanded", "true");

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

        function closeMenu() {
            navLinks.classList.remove("mobile-open");
            hamburgerBtn.setAttribute("aria-expanded", "false");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.contains("mobile-open");
            isOpen ? closeMenu() : openMenu();
        }

        hamburgerBtn.addEventListener("click", toggleMenu);

        /* Close the menu automatically when a nav link is clicked */
        const links = navLinks.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        /* Close the menu if the viewport is resized back to desktop width */
        window.addEventListener("resize", () => {
            if (window.innerWidth > 640 && navLinks.classList.contains("mobile-open")) {
                closeMenu();
            }
        });
    }

});