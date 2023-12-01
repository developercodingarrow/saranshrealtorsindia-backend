const DeveloperProjects = require("../model/developerProjectModel");
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

  // Create new Developer Page
exports.createDeveloperPage = catchAsync(async (req, res, next) => {
    const { pageTitle, developer, topDescription, bottomDescription } =
      req.body;
  
    const newDeveloperProjectPage = new DeveloperProjects({
      pageTitle,
      developer,
      topDescription,
      bottomDescription,
    });
    const saveNewDeveloperProject = await newDeveloperProjectPage.save();
    resultStatus(
      res,
      201,
      "created new Developer page",
      saveNewDeveloperProject
    );
  });


// Get All Developer Project Page
exports.allDeveloperProjectList = catchAsync(async (req, res, next) => {
    const DeveloperPage = await DeveloperProjects.find();
    resultStatus(res, 200, "all Developer pages", DeveloperPage);
  });

// GET PROJECTS BY DEVELOPERS  
exports.developerProjectPage = catchAsync(async (req, res, next)=>{
    const { slug } = req.params;
    console.log(slug)
    // GET Project By Developer Title
    const getdeveloper = await DeveloperProjects.findOne({slug});

    const projects = await Project.find({
        developer: getdeveloper.developer,
      });

      res.status(200).json({
        developer: getdeveloper.developer,
        status: "Success",
        projects,
      });
}) 


// Projects by Loaction
exports.createLocationProjectPage = catchAsync(async (req,res,next)=>{
  const { pageTitle, ProjectCity, topDescription, bottomDescription } =
  req.body;

const newLocationProjectPage = new LocationProjects({
  pageTitle,
  ProjectCity,
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
})

// Get All Location Project Page
exports.allLocationProjectList = catchAsync(async (req, res, next) => {
  const LocationPage = await LocationProjects.find();
  resultStatus(res, 200, "all Developer pages", LocationPage);
});

// GET PROJECTS BY Location  
exports.locationProjectPage = catchAsync(async (req, res, next)=>{
  const { slug } = req.params;
  console.log(slug)
  // GET Project By Location 
  const getdeveloper = await LocationProjects.findOne({slug});

  const projects = await Project.find({
    ProjectCity: getdeveloper.ProjectCity,
    });

    res.status(200).json({
      developer: getdeveloper.ProjectCity,
      status: "Success",
      projects,
    });
}) 