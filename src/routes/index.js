const express = require("express");
const authController = require("../controllers/auth.controller");
const carouselController = require("../controllers/carousel.controller");
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
        .get("/projects/current", pageController.finishedProjectsPage)
        .get("/projects/promising", pageController.plannedProjectsPage)
        .get("/direksiya/login", pageController.loginPage)

        // News page
        .get(
            "/direksiya/admin/create/news",
            verifyToken,
            pageController.createNewsPage
        )
        .get(
            "/direksiya/admin/get/news",
            verifyToken,
            pageController.getNewsPage
        )
        .get(
            "/direksiya/admin/edit/news/:id",
            verifyToken,
            pageController.editNewsPage
        )
        .get("/news/view/:id", pageController.newsPage)
        .get("/news/company", pageController.companyNewsPage)
        .get("/news/world", pageController.worldNewsPage)
        .get("/tenders", pageController.tendersPage)
        .get("/status", pageController.legalStatus)

        // Projects page
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
        .get(
            "/direksiya/admin/edit/project/:id",
            verifyToken,
            pageController.editProjectPage
        )
        .get("/projects/view/:id", pageController.projectPage)

        // Users page
        .get(
            "/direksiya/admin/get/users",
            verifyToken,
            pageController.usersPage
        )
        .get("/direksiya/users", verifyToken, pageController.userPage)

        // Works page
        .get(
            "/direksiya/admin/get/works",
            verifyToken,
            pageController.worksPage
        )

        // Liders page
        .get(
            "/direksiya/admin/create/liders",
            verifyToken,
            pageController.createLiders
        )
        .get("/lidership", pageController.leadershipPage)

        // Images page
        .get(
            "/direksiya/admin/get/images",
            verifyToken,
            pageController.editImages
        )

        // news controller
        .post("/news", newsController.createNews)
        .post("/delete-news", newsController.deleteNews)
        .post("/edit-news", newsController.editNews)

        //projects controller
        .post("/projects", projectsController.createProject)
        .post("/delete-project", projectsController.deleteProject)
        .post("/edit-project", projectsController.editProject)

        //login controller
        .post("/direksiya/login", authController.signIn)
        .post("/log-out", usersController.logOutUser)

        //users controller
        .post("/create-user", usersController.createUser)
        .post("/edit-user", usersController.editUser)
        .post("/delete-user", usersController.deleteUser)

        // works controller
        .post("/create-work", workController.uploadWork)
        .post("/delete-work", workController.deleteWork)
        .get("/download/:name", verifyToken, workController.downloadWork)

        // carousel controller
        .post("/create-carousel", carouselController.createCarousel)
        .post("/edit-carousel", carouselController.updateCarousel);

    app.use(router);
};

module.exports = routes;
