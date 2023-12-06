const express = require("express");
const router = express.Router();
const CityController = require("../controllers/CityController");
const UserController = require("../controllers/UserController");

router.get("/", CityController.getAllCities);
router.use(
  UserController.protect,
  UserController.restricTO("admin", "super-admin")
);

router.post("/add-new-city", CityController.addNewCity);
router.delete("/delete-city", CityController.deleteCity);

module.exports = router;
