import { createContainer } from "./createCountriesContainer.js";

import { notfound } from "./notFound.js";

const body = document.querySelector("body");

const main = document.querySelector('main');

const root = document.querySelector("html");

const modeSwitch = document.querySelector(".mode");

const searchSection = document.getElementsByClassName("form")[0];

const searchFilter = document.querySelector("#search");

const countriesSec = document.querySelector(".countries");

const modalSec = document.querySelector(".modal");

const region = document.getElementById("region");

let allCountries; // used this to get all countries at once so as to reduce data usage 

let countryFullname = {}; // use this to get borders fullname

window.addEventListener('load', event => {
    let loader = document.querySelector('.cont');
    loader.style.opacity = 0;

    setTimeout(() => {
        main.classList.remove('display');
        loader.remove();
    }, 3500);
    
})

modeSwitch.addEventListener("click", (event) => {
    root.classList.toggle("white-mode");
});

modeSwitch.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        root.classList.toggle("white-mode");
    }
});

async function fetchCountries() {
    try {
        let url = new URL("all", "https://restcountries.eu/rest/v2/");

        let countriesUrl = await fetch(url);

        allCountries = await countriesUrl.json();

        for (let country of allCountries) {
            countryFullname[country.alpha3Code] = country.name;
        }
        // console.log(countryFullname);
    } catch (error) {
        if (error.name == "TypeError") {
            await fetchCountries();
        }
    }
    // TypeError
    // console.log(allCountries);
    // console.log(countryFullname);
}

async function insertCountries() {
    await fetchCountries();
    for (let country of allCountries) {
        let countryFolder = createContainer(country);
        countriesSec.append(countryFolder);
    }
}

// insertCountries();

document.addEventListener("DOMContentLoaded", insertCountries);

searchFilter.addEventListener("input", (event) => {
    let searchCountry = searchFilter.value.trim();
    if (searchCountry == "") {
        insertCountries();
        return;
    }
    if (document.querySelector('.notFound')) {
        document.querySelector('.notFound').remove();
    }
    countriesSec.innerHTML = "";
    let found;
    searchCountry = `${searchCountry[0].toUpperCase()}${searchCountry.slice(1).toLowerCase()}`;
    for (let country of allCountries) {
        if (country.name.indexOf(searchCountry) != -1) {
            // console.log(country);
            let filteredCountry = createContainer(country);
            countriesSec.append(filteredCountry);
            found = true;
        }
    }
    if (!found) {
        // create a not found message
        let errorMesssage = notfound();
        main.append(errorMesssage);
    }
});


region.addEventListener("change", (event) => {
    let regionValue = region.value;
    if (regionValue != "fill") {
        countriesSec.innerHTML = "";
        for (let country of allCountries) {
            if (country.region == regionValue) {
                let regionCountries = createContainer(country);
                countriesSec.append(regionCountries);
            }
        }
        return;
    }
    countriesSec.innerHTML = "";
    for (let country of allCountries) {
        let countryDiv = createContainer(country);
        countriesSec.append(countryDiv);
    }
});



function modalCountry(event) {
    event.preventDefault();
    let eventTarget = event.target.closest("a");
    if (!eventTarget) {
        return;
    }
    let countryName = eventTarget.querySelector(".country__name").textContent;
    let neededCountry;
    // console.log(allCountries);
    for (let country of allCountries) {
        if (country.name == countryName) {
            neededCountry = country;
            break;
        }
    }
    // console.log(neededCountry);
    countriesSec.classList.add("display");
    searchSection.classList.add("display");
    modalSec.classList.remove("display");
    modalSec.innerHTML = "";
    modalContainer(neededCountry);
}

document.addEventListener("click", modalCountry);

function modalContainer(country) {
    let languages = [];
    for (let lang of country.languages) {
        languages.push(lang.name);
    }
    languages = languages.join(", ");
    let modalBtnContaner = document.createElement("div");
    modalBtnContaner.classList.add("modal__btn-container");
    modalBtnContaner.innerHTML = `<button data-btn="back">Back</button>`;

    let modalDetails = document.createElement("div");
    modalDetails.classList.add("modal__details");

    let flag = document.createElement("figure");
    flag.classList.add("modal__img");
    flag.innerHTML = `<img src="${country.flag}" alt="${country.name}'s flag">`;

    let modalDetailContainer = document.createElement("div");
    modalDetailContainer.classList.add("modal__detail-cont");
    modalDetailContainer.innerHTML = `<div class="modal__detail-main">
    <div class="modal__detail-sub">
        <h5 class="modal__name">
            ${country.name}
        </h5>
        <div class="modal__native-cont">
            Native Name: <span class="modal__native">${country.nativeName}</span>
        </div>
        <div class="modal__population-cont">
            Population: <span class="modal__population">${country.population}</span>
        </div>
        <div class="modal__region-cont">
            Region: <span class="modal__region">${country.region}</span>
        </div>
        <div class="modal__sub-cont">
            Sub Region: <span class="modal__sub">${country.subregion}</span>
        </div>
        <div class="modal__capital-cont">
            Capital: <span class="modal__capital">${country.capital}</span>
        </div>
    </div>
    <div class="modal__detail-exp">
        <div class="modal__detail-domain">
            Top Level Domain: <span>${country.topLevelDomain[0]}</span>
        </div>
        <div class="modal__detail-currency">
            Currencies: <span>${country.currencies[0].name}</span>
        </div>
        <div class="modal__detail-lang">
            Languages: <span>${languages}</span>
        </div>
    </div>
</div>`;

    let modalBorders = document.createElement("div");
    modalBorders.classList.add("modal__borders");
    modalBorders.innerHTML = `<div class="modal__borders-title">
    Border Countries:
</div>`;

    let modalBorderButtons = document.createElement("div");
    modalBorderButtons.classList.add("modal__borders-buttons");
    
    for (let border of country.borders) {
        for (let shortName in countryFullname) {
            if (border == shortName) {
                let button = document.createElement("button");
                button.textContent = countryFullname[shortName];
                button.setAttribute("data-border", countryFullname[shortName]);
                modalBorderButtons.append(button);
                break;
            }
        }
    }

    modalBorders.append(modalBorderButtons);
    modalDetailContainer.append(modalBorders);
    modalDetails.append(flag);
    modalDetails.append(modalDetailContainer);
    modalSec.append(modalBtnContaner);
    modalSec.append(modalDetails);
}

// document.addEventListener()

modalSec.addEventListener("click", (event) => {
    let btnTarget = event.target.closest("[data-btn]");
    if (!btnTarget) {
        return;
    }
    countriesSec.classList.remove("display");
    searchSection.classList.remove("display");
    modalSec.classList.add("display");
});

modalSec.addEventListener("click", (event) => {
    let btnBorder = event.target.closest("[data-border]");
    if (!btnBorder) {
        return;
    }
    for (let country of allCountries) {
        if (country.name == btnBorder.textContent) {
            btnBorder = country;
            break;
        }
    }
    modalSec.innerHTML = "";
    modalContainer(btnBorder);
});
