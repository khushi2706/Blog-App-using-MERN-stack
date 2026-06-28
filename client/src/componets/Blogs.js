import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    let res;
    try {
      res = await axios.get(`${config.BASE_URL}/api/blogs`);
    } catch (err) {
      console.log(err);
      throw err; // Re-throw the error to be caught by the .then().catch() chain
    }
    const data = res.data;
    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => setBlogs(data.blogs))
      .catch((err) => console.log("Fetch blogs error:", err)); // Add catch block
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
