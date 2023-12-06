const express = require("express");
const mongoose = require("mongoose");
const app = express();
const AppError = require("./utils/appErrors");
const globalErrorHandler = require("./utils/errorController");
const ProjectRoutes = require("./routes/ProjetcsRoutes");
const BlogRoutes = require("./routes/BlogRoutes");
const promotionalRoutes = require("./routes/PromotionalRoutes");
const EnquireyFormRoutes = require("./routes/EnquiryFormRoutes");
const UserRoute = require("./routes/UsersRoute");
const DeveloperRoute = require("./routes/DeveloperRoutes");
const DeveloperProjectRoute = require("./routes/DevloperProjectRoutes");
const LocationProjectRoute = require("./routes/LocationProjectRoutes");
const CityRoute = require("./routes/CityRoutes");
const cors = require("cors");

// Midelwears
app.use(cors());
app.use(express.json());

// all Routes
app.use("/projects", ProjectRoutes);
app.use("/blogs", BlogRoutes);
app.use("/promotional", promotionalRoutes);
app.use("/enquirey", EnquireyFormRoutes);
app.use("/user", UserRoute);
app.use("/developer", DeveloperRoute);
app.use("/developer-project", DeveloperProjectRoute);
app.use("/location-project", LocationProjectRoute);
app.use("/city", CityRoute);

app.all("*", (req, res, next) => {
  next(new AppError("this is error message ", 404));
});

app.use(globalErrorHandler);
module.exports = app;
