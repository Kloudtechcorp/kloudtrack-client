import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import TableGraphCard from "../TableGraphCard";
import { addSpacesToPascalCase, checkRepeat } from "@/lib/utils";
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";
import { Switch } from "@/components/ui/switch";

const ArgVariableCard: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState<string>(
    () => localStorage.getItem("rainData") || "precipitation"
  );
  const [repeatData, setRepeatData] = useState<string>(
    () => localStorage.getItem("rainRepeat") || "hour"
  );
  const [rangeData, setRangeData] = useState<string>(
    () => localStorage.getItem("rainRange") || "24"
  );
  const [checked, setChecked] = useState<boolean>(() =>
    localStorage.getItem("rainChecked") === "true" ? true : false
  );
  useEffect(() => {
    localStorage.setItem("rainData", weatherData);
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("rainRepeat", repeatData);
  }, [repeatData]);

  useEffect(() => {
    localStorage.setItem("rainRange", rangeData);
  }, [rangeData]);

  useEffect(() => {
    localStorage.setItem("rainChecked", String(checked));
  }, [checked]);

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="text-3xl font-bold px-4 capitalize">
                {addSpacesToPascalCase(weatherData)}
              </span>
              <div className="flex gap-1">
                {weatherData !== "precipitation" &&
                  weatherData !== "uvIndex" && (
                    <div className="flex flex-col items-center h-full">
                      <span className="text-sm px-1">Show Dots</span>
                      <div className="h-10 flex items-center w-full justify-center">
                        <Switch
                          onCheckedChange={() => setChecked(!checked)}
                          checked={checked}
                        />
                      </div>
                    </div>
                  )}
                <div className="flex gap-1">
                  {weatherData !== "precipitation" &&
                    weatherData !== "uvIndex" && (
                      <div className="flex flex-col items-center h-full">
                        <span className="text-sm px-1">Show Dots</span>
                        <div className="h-10 flex items-center w-full justify-center">
                          <Switch
                            onCheckedChange={() => setChecked(!checked)}
                            checked={checked}
                          />
                        </div>
                      </div>
                    )}
                  <div className="flex flex-col justify-center items-center px-1">
                    <span className="selectTitle text-center">
                      Parameter Option
                    </span>
                    <span className="text-3xl font-bold">
                      <Select
                        defaultValue={weatherData}
                        onValueChange={(value) => setWeatherData(value)}
                      >
                        <SelectTrigger className="selectTrigger">
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
                  <div className="flex flex-col lg:flex-row">
                    <RangeRepeatSelector
                      repeatData={repeatData}
                      setRepeatData={setRepeatData}
                      rangeData={rangeData}
                      setRangeData={setRangeData}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tableGraphCard">
              {id.map((id, key) => (
                <TableGraphCard
                  type={"arg"}
                  stationId={id}
                  weatherData={weatherData}
                  range={checkRepeat(repeatData, +rangeData)}
                  repeat={repeatData}
                  key={key}
                  showDots={checked}
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
