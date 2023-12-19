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
    xAxis: "Blacks",
    yAxis: "Hispanics",
    title: "Blacks vs Hispanics",
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
    data2 = Array.from({ length: props.clusters.length }, () => ({
      x: props.clusters[i].clusterDemographics.mds_x,
      y: props.clusters[i].clusterDemographics.mds_y, // Random Y value between 0 and 100
      r:
        props.clusters[i].districtPlanIDs.length > 100
          ? props.clusters[i].districtPlanIDs.length / 10
          : props.clusters[i].districtPlanIDs.length,
      name: "Cluster ID:" + props.clusters[i].clusterID,
      dp: "District Plans: " + props.clusters[i++].districtPlanIDs.length,
    }));

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
          let clusterId = clusterName.slice(11);
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
                return [
                  item.raw.name,
                  item.raw.dp,
                  "Xmds-value: " + Math.round(item.raw.x * 100) / 100,
                  "Ymds-value: " + Math.round(item.raw.y * 100) / 100,
                ];
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
    </div>
  );
};
export default Scatterplot;
