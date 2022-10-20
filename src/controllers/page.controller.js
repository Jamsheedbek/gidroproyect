const handleAllNews = require("../util/handleNews");
const handleProjects = require("../util/handleProjects");
const handleAllUsers = require("../util/handleUsers");
const handleWorks = require("../util/handleWorks");
const { verifyUser } = require("../util/jwt");

module.exports = {
  homePage: async (req, res) => {
    try {
      const news = await handleAllNews();
      const projects = await handleProjects();

      res.render("index", { news, projects });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  aboutPage: (req, res) => {
    res.render("about", { page: "news" });
  },
  projectsPage: (req, res) => {
    res.render("projects");
  },
  contactPage: (req, res) => {
    res.render("contact");
  },
  loginPage: (req, res) => {
    res.render("login", { message: null });
  },
  adminPage: async (req, res) => {
    const users = await handleAllUsers();
    const news = await handleAllNews();
    const projects = await handleProjects();
    const works = await handleWorks();
    console.log(works);
    res.render("admin", { users, news, projects, works });
  },
  userPage: async (req, res) => {
    const token = req.cookies.token;
    const userId = verifyUser(token).id;
    const works = await handleWorks(userId);
    const user = await handleAllUsers(userId);
    res.render("users", { works, user });
  },
};
