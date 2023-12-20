import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const HorizontalBoxPlot = ({ data, state, ensemble }) => {
  useEffect(() => {
    // Check if running on the client side
    console.log(state, ensemble);
    if (state == "Colorado" && ensemble == "Ensemble1") {
      data = [
        {
          category: "Hamming Distance",
          values: [0.0, 0.815, 0.868, 0.921, 1.0],
        },
      ];
    }
    if (state == "Illinois" && ensemble == "Ensemble1") {
      data = [
        {
          category: "Hamming Distance",
          values: [0.0, 0.7943262, 0.867612, 0.9267139, 1.0],
        },
      ];
    }
    if (state == "Ohio" && ensemble == "Ensemble2") {
      data = [
        {
          category: "Hamming Distance",
          values: [0.0, 0.78444, 0.86, 0.92222, 1.0],
        },
      ];
    }
    if (state == "Ohio" && ensemble == "Ensemble1") {
      data = [
        {
          category: "Optimal Transport",
          values: [0.0, 0.460674, 0.561798, 0.651685, 1.0],
        },
      ];
    }
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
