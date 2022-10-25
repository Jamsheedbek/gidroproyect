const worksWrapper = document.querySelector(".works-wrapper");

worksWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Delete")) {
    document.querySelector(".work-id").value = e.target.dataset.id;
  }
});
