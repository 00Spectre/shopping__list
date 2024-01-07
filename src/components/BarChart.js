import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="50%" height={200}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="unsolved" fill="#0088FE" name="Unsolved" />
      <Bar dataKey="solved" fill="#00C49F" name="Solved" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
