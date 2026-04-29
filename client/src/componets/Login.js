import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);
  const sendRequest = async (type = "login") => {
    console.log("inside send req");
    console.log(`${config.BASE_URL}/api/users/${type}`);
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      console.log("return");
      console.log(res.data);
      return res.data;
    } catch (err) {
      const status = err?.response?.status;
      const serverMessage = err?.response?.data?.message;
      const fallbackMessage =
        status === 400 && type === "signup"
          ? "User already exists. Please login."
          : status === 404 && type === "login"
          ? "User not found. Please signup first."
          : "Request failed";
      const message = serverMessage || err?.message || fallbackMessage;
      console.log(err);
      return { error: true, message, data: err?.response?.data ?? null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    setErrorMsg("");
    const data = await sendRequest(isSignup ? "signup" : "login");
    if (!data || data.error) {
      console.error(
        "Login failed:",
        data?.message || "No response from server",
        data
      );
      setErrorMsg(data?.message || "No response from server");
      return;
    }
    const userId = data?.data?.user?._id;
    if (!userId) {
      console.error("Login failed: missing user id in response", data);
      return;
    }
    localStorage.setItem("userId", userId);
    dispatch(authActions.login());
    navigate("/blogs");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width="100%"
          maxWidth={440}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          className="form-card"
          padding={4}
          margin="auto"
          marginTop={5}
        >
          <Typography
            variant="h3"
            padding={3}
            textAlign="center"
            className="page-title"
          >
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {errorMsg && (
            <Typography color="error" sx={{ mb: 1, textAlign: "center" }}>
              {errorMsg}
            </Typography>
          )}
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              sx={{
                width: "100%",
                input: { color: "var(--text)" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },
              }}
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            sx={{
              width: "100%",
              input: { color: "var(--text)" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border)",
              },
            }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            sx={{
              width: "100%",
              input: { color: "var(--text)" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border)",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className="pill-button"
            sx={{ marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            className="pill-button"
            sx={{ marginTop: 2 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
