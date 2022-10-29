const Button = document.querySelector(".btn-close");

if (Button) {
  Button.addEventListener("click", (e) => {
    document.querySelector(".toast").classList.remove("open-modal");
  });
}
