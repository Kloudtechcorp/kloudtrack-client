import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/dynamic/DynamicIcons/AlertIcon";
import { triggerWarningToast } from "./triggerWarning";
import { useNavigate } from "react-router-dom";
import { weatherUnit } from "../utils";

export function Precipitation({
  precipitation,
  stationName,
  pastHourPrecip,
  dashboardType,
  id,
}: {
  precipitation: number;
  stationName: string;
  pastHourPrecip: number;
  dashboardType: string;
  id: string;
}) {
  const navigate = useNavigate();

  const colorClass = useRef<string>("");
  const [hasWarning, setHasWarning] = useState<boolean>(false);
  // const [hasShownToastRef, setHasShownToastRef] = useState<boolean>(false);
  const hasShownToastRef = useRef(false);

  const warning = useRef<string | null>("");

  const handleSetWarning = async (warningMessage: string) => {
    warning.current = warningMessage;
  };

  const determineWarning = useCallback(() => {
    if (pastHourPrecip > 2 && pastHourPrecip < 7.5) {
      colorClass.current = "text-[#00ff01]";

      handleSetWarning(`Light rain at ${stationName}.`);
      hasShownToastRef.current = false;
      setHasWarning(false);
    } else if (pastHourPrecip >= 7.5 && pastHourPrecip < 15) {
      colorClass.current = "text-[#fbd007]";
      handleSetWarning("Heavy rains are expected, flooding is possibl!");
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Heavy rainfall detected at ${stationName}!`,
          message: `${warning.current}`,
          id: id,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });

        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    } else if (pastHourPrecip >= 15 && pastHourPrecip <= 30) {
      colorClass.current = "text-[#ed761c]";
      handleSetWarning(
        "With intense rains, flooding is threatening, and the public is advised to be alert for possible evacuation!"
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Intense rain detected at ${stationName}!`,
          message: `${warning.current}`,
          id: id,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });

        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    } else if (pastHourPrecip > 30) {
      colorClass.current = "text-[#ff3300] ";
      handleSetWarning(
        "Torrential rains could cause serious flooding in some areas, so affected residents must evacuate as soon as possible!"
      );

      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Torrential rain detected at ${stationName}!`,
          message: `${warning.current}`,
          id: id,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });

        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    }
  }, [pastHourPrecip, stationName, hasShownToastRef, dashboardType, navigate]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">Precipitation</span>
      </div>

      <div className={`text-xl flex h-full items-center justify-center `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-medium text-xl flex h-full items-center flex-row justify-center gap-2 ">
                <div className="flex flex-col w-full">
                  <span className="weatherDataText">
                    {precipitation === null
                      ? "--"
                      : `${precipitation} ${weatherUnit("precipitation")}`}
                  </span>
                  <span className="weatherDataText">
                    {(Math.round(pastHourPrecip * 100) / 100).toFixed(1)} mm/hr
                  </span>
                </div>
                {hasWarning && (
                  <AlertIcon className={`${colorClass.current} w-1/4`} />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>{warning.current || "No warning available"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
