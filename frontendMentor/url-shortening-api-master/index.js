const body = document.querySelector("body");

const menuBtn = document.querySelector(".menu-toggle");

const menuAllLinks = document.querySelector(".nav__links-all");

const form = document.forms[0];

const urlInput = document.querySelector("#url");

const btnShorten = document.querySelector("form button.btn");

const messageCont = document.querySelector("form small");

const historySection = document.querySelector('.history');

const historyListsCont = document.querySelector(".history__lists");

let allLists = [];

class BadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}

window.addEventListener('load', event => {
    let loaderCont = document.querySelector('.loader-cont');
    loaderCont.style.opacity = 0;
    setTimeout(() => {
        loaderCont.remove();
    }, 3550);
})

menuBtn.addEventListener("click", (event) => {
    menuAllLinks.classList.toggle("show");
});

function createClearHistoryBtn() {
    let button = document.createElement('button');
    button.classList.add('clear-history', 'btn');
    button.textContent = 'Clear History';
    document.querySelector('.history').prepend(button);
}

function addMessage(textContent, error = true) {
    messageCont.textContent = textContent;
    messageCont.classList.add("error__message");
    if (!error) {
        messageCont.classList.add('success__message');
    }
}

function removeMessage() {
    messageCont.textContent = "";
    messageCont.classList.remove("error__message", 'success__message');
}


function createLoadingIndicator() {
    let loaderCont = document.createElement("div");
    loaderCont.classList.add("loader");
    form.append(loaderCont);
    urlInput.classList.add("disabled");
    urlInput.disabled = true;
    btnShorten.classList.add("disabled");
    btnShorten.disabled = true;
}

function removeLoadingIndicator() {
    urlInput.classList.remove("disabled");
    urlInput.disabled = false;
    btnShorten.classList.remove("disabled");
    btnShorten.disabled = false;
    document.querySelector("form .loader").remove();
}

function createLinkContainer(link) {
    let li = document.createElement("li");
    li.classList.add("history__list");
    li.innerHTML = `<p class="history__list-original">${link.result.original_link}</p>
    <div class="history__list-detail">
      <a target="_blank" class="history__list-short" href="${link.result.full_short_link}">${link.result.short_link}</a>
      <button class="btn history__list-copy">Copy</button>
    </div>`;
    return li;
}

function validateUrlInput(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value
    );
}

function checkUrl(url) {
    if (url == "") {
        addMessage("Please, enter a url!!", true);
        return false;
    }

    if (!validateUrlInput(url)) {
        addMessage("Please, enter a valid url!!", true);
        return false;
    }
    return true;
}

async function getUrl(url) {
    let urlResult;
    try {
        let urlResponse = await fetch(url);
        if (urlResponse.status == 400) {
            throw new BadRequest('Bad request');
        }
        urlResult = await urlResponse.json();
    } catch (error) {
        if (error.name == "TypeError") {
            addMessage(
                "Network Error!! Please check your network connection!!", true
            );
            removeLoadingIndicator();
        } else if (error instanceof BadRequest) {
            addMessage("Bad request!!", true);
            removeLoadingIndicator();
        }
    }
    return urlResult;
}


form.addEventListener("submit", async function (e) {
    e.preventDefault();
    removeMessage();

    let linkUrl = urlInput.value.trim();

    if (!checkUrl(linkUrl)) {
        return;
    }

    linkUrl = linkUrl.replace(/^https?:\/\/(www.)?/, "");

    let url = `https://api.shrtco.de/v2/shorten?url=${linkUrl}`;

    createLoadingIndicator();

    let urlResult = await getUrl(url);

    let linkCont = createLinkContainer(urlResult);

    historyListsCont.prepend(linkCont);

    urlInput.value = "";
    removeLoadingIndicator();
    urlInput.focus();

    // save max of 5 in the local storage
    if (allLists.length >= 5) {
        historyListsCont.lastElementChild.remove();
        allLists.shift();
    }

    allLists.push(urlResult);

    if (allLists.length == 1) {
        createClearHistoryBtn();
    }

    addMessage('Successful shortened!!', false);

    setTimeout(() => {
        removeMessage();
    }, 2000);
    
    
    localStorage.setItem(`lists`, JSON.stringify(allLists));

    // if (localStorage.getItem('lists') == null) {
    //     localStorage.setItem('lists', JSON.stringify(allLists))
    // } else {
    //     localStorage.setItem(`lists`, JSON.stringify(allLists));
    // }
});

function loadLocalStorage(links) {
    for (let link of links) {
        let linkCont = createLinkContainer(link);
        historyListsCont.prepend(linkCont);
    }
}

window.addEventListener("load", () => {
    if (localStorage.getItem("lists") !== null) {
        allLists = JSON.parse(localStorage.getItem("lists"));
        loadLocalStorage(allLists);

        if(allLists.length != 0) {
            createClearHistoryBtn();
        }
    }
    // allLists = JSON.parse(localStorage.getItem("lists"));
    // // console.log(allLists);
    // // loadLocalStorage(allLists);
    
    // if(allLists.length != 0) {
    //     loadLocalStorage(allLists);
    //     createClearHistoryBtn();
    // }
    // if (allLists != null) {
    //     allLists = JSON.parse(localStorage.getItem("lists"));
    // // console.log(allLists);
    // // loadLocalStorage(allLists);
    
    //     if(allLists.length != 0) {
    //         loadLocalStorage(allLists);
    //         createClearHistoryBtn();
    //     }
    // }
});

urlInput.addEventListener("input", (e) => {
    removeMessage();
});

urlInput.addEventListener('focus', event => {
    removeMessage();
})

async function copyLink(event) {
    let targetBtn = event.target.closest(".history__list-copy");

    if (!targetBtn) return;

    for (let button of historyListsCont.querySelectorAll(
        ".history__list-copy"
    )) {
        if (button.classList.contains("copied")) {
            button.classList.remove("copied");
            button.textContent = "Copy";
        }
    }

    let linkToCopy = targetBtn.previousElementSibling.href;

    await navigator.clipboard.writeText(linkToCopy);

    targetBtn.classList.add("copied");
    targetBtn.textContent = "Copied";
}

historyListsCont.addEventListener("click", copyLink);


function clearHistory(event) {
    let buttonTarget = event.target.closest('.clear-history');
    if (!buttonTarget) return;

    while (historyListsCont.firstElementChild) {
        historyListsCont.firstElementChild.remove();
    }

    allLists = [];

    localStorage.setItem(`lists`, JSON.stringify(allLists));

    historySection.querySelector('.clear-history').remove();
}

historySection.addEventListener('click', clearHistory);