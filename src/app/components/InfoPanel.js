import { useState, useEffect } from "react";
import ClusterTable from "./ClusterTable.js";
import DistrictPlanTable from "./DistrictPlanTable.js";
import InfoTabs from "./InfoTabs.js";
import Scatterplot from "./Scatterplot.js";
import DistrictPlanPlot from "./DistrictPlanPlot.js";
import SelectionMessage from "./SelectionMessage.js";
import SimpleLineChart from "./SimpleLineChart.js";
import Table from "./Table";
import EnsembleSizeAnalysis from "./EnsembleSizeAnalysis.js";
import HorizontalBoxPlot from "./HorizontalBoxPlot.js";
import Scatterplot2 from "./Scatterplot2.js";
import DistrictPlanPlot2 from "./DistrictPlanPlot2.js";
import DistrictInfoTable from "./DistrictInfoTable.js";
import BoxAndWhiskersTable from "./BoxAndWhiskersTable.js";

const InfoPanel = (props) => {
  const [tabValue, setTabValue] = useState("Cluster Table");
  const [tabValue2, setTabValue2] = useState("Compare Distance Measures");
  const [mainTabValue, setMainTabValue] = useState(
    "Ensemble & Cluster Analysis"
  );
  const [selected, setSelected] = useState([]);
  const [tableValue, setTableValue] = useState(1);
  const [thisADP, setThisADP] = useState(null);

  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(1);

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const changeTab2 = (tabName) => {
    setTabValue2(tabName);
  };

  const changeTab = (tabName) => {
    console.log(tabName);
    if (
      tabName === "Ensemble & Cluster Analysis" ||
      tabName === "Distance Measure Analysis"
    ) {
      setMainTabValue(tabName);
    } else {
      if (
        tabName === "Compare Distance Measures" ||
        tabName === "Ensebmle Size Cluster Association"
      )
        setTabValue2(tabName);
      else setTabValue(tabName);
    }

    setSelected([]);

    props.changeDistrictPlan([]);
    props.setClusterADP(null);
    setSelectedDistrict(null);
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
      props.getClusterADP(cluster.clusterID);
    }
  };

  const changeTableValue = (value) => {
    setTableValue(value);
  };

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
            tabList={[
              "Cluster Table",
              "MDS Cluster Scatterplot",
              "Value Cluster Scatterplot",
            ]}
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
              state={props.state}
              distanceMeasure={props.distanceMeasure}
            ></ClusterTable>
          </div>
          <div hidden={tabValue !== "MDS Cluster Scatterplot"}>
            <Scatterplot
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              maxWidth={600}
              maxHeight={400}
              clusters={props.clusters}
              setTabValue={setTabValue}
              tabValue={tabValue}
              onClick={props.changeCluster}
              nextTab="District Plan MDS Scatterplot"
            />
          </div>
          <div hidden={tabValue !== "Value Cluster Scatterplot"}>
            <Scatterplot2
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              maxWidth={600}
              maxHeight={400}
              clusters={props.clusters}
              setTabValue={setTabValue}
              tabValue={tabValue}
              onClick={props.changeCluster}
              nextTab="District Plan Value Scatterplot"
              xAxis={xAxis}
              setXAxis={setXAxis}
              yAxis={yAxis}
              setYAxis={setYAxis}
            />
          </div>
        </div>
      )}
      {mainTabValue === "Ensemble & Cluster Analysis" && props.cluster && (
        <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
          <InfoTabs
            tabValue={tabValue}
            setTabValue={changeTab}
            tabList={[
              "District Plan Table",
              "District Plan MDS Scatterplot",
              "District Plan Value Scatterplot",
            ]}
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
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
            ></DistrictPlanTable>
            <DistrictInfoTable
              selectedDistrict={selectedDistrict}
              districtPlanInfo={props.districtPlanInfo}
            />
          </div>
          <div hidden={tabValue !== "District Plan MDS Scatterplot"}>
            <DistrictPlanPlot
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              districtPlan={props.districtPlan}
              districtPlanInfo={props.districtPlanInfo}
              changeDistrictPlan={props.changeDistrictPlan}
            />
          </div>
          <div hidden={tabValue !== "District Plan Value Scatterplot"}>
            <DistrictPlanPlot2
              tableValue={tableValue}
              changeTableValue={changeTableValue}
              districtPlan={props.districtPlan}
              districtPlanInfo={props.districtPlanInfo}
              changeDistrictPlan={props.changeDistrictPlan}
              xAxis={xAxis}
              setXAxis={setXAxis}
              yAxis={yAxis}
              setYAxis={setYAxis}
            />
          </div>
        </div>
      )}

      {mainTabValue === "Distance Measure Analysis" && (
        <div>
          <br />
          <InfoTabs
            tabValue={tabValue2}
            setTabValue={changeTab}
            tabList={[
              "Compare Distance Measures",
              "Ensebmle Size Cluster Association",
            ]}
            clickClusterButton={props.clickClusterButton}
            color="secondary"
          />
          <div className="flex flex-1 justify-center items-center">
            {tabValue2 === "Compare Distance Measures" && (
              <div className="flex flex-1 flex-col ">
                <br />
                <HorizontalBoxPlot
                  data={dummyData}
                  ensembleInfo={props.ensembleTableInfo}
                  state={props.state}
                  ensemble={props.ensemble}
                />
                <BoxAndWhiskersTable
                  state={props.state}
                  ensemble={props.ensemble}
                />
              </div>
            )}
            {tabValue2 === "Ensebmle Size Cluster Association" && (
              <div
                className="flex flex-1 flex-col"
                style={{ margin: "30px 30px" }}
              >
                <br />
                <EnsembleSizeAnalysis state={props.state} />
              </div>
            )}
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
