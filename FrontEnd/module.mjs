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
  makeGallery: (array) => {
    const gallery = document.querySelector(".portfolio__gallery");
    for (let i = 0; i < array.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      img.src = array[i].imageUrl;
      figcaption.innerText = array[i].title;
      console.log(array);
      
    }
  },
  filter: (array) => {
    let buttons = document.querySelectorAll("[data-id]");
    let gallery = document.querySelector(".portfolio__gallery");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let newArray = array.filter(
          (item) => item.categoryId == button.dataset.id
        );
        if (newArray.length !== array.length) {
          gallery.innerHTML = "";
          buttons.forEach((btn) => btn.classList.remove("btn--active"));
          button.classList.add("btn--active");
          mainFunctions.makeGallery(button.dataset.id != 0 ? newArray : array);
        }
      });
    });
  },
  adminMode: async () => {
    let token = sessionStorage.getItem("token");
    if (token != null) {
      let response = await fetch(`http://localhost:5678/api/works`);
      let works = await response.json();
      response = await fetch(`http://localhost:5678/api/categories`);
      let categories = await response.json();
      sideFunctions.visibility();
      sideFunctions.makeModalGallery(works);
      sideFunctions.adminListener(works);
      sideFunctions.modalSwitch(categories);
    }
  },
};
export let sideFunctions = {
  visibility: () => {
    let hidden = document.querySelectorAll(".hidden");
    let logout = document.querySelector(".nav__login");
    let header = document.querySelector("header");
    let btnGallery = document.querySelector("main .portfolio ul");
    header.style.marginTop = "6em";
    logout.innerText = "logout";
    btnGallery.classList.add("hidden");
    hidden.forEach((element) => element.classList.toggle("hidden"));
  },
  makeModalGallery: (array) => {
    const gallery = document.querySelector(".myModal__gallery");
    for (let i = 0; i < array.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const icone = document.createElement("i");
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      figcaption.appendChild(document.createTextNode(`éditer`));
      figcaption.appendChild(icone);
      img.src = array[i].imageUrl;
      icone.setAttribute("data-id", array[i].id);
      icone.classList.add("fa-solid", "fa-trash-can");
    }
  },
  adminListener: (works) => {
    const logout = document.querySelector(".nav__login");
    const btnModifier = document.querySelectorAll(".portfolio__title .modif__item");
    const myModal = document.querySelector(".myModal");
    const myModalCloseBtn = document.querySelector(".myModal__cross");
    const trash = document.querySelectorAll(".fa-trash-can");
    const inputFile = document.querySelector('input[type="file"]');
    const placeholderImg = document.getElementById("preview");
    const myModalDelete = document.querySelector(".myModal__delete");
    const inputText = document.querySelector('.myModal [type="text"]');
    const myModalBg = document.querySelector(".myModal__bg");

    logout.addEventListener("click", () => {
      sessionStorage.clear();
    });
    btnModifier.forEach((btn) =>
      btn.addEventListener("click", () => {
        myModal.classList.toggle("hide");
        myModalBg.classList.toggle("myModal__hidden");
      })
    );
    myModalBg.addEventListener('click', (e)=> {
     myModal.classList.toggle("hide")
     e.target.classList.toggle('myModal__hidden')})

    myModalCloseBtn.addEventListener("click", () => {
      myModal.classList.toggle("hide");
      myModalBg.classList.toggle("myModal__hidden");
    });
    inputFile.addEventListener("change", function (e) {
      let img = e.target.files[0];
      let imgPrev = URL.createObjectURL(img);
      let placeholderTitle = img.name
        .substring(0, img.name.lastIndexOf("."))
        .replace(/-/g, " ");
      inputText.value = placeholderTitle;
      placeholderImg.classList.remove("hide");
      placeholderImg.src = imgPrev;
    });
    myModalDelete.addEventListener("click", (e) => {
      e.preventDefault();
      for (let i = 0; i < trash.length; i++) {
        sideFunctions.deleteWork(works[i].id);
      }
    });
    trash.forEach((ben) => {
      ben.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        sideFunctions.deleteWork(id);
        e.preventDefault();
      });
    });
  },
  modalSwitch: (categories) => {
    let myModalCloseBtn = document.querySelector(".myModal__cross");
    let modals = [
      document.querySelector(".myModal__first"),
      document.querySelector(".myModal__second"),
    ];
    let myModalAdd = document.querySelector(".myModal__add");
    let arrow = document.getElementById("arrow");
    let form = document.querySelector(".myModal form");
    let options = document.querySelectorAll("option");
    for (let i = 0; i < categories.length; i++) {
      options[i].innerText = categories[i].name;
    }
    myModalAdd.addEventListener("click", (e) => {
      arrow.removeAttribute("id");
      modals.forEach((element) => element.classList.toggle("myModal__hidden"));
    });
    myModalCloseBtn.addEventListener("click", () => {
      arrow.setAttribute("id", "arrow");
      document
        .querySelector(".myModal__first")
        .classList.remove("myModal__hidden");
      document
        .querySelector(".myModal__second")
        .classList.add("myModal__hidden");
    });
    arrow.addEventListener("click", () => {
      modals.forEach((element) => element.classList.toggle("myModal__hidden"));
      arrow.setAttribute("id", "arrow");
    }),
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      sideFunctions.addWorks();
      });
  },
  addWorks: () => {
    let form = document.querySelector(".myModal form");
    let formData = new FormData(form);
    let token = sessionStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },
  deleteWork: (id) => {
    let token = sessionStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
    let errorLog = document.querySelector(".log__error");
    let log = document.querySelector(".log");
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
