import React from "react";
import axios from "axios";
import config from "../config";
import { Button } from "@mui/material";

const DeleteButton = ({ blogId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send a delete request to your backend
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      // Call the onDelete callback to update the UI
      onDelete(blogId);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outlined"
      size="small"
      sx={{
        mt: 1,
        borderRadius: 999,
        borderColor: "rgba(255,255,255,0.2)",
        color: "#ff8ca8",
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
