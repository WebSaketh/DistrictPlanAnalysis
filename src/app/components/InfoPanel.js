import { useState, useEffect } from "react";
import ClusterTable from "src/app/components/ClusterTable.js";
import DistrictPlanTable from "./DistrictPlanTable.js";
import InfoTabs from "src/app/components/InfoTabs.js";
import Scatterplot from "src/app/components/Scatterplot.js";
import DistrictPlanPlot from "src/app/components/DistrictPlanPlot.js";
import SelectionMessage from "src/app/components/SelectionMessage.js";
import SimpleLineChart from "src/app/components/SimpleLineChart.js";
import Table from "./Table";

const InfoPanel = (props) => {
  const [tabValue, setTabValue] = useState("Cluster Table");
  const [selected, setSelected] = useState([]);
  const [tableValue, setTableValue] = useState(1);
  const [thisADP, setThisADP] = useState(null);

  const settingADP = (index) => {
    if (thisADP !== null) {
      setThisADP(null);
      props.setClusterADP(null);
    } else {
      let cluster = props.clusters[index - 1];
      setThisADP(index);
      props.getClusterADP(cluster.clusterId);
    }
  };

  const changeTableValue = (value) => {
    setTableValue(value);
  };

  const [mainTabValue, setMainTabValue] = useState(
    "Ensemble & Cluster Analysis"
  );
  const [mainSelected, setMainSelected] = useState([]);

  if (!props.distanceMeasure) {
    return <SelectionMessage></SelectionMessage>;
  }

  return (
    <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
      <InfoTabs
        tabValue={mainTabValue}
        tabList={["Ensemble & Cluster Analysis", "Distance Measure Analysis"]}
        setTabValue={setMainTabValue}
        color="primary"
      />

      {mainTabValue === "Ensemble & Cluster Analysis" && !props.cluster && (
        <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
          <InfoTabs
            tabValue={tabValue}
            setTabValue={setTabValue}
            tabList={["Cluster Table", "Cluster Scatterplot"]}
            color="secondary"
          ></InfoTabs>
          <div hidden={tabValue !== "Cluster Table"}>
            <ClusterTable
              clusters={props.clusters}
              changeCluster={props.changeCluster}
              tabValue={tabValue}
              setTabValue={setTabValue}
              selected={thisADP}
              setSelected={settingADP}
            ></ClusterTable>
          </div>
          <div hidden={tabValue !== "Cluster Scatterplot"}>
            <Scatterplot
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              maxWidth={600}
              maxHeight={400}
              clusters={props.clusters}
              setTabValue={setTabValue}
              tabValue={tabValue}
              onClick={props.changeCluster}
              nextTab="District Plan Scatterplot"
            />
          </div>
        </div>
      )}
      {mainTabValue === "Ensemble & Cluster Analysis" && props.cluster && (
        <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
          <InfoTabs
            tabValue={tabValue}
            setTabValue={setTabValue}
            tabList={["District Plan Table", "District Plan Scatterplot"]}
            cluster={props.cluster}
            clickClusterButton={props.clickClusterButton}
            color="secondary"
          ></InfoTabs>
          <div hidden={tabValue !== "District Plan Table"}>
            <DistrictPlanTable
              districtPlanInfo={props.districtPlanInfo}
              changeCluster={props.changeCluster}
              changeDistrictPlan={props.changeDistrictPlan}
              clusterADP={props.clusterADP}
              selected={selected}
              setSelected={setSelected}
            ></DistrictPlanTable>
          </div>
          <div hidden={tabValue !== "District Plan Scatterplot"}>
            <DistrictPlanPlot
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              districtPlan={props.districtPlan}
              districtPlanInfo={props.districtPlanInfo}
              changeDistrictPlan={props.changeDistrictPlan}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {mainTabValue === "Distance Measure Analysis" && (
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-1 flex-col ">
            <div className="m-5 flex flex-row">
              <SimpleLineChart />
            </div>
            <div className="m-5">
              <Table data={data3} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InfoPanel;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const data3 = {
  columns: [
    "Metric Name",
    "Cluster Purity", //Cluster purity measures the proportion of data points in a cluster that belong to the majority class. Higher purity indicates more homogeneous clusters.
    "Execution Time",
    "Resource Utilization",
    "Silhouette Score", //The silhouette score quantifies how similar each data point is to its own cluster compared to other clusters. Higher scores indicate better-defined clusters.
    "Inertia", //Inertia measures the total distance between data points and their cluster centroids. Lower inertia indicates tighter clusters.
  ],
  rows: [
    [
      "Optimal Transport",
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Hamming Distance",
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Total Variation",
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Another Measure",
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
  ],
};
