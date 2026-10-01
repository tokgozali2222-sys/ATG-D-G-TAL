/* =========================================================
   ATG DIGITAL
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       ELEMENTS
       --------------------------------------------------------- */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    /* ---------------------------------------------------------
       HEADER SCROLL
       --------------------------------------------------------- */

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* ---------------------------------------------------------
       MOBILE MENU
       --------------------------------------------------------- */

    const closeMobileMenu = () => {
        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    };


    const openMobileMenu = () => {
        if (!mobileMenu) return;

        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
        }
    };


    if (menuToggle && mobileMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.contains("active");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });


        /* Close menu when clicking a navigation link */

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (!mobileMenu.classList.contains("active")) {
                return;
            }

            const clickedInsideMenu = mobileMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }

        });

    }


    /* ---------------------------------------------------------
       ESCAPE KEY
       --------------------------------------------------------- */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* ---------------------------------------------------------
       RESIZE CONTROL
       --------------------------------------------------------- */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }

    });


    /* ---------------------------------------------------------
       SCROLL REVEAL
       --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".reveal, .service-item, .work-card, .process-item, .about-content, .contact-content"
    );


    if ("IntersectionObserver" in window && revealElements.length) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* ---------------------------------------------------------
       SMOOTH INTERNAL NAVIGATION
       --------------------------------------------------------- */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerOffset = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* ---------------------------------------------------------
       ACTIVE NAVIGATION
       --------------------------------------------------------- */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.site-nav a[href^="#"], .mobile-menu a[href^="#"]'
    );


    if (
        "IntersectionObserver" in window &&
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        const linkTarget =
                            link.getAttribute("href");

                        if (linkTarget === `#${currentId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }

                    });

                });

            },
            {
                threshold: 0.35,
                rootMargin: "-15% 0px -55% 0px"
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* ---------------------------------------------------------
       CURRENT YEAR
       --------------------------------------------------------- */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* ---------------------------------------------------------
       IMAGE LOADING
       --------------------------------------------------------- */

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

        if (image.complete) {
            image.classList.add("loaded");
        }

    });


    /* ---------------------------------------------------------
       REDUCED MOTION
       --------------------------------------------------------- */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* ---------------------------------------------------------
       PREVENT DOUBLE TAP ZOOM ON INTERACTIVE ELEMENTS
       --------------------------------------------------------- */

    const interactiveElements = document.querySelectorAll(
        "button, .button, .menu-toggle"
    );

    interactiveElements.forEach((element) => {

        element.addEventListener(
            "touchend",
            () => {},
            { passive: true }
        );

    });


    /* ---------------------------------------------------------
       PAGE READY
       --------------------------------------------------------- */

    document.documentElement.classList.add("js-ready");

});
