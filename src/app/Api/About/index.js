import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:8080/about",
});

export const registerEmail = (email) => api.post(`/registerEmail`, email);

const aboutApis = {
  registerEmail,
};

export default aboutApis;
