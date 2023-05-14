const gallery = document.querySelector('.gallery');
const works = getWorks();
const categories = getCategories();

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works
}

async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    return categories
}

async function makeGallery(array) {
    for (let i = 0; i < array.length; i++) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        img.src = array[i].imageUrl;
        figcaption.innerText = array[i].title;
    }
}

async function makeFilterBtns() {
    const ulFilter = document.createElement('ul');
    const liTous = document.createElement('li');
    const btnFilter = document.createElement('button');
    gallery.parentNode.insertBefore(ulFilter, gallery);
    ulFilter.appendChild(liTous);
    liTous.append(btnFilter);
    btnFilter.innerText = "Tous";
    btnFilter.classList.add('filter__btn');
    const categories = await getCategories();
    for (i = 0; i < categories.length; i++) {
        const li = document.createElement('li');
        const btnFilter = document.createElement('button');
        ulFilter.appendChild(li);
        li.appendChild(btnFilter);
        btnFilter.innerText = `${categories[i].name}`;
        btnFilter.classList.add('filter__btn');
        btnFilter.setAttribute('data-id', categories[i].id);
    }
}

async function figureFilter(callback) {
    await makeFilterBtns();
    const filterBtns = document.querySelectorAll('.filter__btn');
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            const categories = await getCategories();
            const works = await getWorks();
            const data = btn.getAttribute('data-id');
            const newArray = works.filter(works => works.categoryId == data);
            gallery.innerHTML = '';
            makeGallery(newArray);
        });
    });
}

(async function init() {
    const works = await getWorks();
    makeGallery(works);
    figureFilter();
})();
