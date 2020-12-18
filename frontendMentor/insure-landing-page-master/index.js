const navToggle = document.querySelector(".nav__toggle");

const navLink = document.querySelector('[data-nav="nav-links"]');

navToggle.addEventListener("click", (event) => {
    let parentLink = document.querySelector("nav ul");
    if (parentLink.classList.contains("nav__links")) {
        navToggle.style.backgroundImage = "url(images/icon-hamburger.svg)";
        parentLink.classList.add("navCloseAni");
        document.body.style.overflow = '';
        setTimeout(() => {
            parentLink.classList.remove("navCloseAni");
            parentLink.classList.remove("nav__links");
        }, 1100);
    } else {
        parentLink.classList.add("nav__links");
        navToggle.style.backgroundImage = "url(images/icon-close.svg)";
        document.body.style.overflow = 'hidden';
    }
});
