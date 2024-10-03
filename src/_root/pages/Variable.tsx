import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import TableGraphCard from "@/components/dynamic/TableGraphCard";
import { useStationContext } from "@/hooks/context/stationContext";

const Variable = () => {
  const { stationNames } = useStationContext();
  const [weatherData, setWeatherData] = useState("temperature");

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="text-3xl font-bold px-4 capitalize">
                {weatherData}
              </span>
              <div className="flex flex-col justify-center px-6">
                <span className="text-sm px-1">Sensor Option</span>
                <span className="text-3xl font-bold">
                  <Select
                    defaultValue={weatherData}
                    onValueChange={(value) => setWeatherData(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="humidity">Humidity</SelectItem>
                      <SelectItem value="heatIndex">Heat Index</SelectItem>
                      <SelectItem value="pressure">Air Pressure</SelectItem>
                      <SelectItem value="precipitation">
                        Precipitation
                      </SelectItem>
                      <SelectItem value="uvIntensity">UV Index</SelectItem>
                      {/* <SelectItem value="irradiance">Irradiance</SelectItem> */}
                      <SelectItem value="light">Light Intensity</SelectItem>
                      {/* <SelectItem value="batteryVoltage">
                        Battery Level
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[.4rem] overflow-y-auto w-full h-[calc(100vh-14rem)] custom-scrollbar">
              {stationNames.map((names, key) => (
                <TableGraphCard
                  stationName={names.stationName}
                  weatherData={weatherData}
                  range={12}
                  repeat="hour"
                  key={key}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Variable;
