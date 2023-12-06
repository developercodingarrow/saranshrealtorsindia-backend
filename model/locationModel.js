const mongoose = require("mongoose");
const slugify = require("slugify");

const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    require: [true, "City Name is Required"],
  },

  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },
});

// slug the pormotional page Title
locationSchema.pre("save", function (next) {
  this.slug = slugify(this.locationName, {
    lower: false,
  });
  next();
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
