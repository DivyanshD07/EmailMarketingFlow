import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/api", // change this if deployed
});

export default API;
