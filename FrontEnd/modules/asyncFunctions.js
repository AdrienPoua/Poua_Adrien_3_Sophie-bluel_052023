
import { authErrorMessage, authForm, indexUrl, modalForm, token } from "../utils/variables.js";


export async function getData(path) {
  try {
    const response = await fetch(`http://localhost:5678/api/${path}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function postLoginData(chargeUtile) {
  try {
    let response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
    return await response.json();
  } catch (error) {
    throw new Error("Une erreur s'est produite lors de la requête POST.");
  }
}
export async function addWorks(chargeUtile) {
  try {
    let formData = new FormData(modalForm);
    let response = await fetch(`http://localhost:5678/api/works/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: chargeUtile,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function deleteWork(id) {
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
}
export async function login() {
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let loginResponse = await postLoginData(chargeUtile);
    console.log("succees");
    if ("userId" in loginResponse) {
      sessionStorage.setItem("token", promise.token);
      window.location.href = indexUrl;
    } else {
      authErrorMessage.classList.remove("hidden");
    }
  });
}
