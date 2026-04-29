import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import config from "../config";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTitle, useStyles } from "./utils";
import placeholderImg from "../../src/placeholder.jpg";

const labelStyles = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "var(--title)",
};

const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const fileInputId = "blog-upload-input";
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageDataUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageDataUrl(reader.result?.toString() || "");
    };
    reader.readAsDataURL(file);
  };

  const previewImage = useMemo(() => {
    if (imageDataUrl) return imageDataUrl;
    if (inputs.imageURL.trim()) return inputs.imageURL.trim();
    return placeholderImg;
  }, [imageDataUrl, inputs.imageURL]);

  const previewTitle = useMemo(() => {
    return formatTitle(inputs.title) || "Your blog title will appear here";
  }, [inputs.title]);

  const sendRequest = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return { error: true, message: "Please login before adding a blog." };
    }
    try {
      const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img:
          imageDataUrl ||
          (inputs.imageURL.trim() === "" ? placeholderImg : inputs.imageURL),
        user: userId,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || err?.message || "Request failed";
      return { error: true, message, data: err?.response?.data ?? null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();
    if (!data || data.error) {
      console.error(
        "Add blog failed:",
        data?.message || "No response from server",
        data
      );
      return;
    }
    navigate("/blogs");
  };

  return (
    <div className="composer-shell">
      <div className="hero glass">
        <h1>Create a new post</h1>
        <p>
          Shape your idea, add a cover image, and preview the final look before publishing.
        </p>
      </div>

      <div className="composer-grid">
        <form onSubmit={handleSubmit}>
          <Box className="composer-card" display="flex" flexDirection="column">
            <div className="composer-header">
              <Typography className={`${classes.font} page-title`} variant="h3">
                Post Your Blog
              </Typography>
              <Typography className="composer-subtitle">
                Build your post in a clean editor with a live preview. Your content stays readable in both light and dark mode.
              </Typography>
              <div className="composer-mini">
                <span className="composer-pill">Live preview</span>
                <span className="composer-pill">Image upload</span>
                <span className="composer-pill">Mobile friendly</span>
              </div>
            </div>

            <div className="field-group">
              <InputLabel className="field-label" sx={labelStyles}>
                Title
              </InputLabel>
              <TextField
                className={classes.font}
                name="title"
                onChange={handleChange}
                value={inputs.title}
                margin="none"
                variant="outlined"
                placeholder="Give your blog a strong headline"
                sx={{
                  width: "100%",
                  input: { color: "var(--text)", fontWeight: 600 },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--border)",
                  },
                }}
              />
            </div>

            <div className="field-group">
              <InputLabel className="field-label" sx={labelStyles}>
                Description
              </InputLabel>
              <Typography className="field-note">
                Write clearly and keep paragraphs short for a smoother reading experience.
              </Typography>
              <TextareaAutosize
                className={classes.font}
                name="description"
                onChange={handleChange}
                minRows={10}
                value={inputs.description}
                placeholder="Start writing your story..."
                style={{
                  width: "100%",
                  background: "var(--input-bg)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: 14,
                  outline: "none",
                  resize: "vertical",
                  font: "inherit",
                  lineHeight: 1.7,
                }}
              />
            </div>

            <div className="field-group">
              <InputLabel className="field-label" sx={labelStyles}>
                Image URL
              </InputLabel>
              <Typography className="field-note">
                Paste a direct image link or use the upload box below.
              </Typography>
              <TextField
                className={classes.font}
                name="imageURL"
                onChange={handleChange}
                value={inputs.imageURL}
                variant="outlined"
                placeholder="https://example.com/image.jpg"
                sx={{
                  width: "100%",
                  input: { color: "var(--text)" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--border)",
                  },
                }}
              />
              {inputs.imageURL.trim() !== "" && !imageDataUrl && (
                <Box
                  sx={{
                    mt: 1.5,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={inputs.imageURL}
                    alt="Preview"
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </Box>
              )}
            </div>

            <div className="field-group">
              <InputLabel className="field-label" sx={labelStyles}>
                Upload from device
              </InputLabel>
              <label htmlFor={fileInputId} className="upload-dropzone">
                <span className="upload-meta">
                  <span className="upload-title">Choose a file</span>
                  <span className="upload-subtitle">
                    JPG, PNG, WEBP up to your browser limit
                  </span>
                </span>
                <span className="composer-pill">Browse</span>
              </label>
              <input
                id={fileInputId}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  border: 0,
                }}
              />
              {imageDataUrl && (
                <Box
                  sx={{
                    mt: 1.5,
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={imageDataUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                </Box>
              )}
            </div>

            <Divider sx={{ my: 3, borderColor: "var(--border)" }} />

            <Button
              sx={{ mt: 0 }}
              variant="contained"
              type="submit"
              className="pill-button publish-button"
              fullWidth
            >
              Publish Blog
            </Button>
          </Box>
        </form>

        <Card className="preview-card surface-panel">
          <CardContent>
            <Typography className="page-title" variant="h4" gutterBottom>
              Preview
            </Typography>
            <Typography className="composer-subtitle" sx={{ mb: 2 }}>
              This is how your post will feel to readers before you publish it.
            </Typography>

            <div className="preview-hero">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Blog preview"
                  className="preview-image"
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
              ) : (
                <div className="preview-empty">
                  <div>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      Add an image
                    </Typography>
                    <Typography className="muted">
                      A cover image gives the post more impact.
                    </Typography>
                  </div>
                </div>
              )}
            </div>

            <Typography className="preview-title" sx={{ mt: 2 }}>
              {previewTitle}
            </Typography>

            <div className="preview-meta">
              <span className="preview-chip">Featured cover</span>
              <span className="preview-chip">Readable layout</span>
              <span className="preview-chip">Modern styling</span>
            </div>

            <Typography className="preview-desc" sx={{ mt: 2 }}>
              {inputs.description.trim() ||
                "Your description preview will appear here. Use this area to check spacing and tone before publishing."}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddBlogs;
