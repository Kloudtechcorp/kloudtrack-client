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

const ArgVariableCard: React.FC<{ id: number[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState("precipitation");

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
                      <SelectItem value="precipitation">
                        Precipitation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-[.4rem] overflow-y-auto w-full custom-scrollbar">
              {id.map((id, key) => (
                <TableGraphCard
                  type={"arg"}
                  stationId={id}
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

export default ArgVariableCard;
