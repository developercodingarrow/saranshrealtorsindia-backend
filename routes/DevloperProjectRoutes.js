const express = require("express");
const router = express.Router();
const DevelopProjectController = require("../controllers/DeveloperProjectsController");
const UserController = require("../controllers/UserController");

// GET ALL DEVELOPER PROJECT PAGE LIST
router.get(
  "/get-all-developer-Project-List-pages",
  DevelopProjectController.allDeveloperProjectList
);

// GET projes by developer
router.get(
  "/get-developer-projects/:slug",
  DevelopProjectController.developerProjectPage
);

// router.use(
//   UserController.protect,
//   UserController.restricTO("admin", "super-admin")
// );
// Create developer pormotional page
router.post(
  "/create-new-developer-project-page",
  DevelopProjectController.createDeveloperPage
);

router.delete(
  "/delete-pormotional-page",
  DevelopProjectController.deletePormotionalPage
);

module.exports = router;
