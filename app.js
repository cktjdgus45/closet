function loadItems() {
    return fetch('/data/data.json')
        .then(response => response.json())
        .then(data => data.clothes);
}

function createHTMLString(data) {
    return `
        <li class="item">
            <div class="img">${data.image}</div>
            <div class="info">
                <span class="gender">${data.gender}</span>
                <span class="size">${data.size}</span>
            </div>
        </li>
    `
}

function displayItem(data) {
    const ul = document.querySelector('.items');
    ul.innerHTML = data.map(data => createHTMLString(data)).join('');
}

loadItems().then(data => {
    displayItem(data);
});

function filterItems(data, filter) {
    const updated = data.filter(data => data.type == filter || data.color == filter);
    return updated;
}

function handleClicked(event) {
    const filter = event.target.textContent;
    loadItems().then(data => {
        const updated = filterItems(data, filter);
        displayItem(updated);
    })
}

const btns = document.querySelector('.btns');
btns.addEventListener('click', handleClicked);
