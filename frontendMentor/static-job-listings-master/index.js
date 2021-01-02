import { createFilteredBox, allLists, filteredOptions } from "./module/filtering.js";

let parentListContainer = document.querySelector('.parent-container'); 

async function filterItems(event) {
    let targetBtn = event.target.closest('button');
    if (!targetBtn) {
        return;
    }
    let attribute, attributeValue;
    
    for (let data in targetBtn.dataset) {
        attribute = data;
        attributeValue = targetBtn.dataset[`${data}`];
    }

    if (filteredOptions[attribute].includes(attributeValue)) {
        return;
    }

    allLists.forEach(list => {
        let buttons = Array.from(list.querySelectorAll('button'));
        let found;
        buttons.forEach(button => {
            if (button.dataset[`${attribute}`] == attributeValue) {
                found = true;
            }
        })
        if (!found) {
            // list.hidden = true;
            list.style.display = 'none';
        }
    })

    filteredOptions[attribute].push(attributeValue);

    createFilteredBox(attribute, attributeValue);
}

parentListContainer.addEventListener('click', filterItems);


