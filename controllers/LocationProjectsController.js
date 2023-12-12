const LocationProjects = require("../model/locationProjectsModel");
const Project = require("../model/projectsModel");
const catchAsync = require("../utils/catchAsync");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// Projects by Loaction
exports.createLocationProjectPage = catchAsync(async (req, res, next) => {
  const { pageTitle, locationName, topDescription, bottomDescription } =
    req.body;
  const newLocationProjectPage = new LocationProjects({
    pageTitle,
    locationName,
    topDescription,
    bottomDescription,
  });
  const saveNewLocationProject = await newLocationProjectPage.save();
  resultStatus(
    res,
    201,
    "created new Location Project page",
    saveNewLocationProject
  );
});

// Get All Location Project Page
exports.allLocationProjectList = catchAsync(async (req, res, next) => {
  const LocationPage = await LocationProjects.find();
  resultStatus(res, 200, "all Developer pages", LocationPage);
});

// GET PROJECTS BY Location
exports.locationProjectPage = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  // GET Project By Location
  const getlocation = await LocationProjects.findOne({ slug });
  console.log(getlocation.locationName);
  const projects = await Project.find({
    locationName: getlocation.locationName,
  });
  res.status(200).json({
    location: getlocation.locationName,
    status: "Success",
    projects,
  });
});

exports.deleteLocationPage = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const data = await LocationProjects.findByIdAndDelete(_id);
  resultStatus(res, 200, "DELETE DEVELOPER Deleted", data);
});
