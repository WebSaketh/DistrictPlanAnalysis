import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getInitialization = () => api.get(`/initialize/`);

export const getState = (state) => api.get("/initialize/" + state);

export const getClusters = (stateName, ensembleName, distanceMeasure) =>
  api.get("/cluster/" + stateName + "/" + ensembleName + "/" + distanceMeasure);

const apis = {
  getInitialization,
  getState,
  getClusters,
};

export default apis;
