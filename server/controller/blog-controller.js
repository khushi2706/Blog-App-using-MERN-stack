const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs || blogs.length === 0) {
      return res.status(200).json(new ApiResponse(200, { blogs: [] }, "No blogs found"));
    }
    return res.status(200).json(new ApiResponse(200, { blogs }, "Blogs found"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

const addBlog = async (req, res, next) => {
  const { title, desc, img, user } = req.body;
  const currentDate = new Date();

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json(new ApiError(400, "Unauthorized"));
    }

    const blog = new Blog({ title, desc, img, user, date: currentDate });

    await blog.save();
    await blog.populate("user");
    existingUser.blogs.push(blog);
    await existingUser.save();

    return res.status(201).json(new ApiResponse(201, { blog }, "Blog created successfully"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(blogId, { title, desc }, { new: true });
    if (!blog) {
      return res.status(404).json(new ApiError(404, "Blog not found"));
    }
    return res.status(200).json(new ApiResponse(200, { blog }, "Blog updated successfully"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate("user");
    if (!blog) {
      return res.status(404).json(new ApiError(404, "Blog not found"));
    }
    return res.status(200).json(new ApiResponse(200, { blog }, "Blog retrieved successfully"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id).populate('user');
    if (!blog) {
      return res.status(404).json(new ApiError(404, "Blog not found"));
    }

    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json(new ApiResponse(200, null, "Blog deleted successfully"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json(new ApiError(404, "No blog found for this user"));
    }
    return res.status(200).json(new ApiResponse(200, { user: userBlogs }, "Blogs retrieved successfully"));
  } catch (e) {
    return res.status(500).json(new ApiError(500, e.message));
  }
};

module.exports = { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId };
