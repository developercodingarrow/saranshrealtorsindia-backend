const mongoose = require("mongoose");
const slugify = require("slugify");

const developerProjectSchema = new mongoose.Schema({
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

  developer: {
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
developerProjectSchema.pre("save", function (next) {
  this.slug = slugify(this.pageTitle, {
    lower: false,
  });

  // Convert developer name to lowercase before saving
  if (this.developer && typeof this.developer === "string") {
    this.developer = this.developer.toLowerCase();
  }

  next();
});

const DeveloperProjects = mongoose.model(
  "DeveloperProjects",
  developerProjectSchema
);

module.exports = DeveloperProjects;
