import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatTitle, useStyles } from "./utils";
import config from "../config";
import placeholderImg from "../../src/placeholder.jpg";

const Blogs = ({ title, desc, img, user, isUser, id, date, onDelete, onEdit }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
      return;
    }
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`${config.BASE_URL}/api/blogs/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
      return;
    }
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  const formattedTitle = formatTitle(title);

  return (
    <div>
      <Card
        className="glass"
        sx={{
          position: "relative",
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
          border: "1px solid var(--border)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
          cursor: "pointer",
          transition:
            "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease, border-color 220ms ease, background 220ms ease",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(110,231,255,0.0), rgba(110,231,255,0.10), rgba(255,106,213,0.12))",
            opacity: 0,
            transition: "opacity 220ms ease",
            pointerEvents: "none",
          },
          "&:hover": {
            transform: "translateY(-10px) scale(1.01)",
            boxShadow: "0 28px 60px rgba(0,0,0,0.22)",
            borderColor: "var(--card-strong)",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
            "&::after": { opacity: 1 },
            "& .blog-title": {
              color: "var(--primary)",
            },
            "& .blog-media": {
              transform: "scale(1.06)",
            },
            "& .blog-avatar": {
              transform: "rotate(-8deg) scale(1.06)",
            },
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              onClick={handleEdit}
              sx={{
                marginLeft: "auto",
                transition: "transform 160ms ease, background-color 160ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: "rgba(110,231,255,0.12)",
                },
              }}
            >
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton
              onClick={() => setOpenConfirm(true)}
              sx={{
                transition: "transform 160ms ease, background-color 160ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: "rgba(255,106,213,0.12)",
                },
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={`${classes.font} blog-avatar`}
              sx={{
                bgcolor: "rgba(110,231,255,0.4)",
                color: "var(--title)",
                fontWeight: 700,
                transition: "transform 220ms ease, background-color 220ms ease",
              }}
              aria-label="recipe"
            >
              {user ? user.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={
            <Typography
              className="blog-title"
              sx={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 900,
                fontSize: "1.22rem",
                lineHeight: 1.25,
                color: "var(--title)",
                transition: "color 220ms ease, transform 220ms ease",
              }}
            >
              {formattedTitle}
            </Typography>
          }
          subheader={
            <Typography
              className="muted"
              variant="caption"
              sx={{ letterSpacing: "0.01em" }}
            >
              {user} {date ? `• ${date}` : ""}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          className="blog-media"
          sx={{
            height: { xs: 200, md: 240 },
            objectFit: "cover",
            filter: "saturate(1.03) contrast(1.01)",
            transition: "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
          image={img || placeholderImg}
          alt={formattedTitle || "Blog image"}
          onError={(e) => {
            e.currentTarget.src = placeholderImg;
          }}
        />
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            sx={{
              color: "var(--text)",
              opacity: 0.92,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              transition: "opacity 220ms ease",
            }}
          >
            {desc}
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete this blog?</DialogTitle>
        <DialogContent>
          <Typography className="muted">
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setOpenConfirm(false);
              handleDelete();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Blogs;
