import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { userLogin } from "../service/api";

const signupValues = {
  name: "",
  email: "",
  password: "",
};

const loginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupValues);
  const [login, setLogin] = useState(loginValues);
  const [error, setError] = useState(null);

  const handleSignupChange = (evt) => {
    setSignup({ ...signup, [evt.target.name]: evt.target.value });
  };

  const handleLoginChange = (evt) => {
    setLogin({ ...login, [evt.target.name]: evt.target.value });
  };

  const handleLogin = async () => {
    if (validateLoginFields()) {
      console.log(login);
      setLogin(loginValues);
      const res = await userLogin(login);
      console.log(res);
    }
  };

  const handleSignup = async () => {
    if (validateSignupField()) {
      console.log(signup);
      setSignup(signupValues);
    }
  };

  const handleCreateAccount = () => {
    setError(null);
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const validateLoginFields = () => {
    if (!login.email || !login.password) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };

  const validateSignupField = () => {
    if (!signup.name || !signup.email || !signup.password) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };
  return (
    <Box
      maxWidth={400}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin="auto"
      marginTop={5}
      borderRadius={5}
    >
      {account === "login" ? (
        <>
          <Typography variant="h2" padding={3} textAlign="center">
            {account === "signup" ? "Signup" : "Login"}
          </Typography>
          <TextField
            name="email"
            onChange={handleLoginChange}
            value={login.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleLoginChange}
            value={login.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          {error && <p>{error}</p>}

          <Button
            onClick={handleLogin}
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
            color="warning"
          >
            Login
          </Button>

          <Button onClick={handleCreateAccount}>Create an account</Button>
        </>
      ) : (
        <>
          <Typography variant="h2" padding={3} textAlign="center">
            {account ? "Signup" : "Login"}
          </Typography>
          <TextField
            name="name"
            onChange={handleSignupChange}
            value={signup.name}
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name="email"
            onChange={handleSignupChange}
            value={signup.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleSignupChange}
            value={signup.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          {error && <p>{error}</p>}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
            color="warning"
            onClick={handleSignup}
          >
            Sign-in
          </Button>
          <Button onClick={handleCreateAccount}>Already have an account</Button>
        </>
      )}
    </Box>
  );
};

export default Login;
