const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

//Controllers
const newsController = require("../controllers/news.controller");
const pageController = require("../controllers/page.controller");
const projectsController = require("../controllers/projects.controller");
const usersController = require("../controllers/users.controller");
const workController = require("../controllers/work.controller");

//middleware
const verifyToken = require("../middleware/authJwt");

let routes = (app) => {
  router
    //pages
    .get("/", pageController.homePage)
    .get("/about", pageController.aboutPage)
    .get("/contact", pageController.contactPage)
    .get("/projects", pageController.projectsPage)
    .get("/direksiya/login", pageController.loginPage)
    .get(
      "/direksiya/admin/create/news",
      verifyToken,
      pageController.createNewsPage
    )
    .get("/direksiya/admin/get/news", verifyToken, pageController.getNewsPage)
    .get(
      "/direksiya/admin/create/project",
      verifyToken,
      pageController.createProjectPage
    )
    .get(
      "/direksiya/admin/get/projects",
      verifyToken,
      pageController.getProjectsPage
    )
    .get("/direksiya/admin/get/users", verifyToken, pageController.usersPage)
    .get("/direksiya/admin/get/works", verifyToken, pageController.worksPage)
    .get("/direksiya/users", verifyToken, pageController.userPage)
    .get("/projects/view/:id", pageController.projectPage)
    .get("/news/view/:id", pageController.newsPage)

    // news
    .post("/news", newsController.createNews)
    .post("/edite-news", newsController.editNews)
    .post("/delete-news", newsController.deleteNews)

    //projects
    .post("/projects", projectsController.createProject)
    .post("/edit-project", projectsController.editProject)
    .post("/delete-project", projectsController.deleteProject)
    //login
    .post("/direksiya/login", authController.signIn)
    .post("/log-out", usersController.logOutUser)

    //users
    .post("/create-user", usersController.createUser)
    .post("/edit-user", usersController.editUser)
    .post("/delete-user", usersController.deleteUser)

    // works
    .post("/create-work", workController.uploadWork)
    .post("/delete-work", workController.deleteWork)
    .get("/download/:name", verifyToken, workController.downloadWork);

  app.use(router);
};

module.exports = routes;
