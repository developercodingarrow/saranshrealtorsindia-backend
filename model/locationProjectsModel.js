const mongoose = require("mongoose");
const slugify = require("slugify");

const locationProjectSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
    require: [true, "Page Title is Required"],
    unique: true,
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },

  ProjectCity: {
    type: String,
  },

  topDescription: {
    type: String,
  },

  bottomDescription: {
    type: String,
  },
});

// slug the pormotional page Title
locationProjectSchema.pre("save", function (next) {
  this.slug = slugify(this.pageTitle, {
    lower: false,
  });
  next();
});

const LocationProjects = mongoose.model(
  "DeveloperProjects",
  locationProjectSchema
);

module.exports = LocationProjects;
