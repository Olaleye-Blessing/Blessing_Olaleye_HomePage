const root = document.querySelector('html');

if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') == 'white') {
        root.classList.add('white');
        setTimeout(() => {
            toggleBtn.checked = JSON.parse(localStorage.getItem('check'))
        }, 0);
    }
}
