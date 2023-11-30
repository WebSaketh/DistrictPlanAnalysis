import React from "react";
import Plot from "react-plotly.js";

function SimpleBoxPlot() {
  const data = [
    {
      type: "box",
      y: [10, 15, 20, 25, 30],
      boxpoints: "outliers", // Show outliers only (remove dots)
      pointpos: -1.8,
      name: "Cluster 1",
    },
    {
      type: "box",
      y: [40, 45, 50, 55, 60],
      boxpoints: "outliers", // Show outliers only (remove dots)
      pointpos: -1.8,
      name: "Cluster 2",
    },
    {
      type: "box",
      y: [15, 25, 30, 35, 40],
      boxpoints: "outliers", // Show outliers only (remove dots)
      pointpos: -1.8,
      name: "Cluster 3",
    },
    {
      type: "box",
      y: [25, 35, 40, 45, 50],
      boxpoints: "outliers", // Show outliers only (remove dots)
      pointpos: -1.8,
      name: "Cluster 4",
    },
    {
      type: "box",
      y: [5, 10, 15, 20, 25],
      boxpoints: "outliers", // Show outliers only (remove dots)
      pointpos: -1.8,
      name: "Cluster 5",
    },
  ];

  return (
    <div>
      <Plot
        data={data}
        layout={{
          yaxis: { title: "Opportunity Districts" },
          xaxis: { title: "District Plans" },
          showlegend: false,
          height: 400, // Adjust the height to make the box plots smaller
          width: 400,
        }}
      />
    </div>
  );
}

export default SimpleBoxPlot;
