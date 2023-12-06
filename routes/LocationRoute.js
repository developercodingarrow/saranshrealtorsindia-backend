const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/LocationController");
const UserController = require("../controllers/UserController");

router.get("/", LocationController.getAllLocation);
router.use(
  UserController.protect,
  UserController.restricTO("admin", "super-admin")
);

router.post("/add-new-location", LocationController.addNewLocation);
router.delete("/delete-location", LocationController.deleteLocation);

module.exports = router;
