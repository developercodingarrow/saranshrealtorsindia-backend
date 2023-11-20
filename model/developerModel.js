const mongoose = require("mongoose");
const slugify = require("slugify");

const developerSchema = new mongoose.Schema({
  DeveloperName: {
    type: String,
    require: [true, "DEveloper Name is Required"],
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },
});

// slug the pormotional page Title
developerSchema.pre("save", function (next) {
  this.slug = slugify(this.DeveloperName, {
    lower: false,
  });
  next();
});

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
