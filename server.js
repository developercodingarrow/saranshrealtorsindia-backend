const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaughtException : shutting down....");
  process.exit(1);
});

const app = require("./app");
const port = process.env.PORT;
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection sucessful!");
    console.log(process.env.NODE_ENV);
  });

const server = app.listen(port, () => {
  console.log(`App is Running on port ${port}... `);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection : shutting down....");
  server.close(() => {
    process.exit(1);
  });
});
