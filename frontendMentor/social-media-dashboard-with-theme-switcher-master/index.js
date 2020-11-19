const body = document.body;
const toggle = document.querySelector(".mode__toggle");
const spanToggle = document.querySelector(".mode__toggle-slider");

// I used this because click event is firing twice on label element
spanToggle.addEventListener("click", (event) => {
    event.stopPropagation();
});

function mode(event) {
    if (body.classList.contains("black-mode")) {
        body.classList.remove("black-mode");
        body.classList.add("white-mode");
    } else {
        body.classList.remove("white-mode");
        body.classList.add("black-mode");
    }

    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.classList.contains('dark-card')) {
            card.classList.remove('dark-card');
            card.classList.add('white-card');
        } else {
            card.classList.remove('white-card');
            card.classList.add('dark-card');
        }
    })
}

toggle.addEventListener("click", mode);
