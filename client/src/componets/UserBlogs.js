/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: "0 auto",
    width: "100%",
  },
  intro: {
    marginBottom: "22px",
    padding: "24px",
    borderRadius: "22px",
    background: "linear-gradient(135deg, rgba(110,231,255,0.14), rgba(255,106,213,0.12))",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
  },
  introTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: "clamp(26px, 3vw, 38px)",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    marginBottom: "8px",
  },
  introText: {
    color: "var(--muted)",
    maxWidth: "760px",
    lineHeight: 1.6,
  },
  introMeta: {
    marginTop: "14px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontSize: "14px",
    fontWeight: 600,
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "22px",
    width: "100%",
    alignItems: "start",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "16px",
    },
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  editButton: {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "red",
    cursor: "pointer",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);
  const lastRefresh = useRef(0);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    const refreshToken = location.state?.refresh || 0;
    if (hasFetched.current && lastRefresh.current === refreshToken) return;
    hasFetched.current = true;
    lastRefresh.current = refreshToken;
    if (!id) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    sendRequest().then((data) => {
      setUser(data?.data?.user);
      setIsLoading(false);
    });
  }, [id, location.state?.refresh]);

  const handleDelete = async (blogId) => {
    if (!blogId) return;
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      const fresh = await sendRequest();
      setUser(fresh?.data?.user || null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const handleEdit = (blogId) => {
    if (!blogId) return;
    navigate(`/myBlogs/${blogId}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.intro}>
        <h2 className={classes.introTitle}>My Blogs</h2>
        <p className={classes.introText}>
          Your personal writing space, organized for quick scanning and easy editing.
          Posts are shown in a compact two-column layout on larger screens and a single
          column on mobile.
        </p>
        <div className={classes.introMeta}>{user?.blogs?.length || 0} posts</div>
      </div>
      {isLoading && <p className="muted">Loading your blogs...</p>}
      {user && user.blogs && (
        <div className={classes.blogGrid}>
          {Array.from(
            new Map(user.blogs.map((blog) => [blog._id, blog])).values()
          ).map((blog) => (
            <div key={blog._id} className={classes.blogContainer}>
              <Blog
                id={blog._id}
                isUser={true}
                title={blog.title}
                desc={blog.desc}
                img={blog.img}
                user={user.name}
                date={new Date(blog.date).toLocaleDateString()}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
