// import VerticalCards from "@/components/shared/VerticalCards";
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
import { checkRepeat } from "@/lib/utils";
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";
import { Switch } from "@/components/ui/switch";

const AwsVariableCard: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState<string>(
    () => localStorage.getItem("weatherData") || "temperature"
  );
  const [repeatData, setRepeatData] = useState<string>(
    () => localStorage.getItem("weatherRepeat") || "hour"
  );
  const [rangeData, setRangeData] = useState<string>(
    () => localStorage.getItem("weatherRange") || "24"
  );
  const [checked, setChecked] = useState<boolean>(() =>
    localStorage.getItem("weatherChecked") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("weatherData", weatherData);
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("weatherRepeat", repeatData);
  }, [repeatData]);

  useEffect(() => {
    localStorage.setItem("weatherRange", rangeData);
  }, [rangeData]);

  useEffect(() => {
    localStorage.setItem("weatherChecked", String(checked));
  }, [checked]);

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="variableCardMain">
              <span className="variableWeatherData">{weatherData}</span>
              <div className="variableMainDiv">
                <div className="variableSubDiv">
                  <div className="flex">
                    {weatherData !== "precipitation" &&
                      weatherData !== "uvIndex" && (
                        <div className="flex flex-col items-center h-full">
                          <span className="md:text-sm text-xs px-1">
                            Show Dots
                          </span>
                          <div className="h-10 flex items-center w-full justify-center">
                            <Switch
                              onCheckedChange={() => setChecked(!checked)}
                              checked={checked}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="flex flex-col">
                    <span className="selectTitle">Parameter Option</span>
                    <span className="text-3xl font-bold">
                      <Select
                        defaultValue={weatherData}
                        onValueChange={(value) => setWeatherData(value)}
                      >
                        <SelectTrigger className="selectTrigger">
                          <SelectValue placeholder="Variable" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heatIndex">Heat Index</SelectItem>
                          <SelectItem value="temperature">
                            Temperature
                          </SelectItem>
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

            <div className="tableGraphCard">
              {id.map((id, key) => (
                <TableGraphCard
                  type={"aws"}
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

export default AwsVariableCard;
