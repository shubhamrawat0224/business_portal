import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Jan", score: 2 },
  { name: "Feb", score: 3 },
  { name: "Mar", score: 2.5 },
  { name: "Apr", score: 4 },
  { name: "May", score: 3.5 },
  { name: "Jun", score: 4.2 },
  { name: "Jul", score: 3.8 },
  { name: "Aug", score: 4.5 },
  { name: "Sep", score: 4.1 },
  { name: "Oct", score: 4.3 },
  { name: "Nov", score: 4.6 },
  { name: "Dec", score: 4.8 },
];
const StatsChart = () => (
  <div className="stats-chart">
    <h3>Statistic</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
export default StatsChart;
