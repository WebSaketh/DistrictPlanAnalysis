import { useState, useEffect } from "react";
import ClusterTable from "src/app/components/InfoPanel/ClusterTable.js";
import DistrictPlanTable from "./DistrictPlanTable.js";
import InfoTabs from "src/app/components/InfoPanel/InfoTabs.js";
import Scatterplot from "src/app/components/Scatterplot/Scatterplot.js";
import DistrictPlanPlot from "src/app/components/Scatterplot/DistrictPlanPlot.js";
import SelectionMessage from "src/app/components/InfoPanel/SelectionMessage.js";

const InfoPanel = (props) => {
  const [tabValue, setTabValue] = useState("Clusters");

  if (!props.distanceMeasure) {
    return <SelectionMessage></SelectionMessage>;
  }

  if (props.cluster) {
    return (
      <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
        <InfoTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabList={["District Plans", "District Plan Scatterplot"]}
          cluster={props.cluster}
          clickClusterButton={props.clickClusterButton}
        ></InfoTabs>
        <div hidden={tabValue !== "District Plans"}>
          <DistrictPlanTable
            districtPlanInfo={props.districtPlanInfo}
            changeCluster={props.changeCluster}
            changeDistrictPlan={props.changeDistrictPlan}
            clusterADP={props.clusterADP}
          ></DistrictPlanTable>
        </div>
        <div hidden={tabValue !== "District Plan Scatterplot"}>
          <DistrictPlanPlot
            districtPlanInfo={props.districtPlanInfo}
            changeDistrictPlan={props.changeDistrictPlan}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
      <InfoTabs
        tabValue={tabValue}
        setTabValue={setTabValue}
        tabList={["Clusters", "MDS Cluster Scatterplot"]}
      ></InfoTabs>
      <div hidden={tabValue !== "Clusters"}>
        <ClusterTable
          clusters={props.clusters}
          changeCluster={props.changeCluster}
          tabValue={tabValue}
          setTabValue={setTabValue}
        ></ClusterTable>
      </div>
      <div hidden={tabValue !== "MDS Cluster Scatterplot"}>
        <Scatterplot
          width={600}
          height={400}
          clusters={props.clusters}
          setTabValue={setTabValue}
          tabValue={tabValue}
          onClick={props.changeCluster}
          nextTab="District Plan Scatterplot"
        />
      </div>
    </div>
  );
};
export default InfoPanel;
