const catchAsync = require("../utils/catchAsync");
const Developer = require("../model/developerModel");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// GET ALL DEVELOPER LIST
exports.getAllDeveloper = catchAsync(async (req, res, next) => {
  const allDeveloper = await Developer.find();
  resultStatus(res, 200, "fetch all Developer", allDeveloper);
});

// Create new Developer
exports.createDeveloper = catchAsync(async (req, res, next) => {
  const { DeveloperName } = req.body;
  console.log(DeveloperName);
  const newDeveloper = await new Developer({
    DeveloperName,
  });

  const saveDeveloper = await newDeveloper.save();
  resultStatus(res, 200, "New Developer Added", saveDeveloper);
});

exports.deleteDeveloper = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const deleteDeveloper = await Developer.findByIdAndDelete(_id);
  resultStatus(res, 200, "Developer Deleted", deleteDeveloper);
});


