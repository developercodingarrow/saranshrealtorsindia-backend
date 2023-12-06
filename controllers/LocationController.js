const catchAsync = require("../utils/catchAsync");
const Location = require("../model/locationModel");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// Create new Developer
exports.addNewLocation = catchAsync(async (req, res, next) => {
  const { locationName } = req.body;
  const Newdata = await new Location({
    locationName,
  });

  const saveData = await Newdata.save();
  resultStatus(res, 200, "New City Added", saveData);
});

// GET ALL DEVELOPER LIST
exports.getAllLocation = catchAsync(async (req, res, next) => {
  const Newdata = await Location.find();
  resultStatus(res, 200, "fetch all Location", Newdata);
});

exports.deleteLocation = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const newData = await Location.findByIdAndDelete(_id);
  resultStatus(res, 200, "city Deleted", newData);
});
