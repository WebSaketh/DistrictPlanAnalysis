import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select, MenuItem } from "@mui/material";

const axisLabels = [
  "African American Districts",
  "Hispanic Districts",
  "Asian Districts",
  "Opportunity Districts",
  "Swing Districts",
];

const Scatterplot2 = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleChange = (event) => {
    props.changeTableValue(event.target.value);
  };

  const handleXChange = (event) => {
    props.setXAxis(event.target.value);
  };
  const handleYChange = (event) => {
    props.setYAxis(event.target.value);
  };

  useEffect(() => {
    let matrix = [];
    for (let i = 0; i < props.clusters.length; i++) {
      let temp = [];
      temp.push(props.clusters[i].clusterDemographics.avgBlackDistricts);
      temp.push(props.clusters[i].clusterDemographics.avgHispanicDistricts);
      temp.push(props.clusters[i].clusterDemographics.avgAsianDistricts);
      temp.push(props.clusters[i].clusterDemographics.avgOpportunityDistricts);
      temp.push(props.clusters[i].clusterDemographics.avgSwingDistricts);
      matrix[i] = temp;
    }
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");
    let i = 0;
    let data2 = [];
    data2 = Array.from({ length: props.clusters.length }, () => ({
      x: matrix[i][props.xAxis],
      y: matrix[i][props.yAxis], // Random Y value between 0 and 100
      r: props.clusters[i].districtPlanIDs.length / 5,
      name: "Cluster " + props.clusters[i++].clusterID,
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
          let clusterId = clusterName.slice(8);
          props.setTabValue(props.nextTab);
          props.onClick(clusterId);
        },
        scales: {
          y: {
            title: {
              display: true,
              text: axisLabels[props.yAxis],
            },
          },
          x: {
            title: {
              display: true,
              text: axisLabels[props.xAxis],
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
                  item.raw.r * 5 +
                  ", " +
                  axisLabels[props.xAxis] +
                  ": " +
                  item.raw.x +
                  ", " +
                  axisLabels[props.yAxis] +
                  ": " +
                  item.raw.y
                );
              },
            },
          },
          title: {
            display: true,
            text: axisLabels[props.xAxis] + " vs " + axisLabels[props.yAxis],
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
      <Select value={props.xAxis} onChange={handleXChange}>
        <MenuItem value={0}>African Americans Districts</MenuItem>
        <MenuItem value={1}>Hispanics Districts</MenuItem>
        <MenuItem value={2}>Asians Districts</MenuItem>
        <MenuItem value={3}>Opportunity Districts</MenuItem>
        <MenuItem value={4}>Swing Districts</MenuItem>
      </Select>

      <Select value={props.yAxis} onChange={handleYChange}>
        <MenuItem value={0}>African Americans Districts</MenuItem>
        <MenuItem value={1}>Hispanics Districts</MenuItem>
        <MenuItem value={2}>Asians Districts</MenuItem>
        <MenuItem value={3}>Opportunity Districts</MenuItem>
        <MenuItem value={4}>Swing Districts</MenuItem>
      </Select>
    </div>
  );
};
export default Scatterplot2;
