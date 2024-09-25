"use client";

import React, { useEffect, useState } from "react";
import { useStationData } from "@/hooks/context/stationContext";
import { useUserContext } from "@/hooks/context/userContext"; // Ensure this is the correct path to your UserContext
import { ReusableLineChartProps } from "@/types/chartTypes";

import {
  CartesianGrid,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  ReferenceLine,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  desktop: {
    label: "Variable Data",
    color: "hsl(var(--chart-1))",
  },
};

const ReusableLineChart: React.FC<ReusableLineChartProps> = ({
  containerId,
  stationIndex,
  markLineValue,
  markLineColor,
  markLineWidth = 2,
}) => {
  const { stationData } = useStationData();
  const { selectedDataType } = useUserContext(); // Access the selected data type from UserContext
  const [dataKey, setDataKey] = useState<keyof typeof chartData>("temperature"); // Default to 'temperature'

  useEffect(() => {
    // Update the dataKey based on the selectedDataType
    setDataKey(selectedDataType as keyof typeof chartData);
  }, [selectedDataType]);

  console.log("selected key in reusable is", selectedDataType);
  console.log("statio data in reusable is", stationData);

  if (!stationData) {
    return <div>Loading...</div>;
  }

  // Extract the data based on the selectedDataType
  const dataForChart =
    stationData[stationIndex].parameters[
      selectedDataType as keyof typeof stationData.parameters
    ];

  // Transform the data into a format suitable for AreaChart
  const chartData = dataForChart.map((value, index) => ({
    index: index + 1, // Assuming you want the index to start from 1
    value,
  }));

  console.log("formatted chart data is ", chartData);

  const getColorStops = (value: number) => {
    if (value >= 45) return "#ff0000";
    if (value >= 40) return "#ff6600";
    if (value >= 35) return "#ff9933";
    if (value >= 30) return "#ffcc66";
    if (value >= 25) return "#ffff66";
    if (value >= 20) return "#99ff66";

    return "#000000"; // Default color for values less than 20
  };

  const getOffset = (value: number) => {
    if (value >= 45) return "100%";
    if (value >= 40) return "80%";
    if (value >= 35) return "60%";
    if (value >= 30) return "40%";
    if (value >= 25) return "20%";
    if (value >= 20) return "0%";

    return "0%"; // Default offset for values less than 20
  };

  return (
    <div id={containerId} className="h-[32.5%] flex py-3 w-full ">
      <ChartContainer className="w-full" config={chartConfig}>
        <AreaChart
          data={chartData} // Use the transformed chartData
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              {chartData.map(
                (
                  entry: { value: number },
                  index: React.Key | null | undefined
                ) => (
                  <stop
                    key={index}
                    offset={getOffset(entry.value)}
                    stopColor={getColorStops(entry.value)}
                    stopOpacity={1}
                  />
                )
              )}
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="index" />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <ReferenceLine
            y={markLineValue}
            stroke={markLineColor}
            strokeWidth={markLineWidth}
            label={{
              position: "insideTop",
              value: "Custom Line",
              fontSize: 12,
              textAnchor: "middle",
            }}
          />
          <Area
            dataKey="value"
            type="natural"
            fill="url(#colorValue)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default ReusableLineChart;
