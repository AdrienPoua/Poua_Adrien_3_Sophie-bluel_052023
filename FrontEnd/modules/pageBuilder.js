import { getData, addWorks, deleteWork } from "./asyncFunctions.js";
import { adminbar, logout, header, btnModifier, overlay, filterBtn, portfolioGallery, modal, modalLayers, modalGallery, closeBtn, options, inputFile, inputText, placeholderImg, btnPreviousModal, btnAjouterImage, modalForm, filterWrapper, allBtnModifier } from "../utils/variables.js";

export function makeGallery(array, parent) {
  parent.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    parent.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    img.src = array[i].imageUrl;
    figcaption.innerText = array[i].title;
    figure.setAttribute("data-id", array[i].id);
    img.setAttribute("alt", array[i].title);
    if (parent === document.querySelector(".modal__gallery")) {
      const icone = document.createElement("i");
      figure.appendChild(icone);
      figcaption.innerText = "editer";
      icone.setAttribute("data-id", array[i].id);
      icone.classList.add("fa-solid", "fa-trash-can");
    }
  }
}
export function adminLayout(categories) {
  header.style.marginTop = "6em";
  logout.innerText = "logout";
  adminbar.classList.toggle("hidden");
  filterBtn.classList.add("hidden");
  allBtnModifier.forEach((element) => element.classList.toggle("hidden"));
  for (let i = 0; i < categories.length; i++) {
    options[i].innerText = categories[i].name;
  }
}
export function setAdminEventListener() {
  closeBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      modal.classList.add("hidden"), overlay.classList.add("hidden");
    })
  );
  btnAjouterImage.addEventListener("click", (e) => {
    modalLayers.forEach((element) => element.classList.toggle("hidden"));
  });
  inputFile.addEventListener("change", (e) => {
    let img = e.target.files[0];
    let imgPrev = URL.createObjectURL(img);
    let placeholderTitle = img.name.substring(0, img.name.lastIndexOf(".")).replace(/-/g, " ");
    inputText.value = placeholderTitle;
    placeholderImg.classList.remove("hidden");
    placeholderImg.src = imgPrev;
  });
  logout.addEventListener("click", () => {
    sessionStorage.clear();
  });
  btnModifier.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });
  overlay.addEventListener("click", (e) => {
    modal.classList.toggle("hidden");
    e.target.classList.toggle("hidden");
  });
  btnPreviousModal.addEventListener("click", () => {
    modalLayers.forEach((element) => element.classList.toggle("hidden"));
  });
  modalForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    let formData = new FormData(modalForm);
    let promise = await addWorks(formData);
    if (promise.id) {
      getData("works").then((works) => {
        makeGallery(works, modalGallery);
        makeGallery(works, portfolioGallery);
      });
    }
  });

  var trash = document.querySelectorAll(".fa-trash-can");
  trash.forEach((ben) => {
    ben.addEventListener("click", async (e) => {
      console.log("ok");
      e.preventDefault();
      let id = e.target.dataset.id;
      let itemToDelete = document.querySelectorAll(`[data-id="${id}"]`);
      itemToDelete.forEach((element) => element.classList.add("hidden"));
      deleteWork(id);
    });
  });
}
export function makeFilterBtns(array) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.setAttribute("data-id", 0);
  button.classList.add("btn");
  button.innerText = "Tous";
  button.classList.add("btn--active");
  filterWrapper.appendChild(li);
  li.appendChild(button);
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.setAttribute("data-id", array[i].id);
    button.classList.add("btn");
    button.innerText = array[i].name;
    filterWrapper.appendChild(li);
    li.appendChild(button);
  }
}
export function listenBtnFilter(array) {
  var buttons = document.querySelectorAll("button[data-id]");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let filteredArray = array.filter((item) => item.categoryId == button.dataset.id);
      if (filteredArray.length !== array.length) {
        portfolioGallery.innerHTML = "";
        const activeButton = document.querySelector(".filter__wrapper .btn--active");
        activeButton.classList.remove("btn--active");
        e.target.classList.add("btn--active");
        makeGallery(button.dataset.id != 0 ? filteredArray : array, portfolioGallery);
      }
    });
  });
}
