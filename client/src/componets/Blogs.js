import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      return res.data;
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || err?.message || "Request failed";
      return { error: true, message, data: err?.response?.data ?? null };
    }
  };
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    sendRequest().then((data) => {
      if (!data || data.error) {
        setErrorMsg(data?.message || "No response from server");
        setBlogs([]);
        setIsLoading(false);
        return;
      }
      setBlogs(data?.data?.blogs || []);
      setIsLoading(false);
    });
  }, []);
  console.log(blogs);
  return (
    <div>
      <div className="hero glass">
        <h1>Discover what people are building.</h1>
        <p>
          A clean, modern space for your ideas. Share, explore, and connect
          through blogs.
        </p>
      </div>
      {isLoading && <p className="muted">Loading blogs...</p>}
      {errorMsg && <p className="muted">{errorMsg}</p>}
      <div className="grid">
        {blogs &&
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user?._id}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={blog.user?.name}
              date={new Date(blog.date).toLocaleDateString()}
              onDelete={(id) =>
                setBlogs((prev) => prev.filter((item) => item._id !== id))
              }
            />
          ))}
      </div>
      {blogs?.length === 0 && !errorMsg && (
        <p className="muted" style={{ marginTop: 16 }}>
          No blogs yet. Be the first to post.
        </p>
      )}
    </div>
  );
};

export default Blogs;
