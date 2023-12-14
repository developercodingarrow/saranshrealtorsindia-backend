const AppError = require("./appErrors");

const handelCastErrorDB = (err) => {
  const message = `INvalid ${err.path} : ${err.value}.`;

  return new AppError(message, 400);
};

const handelDuplicate = (err) => {
  const message = `Duplicate Filed value please use anoth name`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPro = (err, res) => {
  // Operational Error , trusted Error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) Log Error
    console.log("Error", err);
    // 2) send generate Message
    res.status(500).json({
      status: "error",
      message: "somthing went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.code === 11000) {
      console.log("run");
      error = handelDuplicate(error);
    }
    if (error.path === "_id") {
      error = handelCastErrorDB(error);
    }

    sendErrorPro(error, res);
  }
};
