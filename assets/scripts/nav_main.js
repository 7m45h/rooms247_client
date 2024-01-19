const mainDiv = document.querySelector("main");
const btnHome = document.getElementById("btn-home");
const btnAbout = document.getElementById("btn-about");

btnHome.addEventListener("click", () => {
  btnHome.classList.add("button-selected");
  btnAbout.classList.remove("button-selected");
  mainDiv.style.transform = "translateX(0px)";
});

btnAbout.addEventListener("click", () => {
  btnAbout.classList.add("button-selected");
  btnHome.classList.remove("button-selected");
  mainDiv.style.transform = "translateX(-50%)";
});
