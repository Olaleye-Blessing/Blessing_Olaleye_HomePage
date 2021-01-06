export function notfound() {
    let div = document.createElement("div");
    div.classList.add("notFound");
    div.innerHTML = `
    <p>COUNTRY NOT FOUND</p>`;
    return div;
}
