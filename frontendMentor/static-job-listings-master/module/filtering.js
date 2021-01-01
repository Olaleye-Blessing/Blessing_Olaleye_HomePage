export let allLists = document.querySelectorAll('.list');

export let filteredOptions = {
    role: [],
    level: [],
    languages: [],
    tools: []
}


export function createFilteredBox(attribute, attributeValue) {
    let main = document.querySelector('main');

    if (!document.querySelector(".selection")) {
        let div = document.createElement("div");
        div.classList.add("selection", "width");
        div.innerHTML = `<div class="filters">
        <div class="filter">${attributeValue}<button class="cancel-btn" data-${attribute}="${attributeValue}"></button></div></div>
        <div class="clear-cont">
            <button class="clear-btn">Clear</button>
        </div>`;
        div.addEventListener('click', cancelFilter);
        main.prepend(div);
    } else {
        let div = document.createElement('div');
        div.classList.add('filter');
        div.innerHTML = `${attributeValue}<button class="cancel-btn" data-${attribute}="${attributeValue}"></button>`;
        document.querySelector('.filters').append(div);
    }
}

function cancelFilter(event) {
    let targetBtn = event.target.closest('button');
    if (!targetBtn) {
        return;
    }
    let btnAtt, btnAttValue;
    if(targetBtn.classList.contains('cancel-btn')) {
        for (let att in targetBtn.dataset) {
            btnAtt = att;
            btnAttValue = targetBtn.dataset[`${att}`]
        }

        filteredOptions[btnAtt] = filteredOptions[btnAtt].filter(option => option != btnAttValue);

        targetBtn.parentElement.remove();
        
        allLists.forEach(list => {
            let buttons = document.querySelectorAll('button');
            let some;
            buttons.forEach(button => {
                if (button.dataset[`${btnAtt}`]) {

                    some = filteredOptions[btnAtt].some(elem => elem == btnAttValue)
                }
            })
            if (!some) {
                list.hidden = false;
            }
        })

    } else {
        allLists.forEach(list => {
            list.hidden = false;
            for (let key in filteredOptions) {
                filteredOptions[key] = [];
            }
        });
        document.querySelector('.selection').remove();
    }
}
