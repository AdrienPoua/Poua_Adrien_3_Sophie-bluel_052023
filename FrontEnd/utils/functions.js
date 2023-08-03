export function getAuthChargeUtile(){
    let valueOfInputEmail = document.querySelector("#input__email").value;
    let valueOfInputPassword = document.querySelector("#input__password").value;
    let inputValues = {
      email: valueOfInputEmail,
      password: valueOfInputPassword ,
    };
    return JSON.stringify(inputValues);
}
export const isLocalStorageToken = () => {
    let token = sessionStorage.getItem("token")
    return token ? true : false
 }