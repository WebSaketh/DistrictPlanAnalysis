import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "http://172.25.237.177:8080",
});

export const getInitialization = () => api.get(`/initialize/`);

export const getState = (state) => api.get("/initialize/" + state);

export const getClusters = (stateName, ensembleName, distanceMeasure) =>
  api.get(
    "/cluster/getAll/" + stateName + "/" + ensembleName + "/" + distanceMeasure
  );

export const getDistrictPlanInformationForSelectedCluster = (clusterId) =>
  api.get("/dp/getDistrictPlanInfo/" + clusterId);

export const getDistrictPlanGeoJson = (dpId) =>
  api.get("/dp/getDistrictPlan/" + dpId);

export const getAverageDistrictPlanGeoJson = (dpId) =>
  api.get("/dp/getAverageDistrictPlan/" + dpId);

export const getComparisonDistrictMeasures = (stateName, ensembleName) =>
  api.get("/ensemble/" + stateName + "/" + ensembleName);

export const getEnsembleAssoication = (stateName) =>
  api.get("/ensemble/" + stateName);

const apis = {
  getInitialization,
  getState,
  getClusters,
  getDistrictPlanInformationForSelectedCluster,
  getDistrictPlanGeoJson,
  getAverageDistrictPlanGeoJson,
  getComparisonDistrictMeasures,
  getEnsembleAssoication,
};

export default apis;
