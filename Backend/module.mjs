export async function fetchData(data1, data2) {
    try {
      const response1 = await fetch(`http://localhost:5678/api/${data1}`);
      const response2 = await fetch(`http://localhost:5678/api/${data2}`);
      let works = await response1.json();
      let categories = await response2.json();;
      return { works, categories }
    } catch (error) {
      console.log('fetch fail');
    }
  }
export function makeGallery(array){
  const gallery = document.querySelector('.gallery')
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