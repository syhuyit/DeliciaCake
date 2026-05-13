import axios from "axios";

const API = axios.create({
  baseURL: "https://deliciagarden-api.onrender.com",
});

export default API;
