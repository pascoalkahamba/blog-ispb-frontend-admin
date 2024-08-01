import axios from "axios";

const appAxios = axios.create({
  baseURL: "http://localhost:3001",
});

export { appAxios };
