const express = require("express");
const router = express.Router();
const DeveloperController = require("../controllers/DeveloperController");
const UserController = require("../controllers/UserController");

router.use(
  UserController.protect,
  UserController.restricTO("admin", "super-admin")
);

router.get("/", DeveloperController.getAllDeveloper);
router.post("/add-new-developer", DeveloperController.createDeveloper);
router.delete("/delete-developer", DeveloperController.deleteDeveloper);

module.exports = router;
