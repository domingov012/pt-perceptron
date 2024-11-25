import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#646cff", "#ecda11", "#29df00", "#242424"];

export default function TaskChart({ data }) {
  return (
    <div>
      <h2>Tasks By Status</h2>
      <PieChart width={600} height={500}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
