import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    console.log("-----");
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
    console.log("-----------+");
    console.log(user);
    console.log("--------------+");
  }, []);

  return (
    <div>
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blogs
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;