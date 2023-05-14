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

async function makeGallery() {
    const works = await getWorks();
    for (let i = 0; i < works.length; i++) {
        const gallery = document.querySelector('.gallery');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        img.src = works[i].imageUrl;
        figcaption.innerText = works[i].title;
    }
}
makeGallery()
