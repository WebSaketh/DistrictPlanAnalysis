import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

/*const config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
};*/

export const getDistrictData = () => api.get(`/district/getAllData`);

const apis = {
  getDistrictData,
};

export default apis;
