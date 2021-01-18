const root = document.querySelector('html');

const currentTheme = localStorage.getItem('theme');

if (currentTheme == 'light') {
    root.classList.add('light');
}