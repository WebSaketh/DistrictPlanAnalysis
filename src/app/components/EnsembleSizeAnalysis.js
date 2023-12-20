import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein, set1, set2) {
  return { name, calories, fat, carbs, protein, set1, set2 };
}

const EnsembleSizeAnalysis = (props) => {
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
  var rows = [
    createData("Num. Plans", 250, 1000, 2000, 3000, 4000, 5000),
    createData("Num. Clusters", 3, 9, 10, 11, 11, 11),
  ];
  if (props.state == "Colorado") {
    rows = [
      createData("Num. Plans", 250, 1000, 2000, 3000, 4000, 5000),
      createData("Num. Clusters", 3, 8, 10, 11, 11, 12),
    ];
  }
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.set1}</TableCell>
                <TableCell align="right">{row.set2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EnsembleSizeAnalysis;

const ohio = [
  { ensembleSize: 250, numberOfClusters: 3 },
  { ensembleSize: 1000, numberOfClusters: 9 },
  { ensembleSize: 2000, numberOfClusters: 10 },
  { ensembleSize: 3000, numberOfClusters: 11 },
  { ensembleSize: 4000, numberOfClusters: 11 },
  { ensembleSize: 5000, numberOfClusters: 11 },
];

const illinois = [
  { ensembleSize: 250, numberOfClusters: 3 },
  { ensembleSize: 1000, numberOfClusters: 9 },
  { ensembleSize: 2000, numberOfClusters: 10 },
  { ensembleSize: 3000, numberOfClusters: 11 },
  { ensembleSize: 4000, numberOfClusters: 11 },
  { ensembleSize: 5000, numberOfClusters: 11 },
];

const colorado = [
  { ensembleSize: 250, numberOfClusters: 3 },
  { ensembleSize: 1000, numberOfClusters: 8 },
  { ensembleSize: 2000, numberOfClusters: 10 },
  { ensembleSize: 3000, numberOfClusters: 11 },
  { ensembleSize: 4000, numberOfClusters: 12 },
  { ensembleSize: 5000, numberOfClusters: 12 },
];
