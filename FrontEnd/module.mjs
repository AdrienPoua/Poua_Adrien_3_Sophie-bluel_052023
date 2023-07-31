export async function fetchData(data1, data2) {
  try {
    const response1 = await fetch(`http://localhost:5678/api/${data1}`);
    const response2 = await fetch(`http://localhost:5678/api/${data2}`);
    let works = await response1.json();
    let categories = await response2.json();
    return { works, categories };
  } catch (error) {
    console.log(error);
  }
}
export let mainFunctions = {
  makeGallery: (array, parent) => {
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
      console.log("fetched");
      if (parent === document.querySelector(".modal__gallery")) {
        const icone = document.createElement("i");
        figure.appendChild(icone);
        figcaption.innerText = "editer";
        icone.setAttribute("data-id", array[i].id);
        icone.classList.add("fa-solid", "fa-trash-can");
      }
    }
  },
  addListenerAndFilter: (array) => {
    let buttons = document.querySelectorAll("[data-id]");
    let gallery = document.querySelector(".portfolio__gallery");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let newArray = array.filter((item) => item.categoryId == button.dataset.id);
        if (newArray.length !== array.length) {
          gallery.innerHTML = "";
          buttons.forEach((btn) => btn.classList.remove("btn--active"));
          button.classList.add("btn--active");
          mainFunctions.makeGallery(button.dataset.id != 0 ? newArray : array, gallery);
        }
      });
    });
  },
  adminMode: async () => {
    let token = sessionStorage.getItem("token");
    let modalGallery = document.querySelector(".modal__gallery");
    if (token != null) {
      try {
        const { works, categories } = await fetchData("works", "categories");
        sideFunctions.adminLayout(categories);
        mainFunctions.makeGallery(works, modalGallery);
        sideFunctions.adminListener(works);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
export let sideFunctions = {
  adminLayout: (categories) => {
    let btnModifier = document.querySelectorAll(".btn-modifier");
    let adminbar = document.querySelector(".adminbar");
    let logout = document.querySelector(".nav__login");
    let header = document.querySelector("header");
    let btnGallery = document.querySelector("main .portfolio ul");
    let options = document.querySelectorAll("option");
    header.style.marginTop = "6em";
    logout.innerText = "logout";
    adminbar.classList.toggle("hidden");
    btnGallery.classList.add("hidden");
    btnModifier.forEach((element) => element.classList.toggle("hidden"));
    for (let i = 0; i < categories.length; i++) {
      options[i].innerText = categories[i].name;
    }
  },
  adminListener: (works) => {
    const logout = document.querySelector(".nav__login");
    const btnModifier = document.querySelector(".portfolio .btn-modifier");
    const modal = document.querySelector(".modal");
    let modalGallery = document.querySelector(".modal__gallery")
    let mainGallery = document.querySelector(".portfolio__gallery")
    const modalLayer = document.querySelectorAll(".modal__wrapper");
    const closeBtn = document.querySelectorAll(".close-btn");
    const trash = document.querySelectorAll(".fa-trash-can");
    const inputFile = document.querySelector('input[type="file"]');
    const placeholderImg = document.querySelector(".preview");
    const btnDelete = document.querySelector(".btn-delete");
    const inputText = document.querySelector('.modal [type="text"]');
    const overlay = document.querySelector(".overlay");
    const form = document.querySelector(".modal__content .form")
    let modalLayers = document.querySelectorAll(".modal__wrapper");
    let btnPreviousModal = document.querySelector(".back-btn");
    let btnAjouterImage = document.querySelector(".modal__footer .btn--active");
    console.log(works);
    closeBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        modal.classList.add("hidden"), overlay.classList.add("hidden");
      })
    );
    btnAjouterImage.addEventListener("click", (e) => {
      console.log(e.target);
      modalLayers.forEach((element) => element.classList.toggle("hidden"));
    });
    inputFile.addEventListener("change",  (e) => {
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
      console.log("ok");
      modal.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });
    overlay.addEventListener("click", (e) => {
      modal.classList.toggle("hidden");
      e.target.classList.toggle("hidden");
    });
    btnPreviousModal.addEventListener("click", () => {
      modalLayer.forEach((element) => element.classList.toggle("hidden"));
      btnPreviousModal.classList.add("modal__hidden");
    });
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let promise = await sideFunctions.addWorks();
      if (promise.id) {
        let data = await fetchData("works", "categories");
        console.log(data.works)
        mainFunctions.makeGallery(data.works, modalGallery)
        mainFunctions.makeGallery(data.works, mainGallery)
        console.log(data.works)
      }
    });
    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      for (let i = 0; i < trash.length; i++) {
        let modalFigure = document.querySelectorAll(`.modal figure`);
        let introFigure = document.querySelectorAll(`.portfolio__gallery figure`);
        let toDelete = [...modalFigure, ...introFigure];
        toDelete.forEach((element) => element.classList.add("hidden"));
        console.log(works);
        sideFunctions.deleteWork(works[i].id);
      }
    });
    trash.forEach((ben) => {
      ben.addEventListener("click", async (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        let toDelete = document.querySelectorAll(`[data-id="${id}"]`);
        console.log(toDelete);
        toDelete.forEach((element) => element.classList.add("hidden"));
        sideFunctions.deleteWork(id);
      });
    });
  },
  addWorks: async () => {
    let form = document.querySelector(".modal__content form");
    let formData = new FormData(form);
    let token = sessionStorage.getItem("token");
    try {
      let response = await fetch(`http://localhost:5678/api/works/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      let result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  deleteWork: async (id) => {
    let token = sessionStorage.getItem("token");
    try {
      fetch(`http://localhost:5678/api/works/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
export let logFunctions = {
  getPromise: async () => {
    let inputEmail = document.querySelector("#input__email").value;
    let inputPassword = document.querySelector("#input__password").value;
    let dataLog = {
      email: inputEmail,
      password: inputPassword,
    };
    let chargeUtile = JSON.stringify(dataLog);
    try {
      let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      });
      let promise = await response.json();
      return promise;
    } catch (error) {
      console.log(error);
    }
  },
  login: () => {
    let indexUrl = "./index.html";
    let errorLog = document.querySelector(".auth-error");
    let log = document.querySelector(".auth__form");
    log.addEventListener("submit", async (e) => {
      e.preventDefault();
      let promise = await logFunctions.getPromise();
      if ("userId" in promise) {
        sessionStorage.setItem("token", promise.token);
        window.location.href = indexUrl;
      } else {
        errorLog.classList.remove("hidden");
      }
    });
  },
};
