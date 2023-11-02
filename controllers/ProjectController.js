const Project = require("../model/projectsModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const path = require("path");
// const test = require("../../client/public/project-feature-images");

// Project Image Upload
const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.resolve(`${__dirname}/../../client/public/project-feature-images`)
    );
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `project-thumblin-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerstorage,
});

exports.ProjectThumblinImage = upload.single("ProjectThumblin");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// All Property Projects
exports.allProjects = catchAsync(async (req, res, next) => {
  const properties = await Project.find();
  resultStatus(res, 200, "fetch all projects", properties);
});

// Create a new Project
exports.createNewProject = catchAsync(async (req, res, next) => {
  const {
    projectName,
    ProjectSector,
    ProjectCity,
    UnitType,
    Budget,
    developer,
    BasicPrice,
    FlatSizeRange,
  } = req.body;

  console.log("test-1");

  let thumblin;

  if (!req.file?.filename) {
    thumblin = "project-dummy-image.jpg";
  } else {
    thumblin = req.file.filename;
  }

  console.log(thumblin);
  const newProject = new Project({
    projectName,
    ProjectSector,
    ProjectCity,
    Budget,
    UnitType,
    FlatSizeRange,
    BasicPrice,
    developer,
    ProjectThumblin: {
      url: thumblin,
      altText: projectName,
    },
  });
  const saveProject = await newProject.save();
  resultStatus(res, 200, "created new projects", saveProject);
});

// Delete Single Blog
exports.deleteSinglProject = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const deleteProject = await Project.findByIdAndDelete(id);

  resultStatus(res, 404, "delete project sucesfully", deleteProject);
});

// Upadte project as upcoming Project

exports.upcomingProjects = catchAsync(async (req, res, next) => {
  const { _id } = req.body;

  const project = await Project.findById(_id);

  if (!project) {
    return res.status(404).json({
      status: "Error",
      message: "Project not found",
    });
  }
  // Toggle the upcomingProject value
  project.upcomingProject = !project.upcomingProject;

  await project.save();

  res.status(200).json({
    status: "Success",
    message: "Upcoming status update succesfully",
    project,
  });
});
