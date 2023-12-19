import { useState, useEffect } from "react";
import ClusterTable from "src/app/components/ClusterTable.js";
import DistrictPlanTable from "./DistrictPlanTable.js";
import InfoTabs from "src/app/components/InfoTabs.js";
import Scatterplot from "src/app/components/Scatterplot.js";
import DistrictPlanPlot from "src/app/components/DistrictPlanPlot.js";
import SelectionMessage from "src/app/components/SelectionMessage.js";
import SimpleLineChart from "src/app/components/SimpleLineChart.js";
import Table from "./Table";
import EnsembleSizeAnalysis from "./EnsembleSizeAnalysis.js";
import HorizontalBoxPlot from "./HorizontalBoxPlot.js";

const InfoPanel = (props) => {
  const [tabValue, setTabValue] = useState("Cluster Table");
  const [tabValue2, setTabValue2] = useState("Gui9");
  const [mainTabValue, setMainTabValue] = useState(
    "Ensemble & Cluster Analysis"
  );
  const [selected, setSelected] = useState([]);
  const [tableValue, setTableValue] = useState(1);
  const [thisADP, setThisADP] = useState(null);

  const changeTab2 = (tabName) => {
    setTabValue2(tabName);
  };

  const changeTab = (tabName) => {
    if (
      tabName === "Ensemble & Cluster Analysis" ||
      tabName === "Distance Measure Analysis"
    ) {
      setMainTabValue(tabName);
    } else {
      if (tabName === "Gui9" || tabName === "Gui10/21") setTabValue2(tabName);
      else setTabValue(tabName);
    }

    setSelected([]);

    props.changeDistrictPlan([]);
    props.setClusterADP(null);
    setThisADP(null);
  };

  useEffect(() => {
    setSelected([]);
    setThisADP(null);
  }, [props.cluster, props.distanceMeasure]);

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

  const [mainSelected, setMainSelected] = useState([]);

  if (!props.distanceMeasure) {
    return (
      <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
        <SelectionMessage />
      </div>
    );
  }

  return (
    <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
      {
        <InfoTabs
          tabValue={mainTabValue}
          tabList={["Ensemble & Cluster Analysis", "Distance Measure Analysis"]}
          setTabValue={changeTab}
          color="primary"
          variant="fullWidth"
        />
      }

      {mainTabValue === "Ensemble & Cluster Analysis" && !props.cluster && (
        <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
          <InfoTabs
            tabValue={tabValue}
            setTabValue={changeTab}
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
            setTabValue={changeTab}
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
              responses={props.responses}
              setResponses={props.setResponses}
              tabValue={tabValue}
            ></DistrictPlanTable>
          </div>
          <div hidden={tabValue !== "District Plan Scatterplot"}>
            <DistrictPlanPlot
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              districtPlan={props.districtPlan}
              districtPlanInfo={props.districtPlanInfo}
              changeDistrictPlan={props.changeDistrictPlan}
            />
          </div>
        </div>
      )}

      {mainTabValue === "Distance Measure Analysis" && (
        <div>
          <InfoTabs
            tabValue={tabValue2}
            setTabValue={changeTab}
            tabList={["Gui9", "Gui10/21"]}
            clickClusterButton={props.clickClusterButton}
            color="secondary"
          />
          <div className="flex flex-1 justify-center items-center">
            {tabValue2 === "Gui9" && (
              <div className="flex flex-1 flex-col ">
                <HorizontalBoxPlot data={dummyData} />
              </div>
            )}
            {tabValue2 === "Gui10/21" && <EnsembleSizeAnalysis />}
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

const dummyData = [
  { category: "Optimal Transport", values: [0.1, 0.3, 0.5, 0.7, 1.0] },
  { category: "Hamming Distance", values: [0.3, 0.4, 0.6, 0.8, 1.0] },
  { category: "Entropy", values: [0.1, 0.2, 0.45, 0.65, 1.0] },
];
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
