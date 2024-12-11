import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableGraphCard from "../TableGraphCard";
import { checkRepeat } from "@/lib/utils";
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";
import { Switch } from "@/components/ui/switch";

const RlmsVariableCard: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState<string>(
    () => localStorage.getItem("riverData") || "distance"
  );
  const [repeatData, setRepeatData] = useState<string>(
    () => localStorage.getItem("riverRepeat") || "hour"
  );
  const [rangeData, setRangeData] = useState<string>(
    () => localStorage.getItem("riverRange") || "24"
  );
  const [checked, setChecked] = useState<boolean>(() =>
    localStorage.getItem("riverChecked") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("riverData", weatherData);
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("riverRepeat", repeatData);
  }, [repeatData]);

  useEffect(() => {
    localStorage.setItem("riverRange", rangeData);
  }, [rangeData]);

  useEffect(() => {
    localStorage.setItem("riverChecked", String(checked));
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
                          <SelectItem value="distance">Distance</SelectItem>
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

            <div className="flex flex-col gap-[.4rem] overflow-y-auto w-full custom-scrollbar">
              {id.map((id, key) => (
                <TableGraphCard
                  type={"rlms"}
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

export default RlmsVariableCard;
