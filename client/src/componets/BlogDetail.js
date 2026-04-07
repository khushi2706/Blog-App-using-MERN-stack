import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "18px",
  fontWeight: "bold",
  color: "var(--text)",
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [blog, setBlog] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
      const data = res.data;
      const fetchedBlog = data?.data?.blog;
      setBlog(fetchedBlog);
      setInputs({
        title: fetchedBlog?.title || "",
        description: fetchedBlog?.desc || "",
      });
    } catch (err) {
      console.error("Failed to fetch blog details:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        desc: inputs.description,
      });
      return res.data;
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        console.log("Blog updated:", data);
        navigate("/myBlogs", { replace: true, state: { refresh: Date.now() } });
      });
  };

  return (
    <div>
      {blog ? (
        <form onSubmit={handleSubmit}>
          <Box
            className="form-card"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"100%"}
            sx={{ maxWidth: 760 }}
          >
          <Typography
            fontWeight={"bold"}
            padding={3}
            variant="h3"
            textAlign={"center"}
            className="page-title"
          >
            Update Blog
          </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
              required
              sx={{
                mx: "auto",
                width: "100%",
                input: { color: "var(--text)" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },
              }}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              required
              sx={{
                mx: "auto",
                width: "100%",
                textarea: { color: "var(--text)" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },
              }}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="warning"
              type="submit"
              className="pill-button"
            >
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <Typography textAlign="center" mt={5} variant="h5">
          Loading blog details...
        </Typography>
      )}
    </div>
  );
};

export default BlogDetail;
