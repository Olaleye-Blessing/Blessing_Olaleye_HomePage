const btnToggle = document.querySelector('.nav__toggle');

const navLinks = document.querySelector('.nav__links');


btnToggle.addEventListener('click', event => {
    if (navLinks.classList.contains('hidden')) {
        navLinks.classList.add('close');
        btnToggle.style.backgroundImage = 'url(images/icon-hamburger.svg)';
        setTimeout(() => {
            navLinks.classList.remove('close');
            navLinks.classList.remove('hidden');
        }, 1100);
        document.body.style.overflow = '';
    } else {
        navLinks.classList.add('hidden');
        btnToggle.style.backgroundImage = 'url(images/icon-close.svg)';
        document.body.style.overflow = 'hidden';
    }
})