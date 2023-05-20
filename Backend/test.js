import { makeGallery } from "./module.mjs";

function filter(array) {
    let buttons = document.querySelectorAll('[data-id]');
    let gallery = document.querySelector('.gallery');
  
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        let newArray = array.filter((item) => item.categoryId == button.dataset.id);
        if (newArray.length !== array.length) {
          gallery.innerHTML = '';
          buttons.forEach((btn) => btn.classList.remove('btn--active'));
          button.classList.add('btn--active');
          makeGallery(button.dataset.id != 0 ? newArray : array);
        }
      });
    });
  };

function event(){
    let buttons = document.querySelectorAll('[data-id]');
    let gallery = document.querySelector('.gallery');
  
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {

        let newArray = filter(array)
        if(newArray.length !== array.length){
            gallery.innerHTML = '';
            makeGallery(newArray)
            buttons.forEach((btn) => btn.classList.remove('btn--active'));
            button.classList.add('btn--active')
        }

}