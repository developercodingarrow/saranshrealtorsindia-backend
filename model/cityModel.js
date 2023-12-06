const mongoose = require("mongoose");
const slugify = require("slugify");

const citySchema = new mongoose.Schema({
  cityName: {
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
citySchema.pre("save", function (next) {
  this.slug = slugify(this.cityName, {
    lower: false,
  });
  next();
});

const City = mongoose.model("City", citySchema);

module.exports = City;
