const toggleBtn = document.querySelector('#mode');

function toggleMode(event) {
    root.classList.toggle('white');

    let theme = 'black';
    let checked = false;

    if(root.classList.contains('white')) {
        theme = 'white';
        checked = true;
    }
    localStorage.setItem('theme', theme);
    localStorage.setItem('check', checked);
}

toggleBtn.addEventListener('click', toggleMode);