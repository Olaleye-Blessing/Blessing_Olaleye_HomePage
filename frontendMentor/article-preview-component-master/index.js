// get the coordinate first

// function to get the windows coordinate of the share button
function coord(elem) {
    let elemCoord = elem.getBoundingClientRect();
    return {
        top: elemCoord.top,
        left: elemCoord.left,
    };
}

let jsArrow = document.querySelector(".js-arrow");

let shareIcon = document.querySelector(".js-share");

let shareIcons = document.querySelector(".article__share-icons");

let mainArticle = document.querySelector(".article__main");

function shareClicked(event) {
    let targetIcon = event.target.closest(".js-share");
    if (!targetIcon) return;

    shareIcons.classList.toggle("js-share-icons");
    let clickedCoord = coord(targetIcon);

    let body = document.body;
    let top = clickedCoord.top - shareIcons.offsetHeight - 15;
    let left =
        clickedCoord.left +
        (targetIcon.offsetWidth - shareIcons.offsetWidth) / 2;

        // this is to make sure the social icon container doesn't get out of  body
    if (body.clientWidth < 472) {
        left =
            mainArticle.getBoundingClientRect().right -
            shareIcons.offsetWidth +
            10;
    }

    shareIcons.style.top = `${top}px`;
    shareIcons.style.left = `${left}px`;
}

shareIcon.addEventListener("click", shareClicked);

// if the user clicked another part of the document
shareIcon.addEventListener("blur", (event) => {
    setTimeout(() => {
        shareIcons.classList.toggle("js-share-icons");
    }, 2000);
});

// shareIcon.addEventListener('pointerout', event => {
//     let relatedElem = event.relatedTarget.closest('')
// })
