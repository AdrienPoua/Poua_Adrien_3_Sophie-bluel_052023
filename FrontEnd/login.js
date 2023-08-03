import { postLoginData } from "./modules/asyncFunctions.js";
import { getAuthChargeUtile } from "./utils/functions.js";
import { authErrorMessage, authForm, indexUrl } from "./utils/variables.js";


authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let chargeUtile = getAuthChargeUtile()
  let loginResponse = await postLoginData(chargeUtile);
  console.log(loginResponse);
  if ("userId" in loginResponse) {
    sessionStorage.setItem("token", loginResponse.token);
    window.location.href = indexUrl;
  } else {
    authErrorMessage.classList.remove("hidden");
  }
});