const body = document.body;
const toggle = document.querySelector(".mode__toggle");
const spanToggle = document.querySelector(".mode__toggle-slider");
const wordToggle = document.querySelector(".mode__toggle-word");
let cards = document.querySelectorAll('.card');

// I used this because click event is firing twice on label element
spanToggle.addEventListener("click", (event) => {
    event.stopPropagation();
});

// I used this so that toggle won't switch when 'Dark-mode word is clicked'
wordToggle.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
})

function mode(event) {
    if (body.classList.contains("black-mode")) {
        darkMode();
    } else {
        lightMode();
    }
}

toggle.addEventListener("click", mode);

function darkMode() {
    body.classList.remove("black-mode");
    body.classList.add("white-mode");
    cards.forEach(card => {
        card.classList.remove('dark-card');
        card.classList.add('white-card');
    })
}

function lightMode() {
    body.classList.remove("white-mode");
    body.classList.add("black-mode");
    cards.forEach(card => {
        card.classList.remove('white-card');
        card.classList.add('dark-card');
    })
}