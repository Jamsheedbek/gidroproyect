const Button = document.querySelector(".btn-close");

Button.addEventListener("click", (e) => {
  document.querySelector(".toast").classList.remove("open-modal");
});
