// ChartComponent.tsx
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Card } from "../ui/card";

type ChartComponentProps = {
  title: string;
  data: unknown[];
  xKey: string;
  lineKeys: string[];
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  tablet: {
    label: "Tablet",
    color: "#353535",
  },
  mac: {
    label: "Macintosh",
    color: "#d3d300",
  },
} satisfies ChartConfig;

const ChartComponent = ({
  title,
  data,
  xKey,
  lineKeys,
}: ChartComponentProps) => {
  return (
    <Card className="mb-3 h-[29%]">
      <div className="text-center  px-2 py-0.5 border bg-[#FBD008] text-lg font-bold dark:bg-slate-800 dark:text-white">
        {title}
      </div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[10rem] w-full h-[30%] "
      >
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {lineKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke="var(--color-mac)"
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </Card>
  );
};

export default ChartComponent;
