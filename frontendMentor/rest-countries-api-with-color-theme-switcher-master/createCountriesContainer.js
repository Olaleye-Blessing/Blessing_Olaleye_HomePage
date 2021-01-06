export function createContainer(country) {
    let countryDiv = document.createElement('div');
    countryDiv.classList.add('country');
    let divLink = document.createElement('a');
    divLink.href = "#";
    divLink.innerHTML = `<figure>
    <img src="${country.flag}" alt="">
    </figure>
    <div class="country__detail">
        <h3 class="country__name">${country.name}</h3>
        <p class="country__population">Population: <span>${country.population}</span></p>
        <p class="country__region">Region: <span>${country.region}</span></p>
        <p class="country__capital">Capital: <span>${country.capital}</span></p>
        </div>`;
        countryDiv.append(divLink);
        return countryDiv;
}