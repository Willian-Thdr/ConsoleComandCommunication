import { textName } from "../../view/renderer";
console.log(textName);

const nameShow = document.getElementById("nameUser");

setInterval(() => {
    nameShow.textContent = "textName";
});