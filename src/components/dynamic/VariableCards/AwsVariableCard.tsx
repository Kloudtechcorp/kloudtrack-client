// import VerticalCards from "@/components/shared/VerticalCards";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import TableGraphCard from "../TableGraphCard";
import { checkRepeat } from "@/lib/utils";
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";

const AwsVariableCard: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState("temperature");
  const [repeatData, setRepeatData] = useState("hour");
  const [rangeData, setRangeData] = useState("24");

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="text-3xl font-bold px-4 capitalize">
                {weatherData}
              </span>
              <div className="flex gap-1">
                <div className="flex flex-col justify-center px-3">
                  <span className="text-sm px-1">Parameter Option</span>
                  <span className="text-3xl font-bold">
                    <Select
                      defaultValue={weatherData}
                      onValueChange={(value) => setWeatherData(value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Variable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heatIndex">Heat Index</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="humidity">Humidity</SelectItem>
                        <SelectItem value="pressure">Air Pressure</SelectItem>
                        <SelectItem value="windSpeed">Wind Speed</SelectItem>
                        <SelectItem value="uvIndex">UV Index</SelectItem>
                        <SelectItem value="light">Light Intensity</SelectItem>
                        <SelectItem value="precipitation">
                          Precipitation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </div>
                <RangeRepeatSelector
                  repeatData={repeatData}
                  setRepeatData={setRepeatData}
                  rangeData={rangeData}
                  setRangeData={setRangeData}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[.4rem] overflow-y-auto w-full custom-scrollbar">
              {id.map((id, key) => (
                <TableGraphCard
                  type={"aws"}
                  stationId={id}
                  weatherData={weatherData}
                  range={checkRepeat(repeatData, +rangeData)}
                  repeat={repeatData}
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

export default AwsVariableCard;
