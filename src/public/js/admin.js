const navLink = document.querySelectorAll(".nav-link");
const navbarWrapper = document.querySelector(".nav-pills");
const newsPage = document.querySelector(".new-page");
const imagesPage = document.querySelector(".project-images");
const projectsPage = document.querySelector(".project");
const usersPage = document.querySelector(".user");
const worksPage = document.querySelector(".works");
const pages = document.querySelectorAll(".pages");
const newsImage = document.querySelector("#news-photo");
const projectImage = document.querySelector(".add-photo");
const newsLabel = document.querySelector(".news-label");
const projectLabel = document.querySelector(".project-label");
const newsWrapper = document.querySelector(".control-wrapper");
const usersWrapper = document.querySelector(".users-wrapper");
const projectsWrapper = document.querySelector(".projects-wrapper");
const worksWrapper = document.querySelector(".works-wrapper");
const imageWrapper = document.querySelector(".image-wrapper");

const page = localStorage.getItem("page");
document.querySelectorAll(".nav-link").forEach((e) => {
  e.classList.remove("bg-primary");
  e.classList.add("bg-dark");
});
document.querySelectorAll(".nav-link").forEach((e) => {
  if (e.textContent == page) {
    e.classList.remove("bg-dark");
    e.classList.add("bg-primary");
  }
});

if (page == "News") {
  newsPage.classList.remove("d-none");
  projectsPage.classList.add("d-none");
  usersPage.classList.add("d-none");
  worksPage.classList.add("d-none");
  imagesPage.classList.add("d-none");
} else if (page == "Projects") {
  projectsPage.classList.remove("d-none");
  newsPage.classList.add("d-none");
  usersPage.classList.add("d-none");
  worksPage.classList.add("d-none");
  imagesPage.classList.add("d-none");
} else if (page == "Users") {
  usersPage.classList.remove("d-none");
  newsPage.classList.add("d-none");
  projectsPage.classList.add("d-none");
  worksPage.classList.add("d-none");
  imagesPage.classList.add("d-none");
} else if (page == "Works") {
  worksPage.classList.remove("d-none");
  usersPage.classList.add("d-none");
  newsPage.classList.add("d-none");
  projectsPage.classList.add("d-none");
  imagesPage.classList.add("d-none");
} else if (page == "Images") {
  imagesPage.classList.remove("d-none");
  worksPage.classList.add("d-none");
  usersPage.classList.add("d-none");
  newsPage.classList.add("d-none");
  projectsPage.classList.add("d-none");
}

navbarWrapper.addEventListener("click", (e) => {
  if (e.target.matches(".nav-link")) {
    navLink.forEach((e) => {
      e.classList.remove("bg-primary");
      e.classList.add("bg-dark");
    });
    e.target.classList.remove("bg-dark");
    e.target.classList.add("bg-primary");
    if (e.target.textContent == "News") {
      pages.forEach((e) => {
        e.classList.add("d-none");
      });
      localStorage.setItem("page", "News");
      newsPage.classList.remove("d-none");
    } else if (e.target.textContent == "Projects") {
      pages.forEach((e) => {
        e.classList.add("d-none");
      });
      localStorage.setItem("page", "Projects");
      projectsPage.classList.remove("d-none");
    } else if (e.target.textContent == "Users") {
      pages.forEach((e) => {
        e.classList.add("d-none");
      });
      localStorage.setItem("page", "Users");
      usersPage.classList.remove("d-none");
    } else if (e.target.textContent == "Works") {
      pages.forEach((e) => {
        e.classList.add("d-none");
      });
      localStorage.setItem("page", "Works");
      worksPage.classList.remove("d-none");
    } else if (e.target.textContent == "Images") {
      pages.forEach((e) => {
        e.classList.add("d-none");
      });
      localStorage.setItem("page", "Images");
      imagesPage.classList.remove("d-none");
    }
  }
});

newsImage.addEventListener("change", () => {
  var reader = new FileReader();
  reader.onload = function (e) {
    newsLabel.src = e.target.result;
  };

  reader.readAsDataURL(newsImage.files[0]);
});

projectImage.addEventListener("change", () => {
  var reader = new FileReader();
  reader.onload = function (e) {
    projectLabel.src = e.target.result;
  };

  reader.readAsDataURL(projectImage.files[0]);
});

newsWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Edit")) {
    document.querySelector(".news-id").value = e.target.dataset.id;
  } else if (e.target.textContent.includes("Delete")) {
    document.querySelector(".delete-id").value = e.target.dataset.id;
    document.querySelector(".delete-file").value = e.target.dataset.file;
  }
});

usersWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Edit")) {
    document.querySelector(".user-edit").value = e.target.dataset.id;
  } else if (e.target.textContent.includes("Delete")) {
    document.querySelector(".delete-user").value = e.target.dataset.id;
  }
});

projectsWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Edit")) {
    document.querySelector(".project-edit").value = e.target.dataset.id;
  } else if (e.target.textContent.includes("Delete")) {
    document.querySelector(".project-id").value = e.target.dataset.id;
  } else if (e.target.textContent.includes("Image")) {
    document.querySelector("#project-id").value = e.target.dataset.id;
  }
});

worksWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Delete")) {
    document.querySelector(".work-id").value = e.target.dataset.id;
  }
});

imageWrapper.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Delete")) {
    document.querySelector(".image-id").value = e.target.dataset.id;
    document.querySelector(".image-name").value = e.target.dataset.file;
  }
});
