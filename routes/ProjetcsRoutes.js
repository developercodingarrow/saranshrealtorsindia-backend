const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");
const UserController = require("../controllers/UserController");

// All Project Route
router.get("/", ProjectController.allProjects);

router.use(
  UserController.protect,
  UserController.restricTO("admin", "super-admin")
);
router.post(
  "/create-new-project",
  ProjectController.ProjectThumblinImage,
  ProjectController.createNewProject
);
router.delete("/delete-single-project", ProjectController.deleteSinglProject);
router.post("/update-upcoming-project", ProjectController.upcomingProjects);
module.exports = router;
