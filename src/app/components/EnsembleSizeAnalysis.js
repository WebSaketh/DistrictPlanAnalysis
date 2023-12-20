import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";

const EnsembleSizeAnalysis = (props) => {
  // Define your data for ensemble size and corresponding clusters

  // Extract ensemble size and clusters data for the chart
  const ensembleSizeData =
    props.state === "Colorado"
      ? colorado
      : props.state === "Ohio"
      ? ohio
      : illinois;
  const ensembleSize = ensembleSizeData.map((item) => item.ensembleSize);
  const numberOfClusters = ensembleSizeData.map(
    (item) => item.numberOfClusters
  );

  const options = {
    series: [
      {
        name: "Number of Clusters",
        data: numberOfClusters,
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false, // Disable zoom
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF5733"], // Light red color
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Association of Clusters with Ensemble Size (SD)",
      align: "center", // Align the title to the center
      style: {
        fontSize: "15px", // Increase the title font size
      },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ensembleSize,
      title: {
        text: "Ensemble Size",
      },
      style: {
        fontSize: "15px", // Increase the title font size
      },
    },
    yaxis: {
      title: {
        text: "The Number of Clusters",
      },
      style: {
        fontSize: "15px", // Increase the title font size
      },
      min: 0, // Set the minimum Y-axis value
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <div>
      {/* Line chart */}
      <ApexCharts
        options={options}
        series={options.series}
        type="line"
        width="100%"
        height="350"
      />
    </div>
  );
};

export default EnsembleSizeAnalysis;

const ohio = [
  { ensembleSize: 1000, numberOfClusters: 5 },
  { ensembleSize: 1050, numberOfClusters: 8 },
  { ensembleSize: 1100, numberOfClusters: 9 },
  { ensembleSize: 1200, numberOfClusters: 11 },
  { ensembleSize: 1300, numberOfClusters: 13 },
  { ensembleSize: 1400, numberOfClusters: 14 },
  { ensembleSize: 1500, numberOfClusters: 16 },
];

const illinois = [
  { ensembleSize: 1000, numberOfClusters: 13 },
  { ensembleSize: 1050, numberOfClusters: 11 },
  { ensembleSize: 1100, numberOfClusters: 10 },
  { ensembleSize: 1200, numberOfClusters: 9 },
  { ensembleSize: 1300, numberOfClusters: 4 },
  { ensembleSize: 1400, numberOfClusters: 2 },
  { ensembleSize: 1500, numberOfClusters: 0 },
];

const colorado = [
  { ensembleSize: 1000, numberOfClusters: 40 },
  { ensembleSize: 1050, numberOfClusters: 20 },
  { ensembleSize: 1100, numberOfClusters: 10 },
  { ensembleSize: 1200, numberOfClusters: 25 },
  { ensembleSize: 1300, numberOfClusters: 35 },
  { ensembleSize: 1400, numberOfClusters: 22 },
  { ensembleSize: 1500, numberOfClusters: 16 },
];
