import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select, MenuItem } from "@mui/material";

const axisLabels = [
  "Significant African American Districts Count",
  "Significant Hispanic Districts Count",
  "Significant Asian Districts Count",
  "Opportunity Districts",
  "Swing Districts",
];

const DistrictPlanPlot2 = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    let matrix = [];
    for (let i = 0; i < props.districtPlanInfo.length; i++) {
      let temp = [];
      temp.push(props.districtPlanInfo[i].clusterDemographics.blackDistricts);
      temp.push(props.districtPlanInfo[i].clusterDemographics.hispanicDistrics);
      temp.push(props.districtPlanInfo[i].clusterDemographics.asianDistricts);
      temp.push(
        props.districtPlanInfo[i].clusterDemographics.opportunityDistricts
      );
      temp.push(props.districtPlanInfo[i].clusterDemographics.swingDistrict);
      matrix[i] = temp;
    }

    let hashMap = {};
    for (let i = 0; i < matrix.length; i++) {
      let xData = matrix[i][props.xAxis];
      let yData = matrix[i][props.yAxis];

      let arr = [];
      arr.push(xData);
      arr.push(yData);
      if (hashMap[arr] === undefined) {
        hashMap[arr] = 1;
      } else {
        hashMap[arr]++;
      }
    }

    let data = [];

    for (let key in hashMap) {
      let arr = key.split(",");
      let json = {
        x: parseInt(arr[0]),
        y: parseInt(arr[1]),
        r: hashMap[key] > 100 ? 30 : hashMap[key] > 50 ? 20 : 10,
        name: "Number of districts: " + hashMap[key],
      };
      data.push(json);
    }

    /*let data2 = [];
    let data3 = [];

    let i = 0;
    data2 = Array.from({ length: availableDistrictPlans.length }, () => ({
      x: matrix1[i][props.xAxis],
      y: matrix1[i][props.yAxis],
      r: availableDistrictPlans[i].districtPlanId === selected ? -1 : 5,
      name: "District Plan " + availableDistrictPlans[i++].districtPlanID,
    }));
    i = 0;
    data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
      x: matrix2[i][props.xAxis],
      y: matrix2[i][props.yAxis],
      r: 5,
      name: "District Plan " + unavailableDistrictPlans[i++].districtPlanID,
    }));*/

    chartInstance.current = new Chart(myChartRef, {
      // plugins: [ChartDataLabels],
      type: "bubble",
      data: {
        datasets: [
          {
            label: "District Plan Count for metric",
            data: data,
            backgroundColor: "rgb(0, 0, 255, 0.25)",
          },
        ],
      },
      options: {
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
                  axisLabels[props.xAxis] + ": " + item.raw.x,
                  axisLabels[props.yAxis] + ": " + item.raw.y,
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
  }, [props.tableValue, selected, props.xAxis, props.yAxis]);

  return (
    <div>
      <div class="chart-container">
        <canvas ref={chartRef} />
      </div>
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

export default DistrictPlanPlot2;
