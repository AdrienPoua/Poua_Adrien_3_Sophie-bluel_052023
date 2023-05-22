export async function fetchData(data1, data2) {
  try {
    const response1 = await fetch(`http://localhost:5678/api/${data1}`);
    const response2 = await fetch(`http://localhost:5678/api/${data2}`);
    let works = await response1.json();
    let categories = await response2.json();;
    return { works, categories }
  } catch (error) {
    console.log(error);
  }
}
export function makeGallery(array) {
  const gallery = document.querySelector('.portfolio__gallery')
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
export function filter(array) {
  let buttons = document.querySelectorAll('[data-id]');
  let gallery = document.querySelector('.portfolio__gallery');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let newArray = array.filter((item) => item.categoryId == button.dataset.id);
      if (newArray.length !== array.length) {
        gallery.innerHTML = '';
        buttons.forEach((btn) =>
          btn.classList.remove('btn--active'));
        button.classList.add('btn--active');
        makeGallery(button.dataset.id != 0 ? newArray : array);
      }
    });
  });
};
async function getPromise() {
  let inputEmail = document.querySelector('#input__email').value;
  let inputPassword = document.querySelector('#input__password').value;
  let dataLog = {
    "email": inputEmail,
    "password": inputPassword
  };
  let chargeUtile = JSON.stringify(dataLog);
  try {
    let response = await fetch("http://localhost:5678/api/users/login",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: chargeUtile
      });
    let promise = await response.json();
    return promise
  } catch (error) {
    console.log(error);
  }
};
export async function logIn() {
  let indexUrl = './index.html';
  let errorLog = document.querySelector('.log__error');
  let log = document.querySelector('.log');
  log.addEventListener('submit', async (e) => {
    e.preventDefault();
    let promise = await getPromise();
    if ('userId' in promise) {
      sessionStorage.setItem('token', promise.token);
      window.location.href = indexUrl;
    } else {
      errorLog.classList.remove('invisible')
        ;
    }
  });
}
export async function adminMode() {
  let token = sessionStorage.getItem('token');
  const response = await fetch(`http://localhost:5678/api/works`);
  let data = await response.json()
 
  // Pour une raison obscure je ne peux pas utiliser les data que j'ai fetch plus tot dans le scope de cette fonction donc je fetch a nouveau. si je console.log(data) avant l'appel de la fonction data est defini, mais pas a l'interieur. J'ai essayer avec let/var/const
  if (token != null) {
    console.log('Visibility va etre lancé');
    visibility();
    console.log('Visibility a été lancé, makeModalGallery vas etre lancé');
    makeModalGallery(data);
    console.log('makeModalGallery a été lancé, administener va etre lancé');
    
    adminListener();

    console.log('admin mode fullfil')
    modalSwitch()
  }
}

function visibility() {
  let hidden = document.querySelectorAll('.hidden');
  let logout = document.querySelector('.nav__login');
  let header = document.querySelector('header')
  header.style.marginTop = '6em';
  let btnGallery = document.querySelector('main .portfolio ul');
  logout.innerText = 'logout';
  btnGallery.classList.add('hidden')
  hidden.forEach(element => element.classList.toggle('hidden'));

}

function adminListener() {
  let logout = document.querySelector('.nav__login');
  let btnModifier = document.querySelectorAll('span:has(i)');
  let myModal = document.querySelector('.myModal')
  let myModalCloseBtn = document.querySelector('.myModal__cross')
  let trash = document.querySelectorAll('.fa-trash-can')

  logout.addEventListener('click', () => { sessionStorage.clear() });
  btnModifier.forEach(btn => btn.addEventListener('click', () => myModal.classList.toggle('hide')));
  myModalCloseBtn.addEventListener('click', () => myModal.classList.toggle("hide"));
  console.log(trash);
  
  trash.forEach((ben) => {
    ben.addEventListener('click', (e) => {
      
      let id = e.target.dataset.id;
      console.log(id);
      deleteWork(id);
    });
  });
  
}

function modalSwitch(){
let myModalAdd = document.querySelector('.myModal__add')
let hiddens = document.querySelectorAll('.myModal__hidden')
let h2 = document.querySelector('.myModal__title');
let figures = document.querySelectorAll('figure');
let myModalDelete = document.querySelector('.myModal__delete')
let myModalContent = document.querySelector('.myModal__content')
let arrow = document.getElementById('arrow');
let elementToHide = [h2, ...figures, myModalDelete];
myModalAdd.addEventListener('click', ()=>{
  console.log(elementToHide);
  arrow.removeAttribute('id')
  hiddens.forEach(element => element.classList.toggle('myModal__hidden'))
  elementToHide.forEach(element => element.classList.toggle('myModal__hidden'))
  myModalContent.classList.remove('myModal__content')
  myModalContent.classList.add('myModal__content2')
  

})
arrow.addEventListener('click', ()=>{
arrow.setAttribute('id','arrow');
elementToHide.forEach(element => element.classList.toggle('myModal__hidden'))
myModalContent.classList.remove('myModal__content2')
myModalContent.classList.add('myModal__content')
hiddens.forEach(element => element.classList.toggle('myModal__hidden'))


}
)
}

function deleteWork(id) {
    event.preventDefault();
    let token = sessionStorage.getItem('token');
    console.log(token);
    fetch(`http://localhost:5678/api/works/${id}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }

function makeModalGallery(array) {
    const gallery = document.querySelector('.myModal__content');
    for (let i = 0; i < array.length; i++) {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
      const icone = document.createElement('i');
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figcaption.appendChild(document.createTextNode(`éditer`));
      figcaption.appendChild(icone)
      img.src = array[i].imageUrl;
      icone.setAttribute('data-id', array[i].id)
      console.log(array)
      icone.classList.add('fa-solid', 'fa-trash-can')
    }
  }

