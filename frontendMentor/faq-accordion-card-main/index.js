// // ------------------

const FAQ = document.getElementById("FAQ");

function FAQCheck(event) {
    let targetCheckbox = event.target.closest(".FAQ__checkbox");
    if (!targetCheckbox) return;

    let allCheckbox = FAQ.querySelectorAll(".FAQ__checkbox");

    for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i] != targetCheckbox) {
            allCheckbox[i].checked = false;
        } else {
            continue;
        }
    }
}

FAQ.addEventListener("click", FAQCheck);
