
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
    // GET Project By Location 
    const getlocation = await LocationProjects.findOne({slug});
    console.log(getlocation.ProjectCity)
    const projects = await Project.find({
       ProjectSector: getlocation.ProjectCity,
      });
      res.status(200).json({
        location: getlocation.ProjectCity,
        status: "Success",
        projects,
      });
  }) 