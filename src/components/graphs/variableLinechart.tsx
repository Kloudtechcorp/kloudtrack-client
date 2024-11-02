// src/components/graphs/CustomLineCharts.tsx

import React from "react";
import ReusableLineChart from "./reusableLineChart";

import { useStationData } from "@/hooks/context/stationContext";
import { useUserContext } from "@/hooks/context/userContext";

const VariableLineChart = () => {
  const { stationData } = useStationData();
  const { selectedDataType } = useUserContext();
  console.log("Selected data type in VariableLineChart:", selectedDataType);
  console.log("Station values from context in VariableLineChart:", stationData);

  return (
    <div className="flex flex-col gap-3 overflow-hidden max-h-full w-[100%]">
      <ReusableLineChart
        containerId="chart-container1"
        stationIndex={0}
        dataKey={selectedDataType || "temperature"} // Default to 'temperature'
        markLineValue={450}
        markLineColor="orange"
        markLineWidth={2}
      />
      <ReusableLineChart
        containerId="chart-container2"
        stationIndex={1}
        dataKey={selectedDataType || "temperature"} // Default to 'temperature'
        markLineValue={250}
        markLineColor="yellow"
        markLineWidth={4}
      />
      <ReusableLineChart
        containerId="chart-container3"
        stationIndex={2}
        dataKey={selectedDataType || "temperature"} // Default to 'temperature'
        markLineValue={300}
        markLineColor="green"
        markLineWidth={8}
      />
    </div>
  );
};

export default VariableLineChart;
