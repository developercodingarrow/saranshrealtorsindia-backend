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
router.patch("/update-feature-project", ProjectController.toggleFeatureProject);
router.patch("/update-project-status", ProjectController.toggleProjectStatus);
router.patch(
  "/update-project-status-type",
  ProjectController.ProjectStatusType
);

module.exports = router;
