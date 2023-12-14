import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select, MenuItem } from "@mui/material";

const axisLabels = [
  {
    xAxis: "X Mds Value",
    yAxis: "Y Mds Value",
    title: "X mds vs Y mds",
  },
  {
    xAxis: "Asians",
    yAxis: "Hispanics",
    title: "Asians vs Hispanics",
  },
  {
    xAxis: "Whites",
    yAxis: "Blacks",
    title: "Whites vs Blacks",
  },
];

const Scatterplot = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selector, setSelector] = useState(0);

  const handleChange = (event) => {
    props.changeTableValue(event.target.value);
  };

  useEffect(() => {
    setSelector(props.tableValue);
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    let i = 0;
    let data2 = [];
    if (props.tableValue === 1) {
      data2 = Array.from({ length: props.clusters.length }, () => ({
        x: props.clusters[i].clusterDemographics.mds_x,
        y: props.clusters[i].clusterDemographics.mds_y, // Random Y value between 0 and 100
        r: props.clusters[i].districtPlanIds.length,
        name: "Cluster " + props.clusters[i++].clusterId,
      }));
    } else if (props.tableValue === 2) {
      data2 = Array.from({ length: props.clusters.length }, () => ({
        x: props.clusters[i].clusterDemographics.asian,
        y: props.clusters[i].clusterDemographics.hispanic, // Random Y value between 0 and 100
        r: props.clusters[i].districtPlanIds.length,
        name: "Cluster " + props.clusters[i++].clusterId,
      }));
    } else if (props.tableValue === 3) {
      data2 = Array.from({ length: props.clusters.length }, () => ({
        x: props.clusters[i].clusterDemographics.white,
        y: props.clusters[i].clusterDemographics.black, // Random Y value between 0 and 100
        r: props.clusters[i].districtPlanIds.length,
        name: "Cluster " + props.clusters[i++].clusterId,
      }));
    }

    chartInstance.current = new Chart(myChartRef, {
      // plugins: [ChartDataLabels],
      type: "bubble",
      title: "First Data Set",
      data: {
        datasets: [
          {
            label: "Clusters",
            data: data2,
            backgroundColor: "rgb(255, 99, 132, 0.25)",
          },
        ],
      },
      options: {
        onClick: function (e, i) {
          let clusterName = data2[i[0].index].name;
          let clusterId = clusterName.slice(8);
          props.setTabValue(props.nextTab);
          props.onClick(clusterId);
        },
        scales: {
          y: {
            title: {
              display: true,
              text: axisLabels[props.tableValue - 1].yAxis,
            },
          },
          x: {
            title: {
              display: true,
              text: axisLabels[props.tableValue - 1].xAxis,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (item) {
                return (
                  "Cluster: " +
                  item.raw.name +
                  ", Number Of Plans: " +
                  item.raw.r
                );
              },
            },
          },
          title: {
            display: true,
            text: axisLabels[props.tableValue - 1].title,
            padding: {
              top: 10,
              bottom: 20,
            },
          },
        },
      },
    });
  }, [props]);

  return (
    <div>
      <div class="chart-container">
        <canvas ref={chartRef} />
      </div>
      <Select value={selector} onChange={handleChange}>
        <MenuItem value={1}>X mds vs Y mds</MenuItem>
        <MenuItem value={2}>Asians vs Hispanics</MenuItem>
        <MenuItem value={3}>Whites vs Blacks</MenuItem>
      </Select>
    </div>
  );
};
export default Scatterplot;