const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");

const navItems =
    document.querySelectorAll(".nav-links a");

const themeToggle =
    document.getElementById("themeToggle");

const scrollProgress =
    document.getElementById("scrollProgress");


/* =========================================
   MOBILE MENU
========================================= */

const setMenuOpen = isOpen => {
    navLinks.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-xmark", isOpen);
    icon.classList.toggle("fa-bars", !isOpen);
};

menuToggle.setAttribute("aria-controls", "navLinks");
setMenuOpen(false);
menuToggle.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("open"));
});


/* Close menu after clicking */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        setMenuOpen(false);

    });

});

document.addEventListener("click", event => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenuOpen(false);
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >=
            sectionTop -
            sectionHeight * 0.25
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   DARK / LIGHT MODE
========================================= */

const applyTheme = theme => {
    const isLight = theme === "light";
    document.body.classList.toggle("light-mode", isLight);
    themeToggle.textContent = isLight ? "☾" : "☀";
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    themeToggle.title = `Switch to ${isLight ? "dark" : "light"} theme`;
};

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
});


/* =========================================
   SCROLL PROGRESS
========================================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / pageHeight) * 100;

    scrollProgress.style.width =
        `${progress}%`;

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .about-card, .skill-box, .project-card, .timeline-item, .blog-card, .contact-button"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});
