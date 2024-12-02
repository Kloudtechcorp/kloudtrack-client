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
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";
import { checkRepeat } from "@/lib/utils";

const ClmsVariableCard: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState("distance");
  const [repeatData, setRepeatData] = useState("hour");
  const [rangeData, setRangeData] = useState("24");

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="variableTitle">{weatherData}</span>
              <div className="flex gap-1">
                <div className="flex flex-col justify-center px-1">
                  <span className="parameterOption">Parameter Option</span>
                  <span className="text-3xl font-bold">
                    <Select
                      defaultValue={weatherData}
                      onValueChange={(value) => setWeatherData(value)}
                    >
                      <SelectTrigger className="md:w-[200px]">
                        <SelectValue placeholder="Variable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="humidity">Humidity</SelectItem>
                        <SelectItem value="pressure">Air Pressure</SelectItem>
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
                  type={"clms"}
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

export default ClmsVariableCard;
