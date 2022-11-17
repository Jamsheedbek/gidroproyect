const newsImage = document.querySelector("#news-photo");
const projectImage = document.querySelector(".add-photo");
const newsLabel = document.querySelector(".news-label");
const projectLabel = document.querySelector(".project-label");
const newsWrapper = document.querySelector(".control-wrapper");
const usersWrapper = document.querySelector(".users-wrapper");
const projectsWrapper = document.querySelector(".projects-wrapper");
const worksWrapper = document.querySelector(".works-wrapper");
const imageWrapper = document.querySelector(".image-wrapper");
const editNews = document.querySelector("#editNews");
const editProjects = document.getElementById("edit-projects");
const carousel = document.querySelector(".slides");

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

if (newsImage && document.querySelector("#create-news")) {
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
    e.preventDefault();

    document.getElementById("news-content").value = JSON.stringify(
      news.getContents()
    );

    document.querySelector("#create-news").submit();
  });
}

if (projectImage && document.getElementById("create-projects")) {
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
    e.preventDefault();

    document.getElementById("project-content").value = JSON.stringify(
      project.getContents()
    );

    document.querySelector("#create-projects").submit();
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
      document.querySelector(".project-fileName").value =
        e.target.dataset.fileName;
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

if (editNews) {
  document
    .getElementById("edited-news-photo")
    .addEventListener("change", () => {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("edited-news-label").src = e.target.result;
      };
      reader.readAsDataURL(
        document.getElementById("edited-news-photo").files[0]
      );
    });

  let Content = new Quill("#editNews", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
  });

  if (editNews.dataset.content) {
    Content.setContents(JSON.parse(editNews.dataset.content));
  }

  editNews.dataset.content = "";

  editNews.querySelectorAll("img").forEach((e) => {
    e.classList.add("card-img");
  });

  editNews.querySelectorAll("p").forEach((e) => {
    e.classList.add("card-text");
  });
  document.getElementById("edit-news").addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      !document.getElementById("edited-news-content").value &&
      Content.getContents().ops.length > 1
    ) {
      e.preventDefault();

      document.getElementById("edited-news-content").value = JSON.stringify(
        Content.getContents()
      );

      document.querySelector("#edit-news").submit();
    } else if (
      Content.getContents().ops.length == 1 &&
      !document.getElementById("edited-news-content").value
    ) {
      e.preventDefault();
    }
  });
}

if (editProjects) {
  document
    .getElementById("edited-project-img")
    .addEventListener("change", () => {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(".edited-project-label").src = e.target.result;
      };
      reader.readAsDataURL(
        document.getElementById("edited-project-img").files[0]
      );
    });

  let Content = new Quill("#editedprojecteditor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
  });

  if (document.getElementById("editedprojecteditor").dataset.content) {
    Content.setContents(
      JSON.parse(document.getElementById("editedprojecteditor").dataset.content)
    );
  }

  document.getElementById("editedprojecteditor").dataset.content = "";

  document
    .getElementById("editedprojecteditor")
    .querySelectorAll("img")
    .forEach((e) => {
      e.classList.add("card-img");
    });

  document
    .getElementById("editedprojecteditor")
    .querySelectorAll("p")
    .forEach((e) => {
      e.classList.add("card-text");
    });
  document.getElementById("edit-projects").addEventListener("submit", (e) => {
    if (
      !document.getElementById("edited-project-content").value &&
      Content.getContents().ops.length > 1
    ) {
      e.preventDefault();

      document.getElementById("edited-project-content").value = JSON.stringify(
        Content.getContents()
      );

      document.querySelector("#edit-projects").submit();
    } else if (
      Content.getContents().ops.length == 1 &&
      !document.getElementById("edited-project-content").value
    ) {
      e.preventDefault();
    }
  });
}

if (carousel) {
  document
    .getElementById("caroousel-image-1")
    .addEventListener("change", () => {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("caroousel-image-1-label").src =
          e.target.result;
      };
      reader.readAsDataURL(
        document.getElementById("caroousel-image-1").files[0]
      );
    });

  document
    .getElementById("caroousel-image-2")
    .addEventListener("change", () => {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("caroousel-image-2-label").src =
          e.target.result;
      };
      reader.readAsDataURL(
        document.getElementById("caroousel-image-2").files[0]
      );
    });

  document
    .getElementById("caroousel-image-3")
    .addEventListener("change", () => {
      let reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("caroousel-image-3-label").src =
          e.target.result;
      };
      reader.readAsDataURL(
        document.getElementById("caroousel-image-3").files[0]
      );
    });
}
