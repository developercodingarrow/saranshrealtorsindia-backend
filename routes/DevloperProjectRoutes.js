const express = require("express");
const router = express.Router();
const DevelopProjectController = require("../controllers/DeveloperProjectsController");

// Create developer pormotional page
router.post(
  "/create-new-developer-project-page",
  DevelopProjectController.createDeveloperPage
);

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



module.exports = router;
