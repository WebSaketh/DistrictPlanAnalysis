import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const HorizontalBoxPlot = ({ data }) => {
  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const options = {
        series: [
          {
            data: data.map((item) => ({
              x: item.category,
              y: item.values,
            })),
          },
        ],
        chart: {
          type: "boxPlot",
          height: 350,
        },
        title: {
          text: "Horizontal BoxPlot Chart",
          align: "left",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
          },
          boxPlot: {
            colors: {
              upper: "#e9ecef",
              lower: "#f8f9fa",
            },
          },
        },
        stroke: {
          colors: ["#6c757d"],
        },
      };

      const chartContainerStyle = {
        width: "100%", // Set the width to 100%
        // Add additional styling as needed
      };

      const chart = new ApexCharts(
        document.querySelector("#horizontal-box-plot-chart"),
        options
      );
      chart.render();

      // Cleanup function
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <div id="horizontal-box-plot-chart" style={{ width: "95%" }} />;
};

export default HorizontalBoxPlot;
