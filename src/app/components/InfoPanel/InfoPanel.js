import { useState } from "react";
import ClusterTable from "src/app/components/InfoPanel/ClusterTable.js";
import DistrictPlanTable from "./DistrictPlanTable.js";
import InfoTabs from "src/app/components/InfoPanel/InfoTabs.js";
import Scatterplot from "src/app/components/Scatterplot/Scatterplot.js";
import SelectionMessage from "src/app/components/InfoPanel/SelectionMessage.js";

const InfoPanel = (props) => {
  const [tabValue, setTabValue] = useState("Clusters");

  const data = [
    {
      x: 48.01227071909981,
      y: 96.22466652904393,
    },
    {
      x: 274.2864018471329,
      y: 12.102871422732605,
    },
    {
      x: 15.248825068104361,
      y: 117.08791673383467,
    },
    {
      x: 266.09797495949175,
      y: 164.59143768229848,
    },
    {
      x: 258.83179985987556,
      y: 300.6507686042916,
    },
    {
      x: 220.87775753250006,
      y: 210.60598080796728,
    },
    {
      x: 259.8398186730501,
      y: 10.536453063145629,
    },
    {
      x: 27.046964493198118,
      y: 57.88058157968625,
    },
    {
      x: 205.80556561012165,
      y: 159.90525994674508,
    },
    {
      x: 51.35218507223718,
      y: 49.93832075689728,
    },
    {
      x: 76.48570672148402,
      y: 115.6179930133955,
    },
    {
      x: 21.657784952081013,
      y: 269.17840811007613,
    },
    {
      x: 107.63536173870452,
      y: 231.2543249755074,
    },
    {
      x: 42.00631387659421,
      y: 267.8041355078837,
    },
    {
      x: 209.56465427086263,
      y: 281.1876218098753,
    },
    {
      x: 153.56767299150246,
      y: 244.49227387165263,
    },
    {
      x: 62.16289910949837,
      y: 279.1741925605549,
    },
    {
      x: 149.7063791973906,
      y: 226.15482737440942,
    },
    {
      x: 39.42972376510491,
      y: 117.71210042285382,
    },
    {
      x: 219.3935368966675,
      y: 270.7517029117739,
    },
  ];

  if (!props.distanceMeasure) {
    return <SelectionMessage></SelectionMessage>;
  }

  if (props.cluster) {
    return (
      <div className="flex-1 m-5 text-center content-center lg:h-full lg:w-full lg:mb-0  lg:text-left flex-1">
        <InfoTabs
          tabValue={tabValue}
          setTabValue={setTabValue}
          tabList={["District Plans", "District Scatterplot"]}
        ></InfoTabs>
        <div hidden={tabValue !== "District Plans"}>
          <DistrictPlanTable
            districtPlanInfo={props.districtPlanInfo}
            changeCluster={props.changeCluster}
          ></DistrictPlanTable>
        </div>
        <div hidden={tabValue !== "District Plans Scatterplot"}>
          <Scatterplot
            data={data}
            width={600}
            height={400}
            onClick={props.setCluster}
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
        tabList={["Clusters", "Cluster Scatterplot"]}
      ></InfoTabs>
      <div hidden={tabValue !== "Clusters"}>
        <ClusterTable
          clusters={props.clusters}
          changeCluster={props.changeCluster}
          tabValue={tabValue}
          setTabValue={setTabValue}
        ></ClusterTable>
      </div>
      <div hidden={tabValue !== "Cluster Scatterplot"}>
        <Scatterplot
          data={data}
          width={600}
          height={400}
          onClick={props.setCluster}
        />
      </div>
    </div>
  );
};
export default InfoPanel;
