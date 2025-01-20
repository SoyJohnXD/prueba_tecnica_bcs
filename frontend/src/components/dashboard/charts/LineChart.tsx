export interface LineChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
}

import { DataPoint } from "@/lib/utils/formatters";
import { memo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow">
        <p className="font-medium">{label}</p>
        <p className="text-primary-600">
          Ingresos: ${payload[0].value.toLocaleString()}K
        </p>
        <p className="text-rose-500">
          Gastos: ${payload[1].value.toLocaleString()}K
        </p>
      </div>
    );
  }
  return null;
};

export const LineChart = memo(({ data, height = 400 }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          name="Ingresos"
          type="monotone"
          dataKey="ingresos"
          stroke="#5760D4"
          strokeWidth={2}
          dot={{ r: 4, fill: "#2563eb" }}
          activeDot={{ r: 8 }}
        />
        <Line
          name="Gastos"
          type="monotone"
          dataKey="gastos"
          stroke="#e11d48"
          strokeWidth={2}
          dot={{ r: 4, fill: "#e11d48" }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
});

LineChart.displayName = "LineChart";
