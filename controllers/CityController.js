const catchAsync = require("../utils/catchAsync");
const City = require("../model/cityModel");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// Create new Developer
exports.addNewCity = catchAsync(async (req, res, next) => {
  const { cityName } = req.body;
  const Newdata = await new City({
    cityName,
  });

  const saveDeveloper = await Newdata.save();
  resultStatus(res, 200, "New City Added", Newdata);
});

// GET ALL DEVELOPER LIST
exports.getAllCities = catchAsync(async (req, res, next) => {
  const Newdata = await City.find();
  resultStatus(res, 200, "fetch all Cities", Newdata);
});

exports.deleteCity = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  const newData = await City.findByIdAndDelete(_id);
  resultStatus(res, 200, "city Deleted", newData);
});
