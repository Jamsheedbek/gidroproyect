const newsImage = document.querySelector("#news-photo");
const projectImage = document.querySelector(".add-photo");
const newsLabel = document.querySelector(".news-label");
const projectLabel = document.querySelector(".project-label");
const newsWrapper = document.querySelector(".control-wrapper");
const usersWrapper = document.querySelector(".users-wrapper");
const projectsWrapper = document.querySelector(".projects-wrapper");
const worksWrapper = document.querySelector(".works-wrapper");
const imageWrapper = document.querySelector(".image-wrapper");

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ size: ["small", false, "large", "huge"] }],
  ["link", "image"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

if (newsImage) {
  newsImage.addEventListener("change", () => {
    var reader = new FileReader();
    reader.onload = function (e) {
      newsLabel.src = e.target.result;
    };
    reader.readAsDataURL(newsImage.files[0]);
  });

  var news = new Quill("#newseditor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
    placeholder: "news content ...",
  });

  document.querySelector("#create-news").addEventListener("submit", (e) => {
    if (
      !document.getElementById("news-content").value &&
      news.getContents().ops.length > 1
    ) {
      e.preventDefault();

      document.getElementById("news-content").value = JSON.stringify(
        news.getContents()
      );

      document.querySelector("#create-news").submit();
    } else if (
      news.getContents().ops.length == 1 &&
      !document.getElementById("news-content").value
    ) {
      e.preventDefault();
    }
  });
}

if (projectImage) {
  projectImage.addEventListener("change", () => {
    var reader = new FileReader();
    reader.onload = function (e) {
      projectLabel.src = e.target.result;
    };
    reader.readAsDataURL(projectImage.files[0]);
  });

  var project = new Quill("#projecteditor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
    placeholder: "news content ...",
  });

  document.getElementById("create-projects").addEventListener("submit", (e) => {
    if (
      !document.getElementById("project-content").value &&
      project.getContents().ops.length > 1
    ) {
      e.preventDefault();

      document.getElementById("project-content").value = JSON.stringify(
        project.getContents()
      );

      document.querySelector("#create-projects").submit();
    } else if (
      project.getContents().ops.length == 1 &&
      !document.getElementById("project-content").value
    ) {
      e.preventDefault();
    }
  });
}

if (newsWrapper) {
  newsWrapper.addEventListener("click", (e) => {
    if (e.target.textContent.includes("Edit")) {
      console.log(document.querySelector(".news-id"));
      console.log(e.target.dataset.id);
      document.querySelector(".news-id").value = e.target.dataset.id;
    } else if (e.target.textContent.includes("Delete")) {
      document.querySelector(".delete-id").value = e.target.dataset.id;
      document.querySelector(".delete-file").value = e.target.dataset.file;
    }
  });
}

if (usersWrapper) {
  usersWrapper.addEventListener("click", (e) => {
    if (e.target.textContent.includes("Edit")) {
      document.querySelector(".user-edit").value = e.target.dataset.id;
    } else if (e.target.textContent.includes("Delete")) {
      document.querySelector(".delete-user").value = e.target.dataset.id;
    }
  });
}

if (projectsWrapper) {
  projectsWrapper.addEventListener("click", (e) => {
    if (e.target.textContent.includes("Edit")) {
      document.querySelector(".project-edit").value = e.target.dataset.id;
    } else if (e.target.textContent.includes("Delete")) {
      document.querySelector(".project-id").value = e.target.dataset.id;
    }
  });
}

if (worksWrapper) {
  worksWrapper.addEventListener("click", (e) => {
    if (e.target.textContent.includes("Delete")) {
      document.querySelector(".work-id").value = e.target.dataset.id;
    }
  });
}
