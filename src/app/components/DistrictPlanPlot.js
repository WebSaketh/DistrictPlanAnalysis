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
    console.log("use effect");
    setSelector(props.tableValue);
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    let availableDistrictPlans = [];
    let unavailableDistrictPlans = [];

    for (let j = 0; j < props.districtPlanInfo.length; j++) {
      if (props.districtPlanInfo[j].isAvailable) {
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
        r: availableDistrictPlans[i].districtPlanId === selected ? -1 : 5,
        name: "District Plan " + availableDistrictPlans[i++].districtPlanId,
      }));
      i = 0;
      data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
        x: unavailableDistrictPlans[i].clusterDemographics.mds_x,
        y: unavailableDistrictPlans[i].clusterDemographics.mds_y, // Random Y value between 0 and 100
        r: 5,
        name: "District Plan " + unavailableDistrictPlans[i++].districtPlanId,
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
                  availableDistrictPlans[selectedIndex].districtPlanId,
              },
            ]
          : [];
    } else if (props.tableValue === 2) {
      let i = 0;
      data2 = Array.from({ length: availableDistrictPlans.length }, () => ({
        x: availableDistrictPlans[i].clusterDemographics.asian,
        y: availableDistrictPlans[i].clusterDemographics.hispanic, // Random Y value between 0 and 100
        r: availableDistrictPlans[i].districtPlanId === selected ? 0 : 5,
        name: "District Plan " + availableDistrictPlans[i++].districtPlanId,
      }));
      i = 0;
      data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
        x: unavailableDistrictPlans[i].clusterDemographics.asian,
        y: unavailableDistrictPlans[i].clusterDemographics.hispanic, // Random Y value between 0 and 100
        r: 5,
        name: "District Plan " + unavailableDistrictPlans[i++].districtPlanId,
      }));
      data4 =
        selectedIndex !== null
          ? [
              {
                x:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .asian,
                y:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .hispanic, // Random Y value between 0 and 100
                r: 10,
                name:
                  "District Plan " +
                  availableDistrictPlans[selectedIndex].districtPlanId,
              },
            ]
          : [];
    } else if (props.tableValue === 3) {
      let i = 0;
      data2 = Array.from({ length: availableDistrictPlans.length }, () => ({
        x: availableDistrictPlans[i].clusterDemographics.white,
        y: availableDistrictPlans[i].clusterDemographics.black, // Random Y value between 0 and 100
        r: availableDistrictPlans[i].districtPlanId === selected ? 0 : 5,
        name: "District Plan " + availableDistrictPlans[i++].districtPlanId,
      }));
      i = 0;
      data3 = Array.from({ length: unavailableDistrictPlans.length }, () => ({
        x: unavailableDistrictPlans[i].clusterDemographics.white,
        y: unavailableDistrictPlans[i].clusterDemographics.black, // Random Y value between 0 and 100
        r: 5,
        name: "District Plan " + unavailableDistrictPlans[i++].districtPlanId,
      }));
      data4 =
        selectedIndex !== null
          ? [
              {
                x:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .white,
                y:
                  availableDistrictPlans[selectedIndex].clusterDemographics
                    .black, // Random Y value between 0 and 100
                r: 10,
                name:
                  "District Plan " +
                  availableDistrictPlans[selectedIndex].districtPlanId,
              },
            ]
          : [];
    }

    console.log(data2, data3, data4);

    chartInstance.current = new Chart(myChartRef, {
      // plugins: [ChartDataLabels],
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Available District Plans",
            data: data2,
            backgroundColor: "rgb(0, 255, 0, 0.4)",
          },
          {
            label: "Unavailable District Plans",
            data: data3,
            backgroundColor: "rgb(255, 99, 132, 0.25)",
          },
          {
            label: "Selected District Plan",
            data: data4,
            backgroundColor: "rgb(255, 210, 0, 0.25)",
          },
        ],
      },
      options: {
        onClick: function (e, d) {
          console.log(d[0].element.options.backgroundColor);
          if (d[0].element.options.backgroundColor === "#E6BB003F") {
            setSelected(null);
            setSelectedIndex(null);
            props.changeDistrictPlan([]);
          }
          if (d[0].element.options.backgroundColor !== "#00E60066") return "";

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
                return item.raw.name;
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
      <Select value={selector} onChange={handleChange}>
        <MenuItem value={1}>X mds vs Y mds</MenuItem>
        <MenuItem value={2}>Asians vs Hispanics</MenuItem>
        <MenuItem value={3}>Whites vs Blacks</MenuItem>
      </Select>
    </div>
  );
};

export default DistrictPlanPlot;
