btnHome = document.getElementById("btn-home");
btnAbout = document.getElementById("btn-about");

btnHome.addEventListener("click", () => {
  btnHome.classList.add("button-selected");
  btnAbout.classList.remove("button-selected");
});

btnAbout.addEventListener("click", () => {
  btnAbout.classList.add("button-selected");
  btnHome.classList.remove("button-selected");
});
