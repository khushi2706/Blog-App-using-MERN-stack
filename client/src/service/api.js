import axios from "axios";

const URL = "http://localhost:5000";

export const userLogin = (credentials) => {
  try {
    const response = axios.post(`${URL}/api/users/login`, credentials);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = (credentials) => {
  try {
    const response = axios.post(`${URL}/api/users/signup`, credentials);
    return response;
  } catch (error) {
    console.log(error);
  }
};
