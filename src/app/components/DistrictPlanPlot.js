import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Select, MenuItem } from "@mui/material";

const width = 1000;
const height = 600;

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

const DistrictPlanPlot = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
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

    let availableDistrictPlans = [];
    let unavailableDistrictPlans = [];

    for (let j = 0; j < props.districtPlanInfo.length; j++) {
      if (props.districtPlanInfo[j].isAvailable === "yes") {
        availableDistrictPlans.push(props.districtPlanInfo[j]);
      } else {
        unavailableDistrictPlans.push(props.districtPlanInfo[j]);
      }
    }

    let data2 = [];
    let data3 = [];
    let data4 = [];

    if (props.tableValue === 1) {
      let i = 0;
      data2 = Array.from({ length: availableDistrictPlans.length }, () => ({
        x: availableDistrictPlans[i].clusterDemographics.mds_x,
        y: availableDistrictPlans[i].clusterDemographics.mds_y, // Random Y value between 0 and 100
        r: availableDistrictPlans[i].districtPlanID === selected ? -1 : 5,
        name: "District Plan " + availableDistrictPlans[i++].districtPlanID,
        available: "available",
      }));
      i = 0;
      data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
        x: unavailableDistrictPlans[i].clusterDemographics.mds_x,
        y: unavailableDistrictPlans[i].clusterDemographics.mds_y, // Random Y value between 0 and 100
        r: 5,
        name: "District Plan " + unavailableDistrictPlans[i++].districtPlanID,
        available: "notAvailable",
      }));
      data4 =
        selectedIndex !== null
          ? [
              {
                x:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .mds_x,
                y:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .mds_y, // Random Y value between 0 and 100
                r: 10,
                name:
                  "District Plan " +
                  availableDistrictPlans[selectedIndex].districtPlanID,
                available: "available",
              },
            ]
          : [];
    } else if (props.tableValue === 2) {
      let i = 0;
      data2 = Array.from({ length: availableDistrictPlans.length }, () => ({
        x: availableDistrictPlans[i].clusterDemographics.blackDistricts,
        y: availableDistrictPlans[i].clusterDemographics.hispanicDistrics, // Random Y value between 0 and 100
        r: availableDistrictPlans[i].districtPlanId === selected ? 0 : 5,
        name: "District Plan " + availableDistrictPlans[i++].districtPlanID,
      }));
      i = 0;
      data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
        x: unavailableDistrictPlans[i].clusterDemographics.blackDistricts,
        y: unavailableDistrictPlans[i].clusterDemographics.hispanicDistrics, // Random Y value between 0 and 100
        r: 5,
        name: "District Plan " + unavailableDistrictPlans[i++].districtPlanID,
      }));
      data4 =
        selectedIndex !== null
          ? [
              {
                x:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .blackDistricts,
                y:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .hispanicDistrics, // Random Y value between 0 and 100
                r: 10,
                name:
                  "District Plan " +
                  availableDistrictPlans[selectedIndex].districtPlanID,
              },
            ]
          : [];
    }

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
                  item.raw.available,
                  item.raw.name,
                  "Xmds value: " + Math.round(item.raw.x * 100) / 100,
                  "Ymds value: " + Math.round(item.raw.y * 100) / 100,
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
  }, [props.tableValue, selected]);

  return (
    <div>
      <div class="chart-container">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default DistrictPlanPlot;
