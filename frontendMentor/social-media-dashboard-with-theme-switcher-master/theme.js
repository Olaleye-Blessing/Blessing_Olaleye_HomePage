const root = document.querySelector('html');

if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == 'white') {
        root.classList.add('white');
    }
}

window.addEventListener('load', () => {
    toggleBtn.checked = JSON.parse(localStorage.getItem('check'));
})

// localStorage.clear();

