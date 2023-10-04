import React from 'react';
import Plot from 'react-plotly.js';

function SimpleBoxPlot() {
  const data = [
    {
      type: 'box',
      y: [10, 15, 20, 25, 30],
      boxpoints: 'outliers', // Show outliers only (remove dots)
      pointpos: -1.8,
      name: 'Box Plot 1',
    },
    {
      type: 'box',
      y: [40, 45, 50, 55, 60],
      boxpoints: 'outliers', // Show outliers only (remove dots)
      pointpos: -1.8,
      name: 'Box Plot 2',
    },
    {
      type: 'box',
      y: [15, 25, 30, 35, 40],
      boxpoints: 'outliers', // Show outliers only (remove dots)
      pointpos: -1.8,
      name: 'Box Plot 3',
    },
    {
      type: 'box',
      y: [25, 35, 40, 45, 50],
      boxpoints: 'outliers', // Show outliers only (remove dots)
      pointpos: -1.8,
      name: 'Box Plot 4',
    },
    {
      type: 'box',
      y: [5, 10, 15, 20, 25],
      boxpoints: 'outliers', // Show outliers only (remove dots)
      pointpos: -1.8,
      name: 'Box Plot 5',
    },
  ];

  return (
    <div>
      <h2>Smaller Vertical Box Plots Without Dots (5 Box Plots)</h2>
      <Plot
        data={data}
        layout={{
          yaxis: { title: 'Values' },
          xaxis: { title: 'Box Plots' },
          showlegend: true,
          height: 300, // Adjust the height to make the box plots smaller
          width: 300,
        }}
      />
    </div>
  );
}

export default SimpleBoxPlot;
