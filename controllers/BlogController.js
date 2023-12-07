const catchAsync = require("../utils/catchAsync");
const Blog = require("../model/blogsModel");
const multer = require("multer");
const path = require("path");

// Multer

const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`${__dirname}/../../client/public/blog-images`));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `blog-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerstorage,
});

exports.BlogFeatureImage = upload.single("image");

// One Result status Function
const resultStatus = (res, statusCode, msg, result) => {
  res.status(statusCode).json({
    status: "Success",
    message: msg,
    result,
  });
};

// get All blogs
exports.allBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find();
  resultStatus(res, 200, "fetch all Blogs", blogs);
});

// Create new Blog
exports.createNewBlog = catchAsync(async (req, res) => {
  const { blogTitle, blogDescreption } = req.body;
  console.log(req.body);
  const image = req.file.filename;

  const newBlog = new Blog({
    blogTitle,
    blogDescreption,

    image: {
      url: image,
      altText: "Blog-image",
    },
  });

  const saveBlog = await newBlog.save();

  resultStatus(res, 200, "created new Blog", saveBlog);
});

exports.singleBlog = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  console.log(slug);

  const blog = await Blog.findOne({ slug });

  resultStatus(res, 200, "single blog fetch", blog);
});

// Delete Single Blog
exports.deleteSingleBlog = catchAsync(async (req, res) => {
  const { _id } = req.body;
  console.log(_id);

  const deleteBlog = await Blog.findByIdAndDelete(_id);

  resultStatus(res, 404, "delete blog sucesfully", deleteBlog);
});
