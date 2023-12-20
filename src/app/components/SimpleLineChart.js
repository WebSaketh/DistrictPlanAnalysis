import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SimpleLineChart = () => {
  const data = [];
  let value1 = 0;
  let value2 = 0;
  let value3 = 0;
  let value4 = 0;
  for (let i = 0; i <= 10; i++) {
    value1 += Math.floor(Math.random() * 1) + 5; // Increment by 10
    value2 += Math.floor(Math.random() * 2) + 5; // Increment by 10
    value3 += Math.floor(Math.random() * 3) + 5; // Increment by 10
    value4 += Math.floor(Math.random() * 4) + 5; // Increment by 10
    data.push({
      name: (i * 100).toString(),
      value1,
      value2,
      value3,
      value4,
    });
  }

  return (
    <LineChart
      width={600}
      height={350}
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <XAxis
        dataKey="name"
        label={{ value: "# of District Plans", position: "bottom" }}
      />
      <YAxis
        label={{
          value: "# of Clusters",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="value1" stroke="blue" name="Ensemble" />
      <Line type="monotone" dataKey="value2" stroke="red" name="Ensemble2" />
      <Line type="monotone" dataKey="value3" stroke="green" name="Ensemble3" />

      <Tooltip />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </LineChart>
  );
};

export default SimpleLineChart;
