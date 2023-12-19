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

    let availableDistrictPlans = [];
    let unavailableDistrictPlans = [];

    for (let j = 0; j < props.districtPlanInfo.length; j++) {
      if (props.districtPlanInfo[j].isAvailable === "yes") {
        availableDistrictPlans.push(props.districtPlanInfo[j]);
      } else {
        unavailableDistrictPlans.push(props.districtPlanInfo[j]);
      }
    }

    let matrix1 = [];
    for (let i = 0; i < availableDistrictPlans.length; i++) {
      let temp = [];
      temp.push(availableDistrictPlans[i].clusterDemographics.blackDistricts);
      temp.push(availableDistrictPlans[i].clusterDemographics.hispanicDistrics);
      temp.push(availableDistrictPlans[i].clusterDemographics.asianDistricts);
      temp.push(
        availableDistrictPlans[i].clusterDemographics.opportunityDistrict
      );
      temp.push(availableDistrictPlans[i].clusterDemographics.swingDistrict);
      matrix1[i] = temp;
    }
    let matrix2 = [];
    for (let i = 0; i < unavailableDistrictPlans.length; i++) {
      let temp = [];
      temp.push(unavailableDistrictPlans[i].clusterDemographics.blackDistricts);
      temp.push(
        unavailableDistrictPlans[i].clusterDemographics.hispanicDistrics
      );
      temp.push(unavailableDistrictPlans[i].clusterDemographics.asianDistricts);
      temp.push(
        unavailableDistrictPlans[i].clusterDemographics.opportunityDistrict
      );
      temp.push(unavailableDistrictPlans[i].clusterDemographics.swingDistrict);
      matrix2[i] = temp;
    }

    let data2 = [];
    let data3 = [];
    let data4 = [];

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
    }));
    data4 =
      selectedIndex !== null
        ? [
            {
              x: availableDistrictPlans[selectedIndex][props.xAxis],
              y: availableDistrictPlans[selectedIndex][props.yAxis],
              r: 10,
              name:
                "District Plan " +
                availableDistrictPlans[selectedIndex].districtPlanID,
            },
          ]
        : [];

    chartInstance.current = new Chart(myChartRef, {
      // plugins: [ChartDataLabels],
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Available District Plans",
            data: data2,
            backgroundColor: "rgb(0, 255, 0, 0.9)",
          },
          {
            label: "Unavailable District Plans",
            data: data3,
            backgroundColor: "rgb(255, 0, 0, 0.9)",
          },
          {
            label: "Selected District Plan",
            data: data4,
            backgroundColor: "rgb(255, 210, 0, 0.9)",
          },
        ],
      },
      options: {
        onClick: function (e, d) {
          console.log(d[0].element.options.backgroundColor);
          if (d[0].element.options.backgroundColor === "#E6BB00E5") {
            setSelected(null);
            setSelectedIndex(null);
            props.changeDistrictPlan([]);
          }
          if (d[0].element.options.backgroundColor !== "#00E600E5") return "";

          let clusterName = data2[d[0].index].name;
          var districtPlanId = parseInt(clusterName.slice(14));
          let arr = [];

          setSelected(districtPlanId);
          setSelectedIndex(d[0].index);
          arr.push(districtPlanId);

          props.changeDistrictPlan(arr);
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
                return item.raw.name;
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

export default DistrictPlanPlot2;
