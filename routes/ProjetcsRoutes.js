const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");
const UserController = require("../controllers/UserController");

// All Project Route
router.get("/", ProjectController.allProjects);
router.get("/get-single-project/:_id", ProjectController.getSingleProject);

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
router.delete(
  "/delete-multiple-project",
  ProjectController.deleteMultipleProjects
);
router.patch("/update-upcoming-project", ProjectController.upcomingProjects);
router.patch("/update-feature-project", ProjectController.toggleFeatureProject);
router.patch("/update-project-status", ProjectController.toggleProjectStatus);
router.patch(
  "/update-project-status-type",
  ProjectController.ProjectStatusType
);

router.patch(
  "/update-project-thumblin/:id",
  ProjectController.ProjectThumblinImage,
  ProjectController.updateThumblinIMage
);

router.patch(
  "/update-project-cover-image/:id",
  ProjectController.multerProjectCoverImage,
  ProjectController.updateCoverImage
);

router.patch(
  "/update-floor-plan-image/:id",
  ProjectController.floorPlanImages,
  ProjectController.updateFloorPlanImages
);

router.get(
  "/get-single-project-for-update/:_id",
  ProjectController.getSingleProjectForUpdate
);

router.get(
  "/project-floor-plan-images/:_id",
  ProjectController.getprojectFloorImage
);

router.delete(
  "/delete-project-floor-plan-image/:_id",
  ProjectController.deleteProjectFloorPlanImage
);

module.exports = router;
