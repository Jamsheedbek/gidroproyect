const { News } = require("../models");
const handleCarousel = require("../util/handleCarousel");
const handleCurrency = require("../util/handleCurrency");
const handleAllNews = require("../util/handleNews");
const handleProjects = require("../util/handleProjects");
const handleAllUsers = require("../util/handleUsers");
const handleWheather = require("../util/handleWheatther");
const handleWorks = require("../util/handleWorks");
const { verifyUser } = require("../util/jwt");

module.exports = {
  homePage: async (req, res) => {
    try {
      const news = await handleAllNews();
      const projects = await handleProjects();
      const currency = await handleCurrency();
      const wheather = await handleWheather();
      const carousel = await handleCarousel();

      res.render("index", { news, projects, wheather, currency, carousel });
    } catch (err) {
      console.log(err);
    }
  },
  worldNewsPage: async (req, res) => {
    try {
      const news = await handleAllNews();

      res.render("worldNews", { news });
    } catch (err) {
      console.log(err);
    }
  },
  companyNewsPage: async (req, res) => {
    try {
      const news = await handleAllNews();

      res.render("companyNews", { news });
    } catch (err) {
      console.log(err);
    }
  },
  finishedProjectsPage: async (req, res) => {
    const projects = await handleProjects();
    res.render("finishedProjects", { projects });
  },
  plannedProjectsPage: async (req, res) => {
    const projects = await handleProjects();
    res.render("plannedProjects", { projects });
  },
  loginPage: (req, res) => {
    res.render("login", { message: null });
  },
  createNewsPage: async (req, res) => {
    res.render("admin", {
      page: "create-news",
    });
  },
  getNewsPage: async (req, res) => {
    const news = await handleAllNews();
    res.render("admin", {
      news,
      page: "get-news",
    });
  },
  editNewsPage: async (req, res) => {
    const news = await handleAllNews(req.params.id);
    res.render("admin", { page: "edit-news", news: news.dataValues });
  },
  createProjectPage: async (req, res) => {
    res.render("admin", {
      page: "create-project",
    });
  },
  getProjectsPage: async (req, res) => {
    const projects = await handleProjects();
    res.render("admin", {
      projects,
      page: "get-projects",
    });
  },
  editProjectPage: async (req, res) => {
    const project = await handleProjects(req.params.id);
    console.log(req.params.id);

    res.render("admin", { page: "edit-project", project });
  },
  usersPage: async (req, res) => {
    const users = await handleAllUsers();
    res.render("admin", {
      users,
      page: "get-users",
    });
  },
  worksPage: async (req, res) => {
    const works = await handleWorks();
    res.render("admin", {
      works,
      page: "get-works",
    });
  },
  userPage: async (req, res) => {
    const token = req.cookies.token;
    const userId = verifyUser(token).id;
    const works = await handleWorks(userId);
    const user = await handleAllUsers(userId);
    res.render("users", { works, user });
  },
  projectPage: async (req, res) => {
    const news = await handleAllNews();
    const activeProject = await handleProjects(req.params.id);
    res.render("project", { activeProject, news });
  },
  newsPage: async (req, res) => {
    const news = await handleAllNews();
    const activeNews = await handleAllNews(req.params.id);

    res.render("news", { news, activeNews });
  },
  tendersPage: async (req, res) => {
    const news = await handleAllNews();

    res.render("tender", { news });
  },
  leadershipPage: async (req, res) => {
    const news = await handleAllNews();

    res.render("lidership", { news });
  },
  createLiders: async (req, res) => {
    res.render("admin", { page: "create-liders" });
  },
  editImages: async (req, res) => {
    const carousel = await handleCarousel();

    res.render("admin", { page: "get-images", carousel });
  },
};
