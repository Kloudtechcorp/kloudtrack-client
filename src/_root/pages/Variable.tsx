import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VariableLineChart from "@/components/graphs/variableLinechart";
import VariableTable from "@/components/tables/variableTable";
import {
  mergeStationData,
  chartData,
  stationInfo,
} from "@/_root/data/variableData";
import { useStationData } from "@/lib/context/stationContext";

import { useUserContext } from "@/lib/context/userContext";
import { Card, CardContent } from "@/components/ui/card";

const Variable = () => {
  const { setStationData } = useStationData();
  const { selectedDataType, setSelectedDataType } = useUserContext();

  React.useEffect(() => {
    // Dummy data for chartData
    const mergedData = mergeStationData(stationInfo, chartData);
    console.log("merged values is ", mergedData);

    setStationData(mergedData); // Set data in context
  }, [setStationData]);

  const handleChange = async (value: string) => {
    try {
      // Perform any asynchronous operations here if needed
      await setSelectedDataType(value); // Assuming setSelectedDataType is asynchronous
      console.log("Selected Data type is ", value);
    } catch (error) {
      console.error("Error setting selected data type", error);
    }
  };
  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden ">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="text-3xl font-bold px-4 capitalize">
                Variable Data ({selectedDataType})
              </span>
              <div className="flex flex-col justify-center px-6">
                <span className="text-sm px-1">Sensor Option</span>
                <span className="text-3xl font-bold">
                  <Select
                    onValueChange={handleChange}
                    defaultValue={selectedDataType || "temperature"} // Ensure default value is properly set
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="humidity">Humidity</SelectItem>
                      <SelectItem value="heatIndex">Heat Index</SelectItem>
                      <SelectItem value="airPressure">Air Pressure</SelectItem>
                      <SelectItem value="precipitation">
                        Precipitation
                      </SelectItem>
                      <SelectItem value="uvIndex">UV Index</SelectItem>
                      <SelectItem value="irradiance">Irradiance</SelectItem>
                      <SelectItem value="lux">Light Intensity</SelectItem>
                      <SelectItem value="batteryLevel">
                        Battery Level
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

            <div className="flex flex-row w-full h-[calc(100vh-14rem)]  ">
              <div className="flex flex-col gap-2 pl-4 w-[40%] overflow-auto">
                <VariableTable
                  containerId="table-container1"
                  stationIndex={0}
                />
                <VariableTable
                  containerId="table-container2"
                  stationIndex={1}
                />
                <VariableTable
                  containerId="table-container3"
                  stationIndex={2}
                />
              </div>
              <div className="flex flex-col w-[75%] pr-4 h-full">
                <VariableLineChart />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Variable;
