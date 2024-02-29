import React from "react";
import axios from "axios";
import config from "../config";

const DeleteButton = ({ blogId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send a delete request to your backend
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      // Call the onDelete callback to update the UI
      onDelete();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
