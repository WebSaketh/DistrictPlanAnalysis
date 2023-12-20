import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select, MenuItem } from "@mui/material";

const axisLabels = [
  "Avg. African American Significant Districts",
  "Avg. Hispanic Significant Districts",
  "Avg. Asian Districts Significant Districts",
  "Avg. Opportunity Districts",
  "Avg. Swing Districts",
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
      if (props.clusters[i].distanceMeasure === "Hamming Distance") {
        temp.push(
          props.clusters[i].clusterDemographics.avgBlackDistricts * 475
        );
        temp.push(
          props.clusters[i].clusterDemographics.avgHispanicDistricts * 475
        );
        temp.push(
          props.clusters[i].clusterDemographics.avgAsianDistricts * 475
        );
      } else if (props.clusters[i].distanceMeasure === "Optimal Transport") {
        temp.push(props.clusters[i].clusterDemographics.avgBlackDistricts * 85);
        temp.push(
          props.clusters[i].clusterDemographics.avgHispanicDistricts * 85
        );
        temp.push(props.clusters[i].clusterDemographics.avgAsianDistricts * 85);
      }

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
      r:
        props.clusters[i].districtPlanIDs.length > 100
          ? props.clusters[i].districtPlanIDs.length / 10
          : props.clusters[i].districtPlanIDs.length,
      name: "Cluster: " + props.clusters[i].clusterID,
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
                return [
                  item.raw.name,
                  item.raw.dp,
                  axisLabels[props.xAxis] +
                    ": " +
                    Math.round(item.raw.x * 100) / 100,
                  axisLabels[props.yAxis] +
                    ": " +
                    Math.round(item.raw.y * 100) / 100,
                ];
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
      <div></div>
      <div className="axis">
        <h1>Set X-axis</h1>
        <Select value={props.xAxis} onChange={handleXChange}>
          <MenuItem value={0}>African Americans Districts</MenuItem>
          <MenuItem value={1}>Hispanics Districts</MenuItem>
          <MenuItem value={2}>Asians Districts</MenuItem>
          <MenuItem value={3}>Opportunity Districts</MenuItem>
          <MenuItem value={4}>Swing Districts</MenuItem>
        </Select>
      </div>
      <div className="axis">
        <h1>Set Y-Axis</h1>
        <Select value={props.yAxis} onChange={handleYChange}>
          <MenuItem value={0}>African Americans Districts</MenuItem>
          <MenuItem value={1}>Hispanics Districts</MenuItem>
          <MenuItem value={2}>Asians Districts</MenuItem>
          <MenuItem value={3}>Opportunity Districts</MenuItem>
          <MenuItem value={4}>Swing Districts</MenuItem>
        </Select>
      </div>
    </div>
  );
};
export default Scatterplot2;
