const Project = require("../model/projectsModel");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const path = require("path");

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

const Covermulterstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.resolve(`${__dirname}/../../client/public/project-cover-image`)
    );
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `project-cover-image-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const floorPlanmulterstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`${__dirname}/../../client/public/Floor-Plan`));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `Floor-Plan-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerstorage,
});

const Coverupload = multer({
  storage: Covermulterstorage,
});

const floorPlanupload = multer({ storage: floorPlanmulterstorage });

// exports.ProjectThumblinImage = upload.single("ProjectThumblin");

exports.ProjectThumblinImage = (req, res, next) => {
  upload.single("ProjectThumblin")(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err); // Log any multer-related errors
      return res.status(400).send("File upload error");
    }
    next();
  });
};

exports.multerProjectCoverImage = (req, res, next) => {
  Coverupload.single("ProjectCoverImage")(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err); // Log any multer-related errors
      return res.status(400).send("File upload error");
    }
    next();
  });
};

exports.floorPlanImages = (req, res, next) => {
  floorPlanupload.array("floorPlanImages", 4)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error handling
      console.error("Multer Error:", err);
      return res.status(400).send("File upload error");
    } else if (err) {
      // Other errors
      console.error("Error:", err);
      return res.status(500).send("Something went wrong");
    }
    next();
  });
};

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
  const { search } = req.query;
  const decodedSearch = decodeURIComponent(search);
  console.log(decodedSearch);
  let properties;
  if (search) {
    // If a search query is provided, perform the search
    properties = await Project.find({
      $or: [
        { projectName: { $regex: decodedSearch, $options: "i" } },
        { cityName: { $regex: decodedSearch, $options: "i" } },
        { locationName: { $regex: decodedSearch, $options: "i" } },
      ],
    });
  } else {
    // If no search query, fetch all projects
    properties = await Project.find();
  }
  resultStatus(res, 200, "fetch all projects", properties);
});

exports.featureProjects = catchAsync(async (req, res, next) => {
  const data = await Project.find({ Featured: true });
});

// Create a new Project
exports.createNewProject = catchAsync(async (req, res, next) => {
  console.log("run");

  const {
    projectName,
    locationName,
    cityName,
    UnitType,
    Budget,
    developer,
    BasicPrice,
    FlatSizeRange,
    RERANo,
    address,
  } = req.body;

  let thumblin = "project-dummy-image.jpg";

  if (req.file?.filename) {
    thumblin = req.file.filename;
  }

  const newProject = new Project({
    projectName,
    locationName,
    cityName,
    Budget,
    UnitType,
    FlatSizeRange,
    BasicPrice,
    developer,
    RERANo,
    address,
    ProjectThumblin: {
      url: thumblin,
      altText: projectName,
    },
  });
  const saveProject = await newProject.save();
  resultStatus(res, 200, "created new projects", saveProject);
});

exports.updateThumblinIMage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const thumblin = req.file.filename;
  const upadteThumblin = await Project.findByIdAndUpdate(
    id,
    {
      ProjectThumblin: {
        url: thumblin,
        altText: "update-new-image",
      },
    },
    { new: true }
  );

  return res.status(200).json({
    status: "Success",
    message: "Project Thumblin Update Succesfully",
    upadteThumblin,
  });
});

exports.updateCoverImage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const coverImage = req.file.filename;

  const upadteCover = await Project.findByIdAndUpdate(
    id,
    {
      ProjectCoverImage: {
        url: coverImage,
        altText: "update-new-image",
      },
    },
    { new: true }
  );

  return res.status(200).json({
    status: "Success",
    message: "Project Cover image Update Succesfully",
    upadteCover,
  });
});

exports.updateFloorPlanImages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const files = req.files; // Assuming multer stores multiple files in req.files

  const images = files.map((file) => ({
    url: file.filename,
    altText: "update-new-image", // Set alt text as needed
  }));

  const floorPlans = await Project.findByIdAndUpdate(
    id,
    {
      $push: { floorPlanImages: { $each: images } }, // Use $push with $each to add multiple images to the array
    },
    { new: true }
  );

  return res.status(200).json({
    status: "Success",
    message: "Project Thumblin Update Succesfully",
    floorPlans,
  });
});

// Delete Single Project
exports.deleteSinglProject = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const deleteProject = await Project.findByIdAndDelete(_id);

  resultStatus(res, 404, "delete project sucesfully", deleteProject);
});

// DELETE MULTIPLE PROJECTS
exports.deleteMultipleProjects = catchAsync(async (req, res, next) => {
  const { projectIds } = req.body; // Assuming an array of projectIds is sent in the request body
  // Handle deletion of multiple projects
  const deleteProjects = await Project.deleteMany({ _id: { $in: projectIds } });
  // Check if any projects were deleted
  if (deleteProjects.deletedCount > 0) {
    return res.status(200).json({
      status: "Success",
      message: `${deleteProjects.deletedCount} projects deleted successfully.`,
    });
  } else {
    return res.status(404).json({
      status: "Error",
      message: "No projects were deleted.",
    });
  }
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

exports.toggleFeatureProject = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const project = await Project.findById(_id);

  if (!project) {
    return res.status(404).json({
      status: "Error",
      message: "Project not found",
    });
  }

  // Toggle the status
  project.Featured = !project.Featured;
  await project.save();

  return res.status(200).json({
    status: "Success",
    message: "Feature Project Status Update Succesfully",
    project,
  });
});

// Toogle project Status
exports.toggleProjectStatus = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { _id } = req.body;

  const project = await Project.findById(_id);

  if (!project) {
    return res.status(404).json({
      status: "Error",
      message: "Project not found",
    });
  }

  // Toggle the status
  project.status = !project.status;
  await project.save();

  return res.status(200).json({
    status: "Success",
    message: "Project Status Update Succesfully",
    project,
  });
});

exports.ProjectStatusType = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { _id, optionValue } = req.body;

  const project = await Project.findByIdAndUpdate(_id, {
    ProjectStatus: optionValue,
  });

  return res.status(200).json({
    status: "Success",
    message: "Project Status Update Succesfully",
    project,
  });
});

exports.getSingleProject = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const project = await Project.findOne(slug);

  if (!project) {
    return res.status(404).json({
      status: "Error",
      message: "Project not found",
    });
  }

  return res.status(200).json({
    status: "Success",
    message: "Project Status Update Succesfully",
    project,
  });
});

exports.getSingleProjectForUpdate = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const data = await Project.findById(_id);
  if (!data) {
    return next(new AppError("data is invalid", 404));
  }

  return res.status(200).json({
    status: "Success",
    message: "Single Project fetch Succesfully",
    result: data,
  });
});
