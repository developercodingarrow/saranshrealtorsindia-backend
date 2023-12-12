const express = require("express");
const router = express.Router();
const LocationProjectsController = require("../controllers/LocationProjectsController");

// Create developer pormotional page
router.post(
  "/create-new-location-project-page",
  LocationProjectsController.createLocationProjectPage
);

// GET ALL DEVELOPER PROJECT PAGE LIST
router.get(
  "/get-all-location-Project-List-pages",
  LocationProjectsController.allLocationProjectList
);

// GET projes by developer
router.get(
  "/get-location-projects/:slug",
  LocationProjectsController.locationProjectPage
);

router.delete(
  "/delete-location-page",
  LocationProjectsController.deleteLocationPage
);

module.exports = router;
