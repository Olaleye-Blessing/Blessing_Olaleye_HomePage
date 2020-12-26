const body = document.querySelector("body");

const toggleBtn = document.querySelector(".nav__toggle");
const nav = document.querySelector("nav");

let allSlides = document.querySelectorAll(".slide");

const nextBtn = document.querySelector(".next-slide");

const prevBtn = document.querySelector(".prev-slide");

let current_slide = 0;

toggleBtn.addEventListener("click", (event) => {
    nav.classList.toggle("active");
    body.classList.toggle("active-body");

    if (body.classList.contains("active-body")) {
        let lastLinkItem = document.querySelector(
            ".nav__links li:last-child a"
        );
        lastLinkItem.addEventListener("keydown", (event) => {
            if (event.key == "Tab" && !event.shiftKey) {
                toggleBtn.focus();
                event.preventDefault();
            }
        });

        toggleBtn.addEventListener("keydown", (event) => {
            if (event.key == "Tab" && event.shiftKey) {
                lastLinkItem.focus();
                event.preventDefault();
            }
        });
    }
});


function moveslide(current) {
    allSlides.forEach((slide) => {
        slide.classList.remove("active-slide");
    });
    allSlides[current].classList.add("active-slide");
}

function nextSlide() {
    current_slide >= allSlides.length - 1
        ? (current_slide = 0)
        : current_slide++;
    moveslide(current_slide);
}

function prevSlide() {
    current_slide <= 0
        ? (current_slide = allSlides.length - 1)
        : current_slide--;
    moveslide(current_slide);
}

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);
