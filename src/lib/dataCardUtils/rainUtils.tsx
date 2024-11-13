import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/dynamic/DynamicIcons/AlertIcon";
import { triggerWarningToast } from "./triggerWarning";
import { useNavigate } from "react-router-dom";

export function Precipitation({
  precipitation,
  stationName,
  pastHourPrecip,
  dashboardType,
}: {
  precipitation: number;
  stationName: string;
  pastHourPrecip: number;
  dashboardType: string;
}) {
  const navigate = useNavigate();

  const [colorClass, setColorClass] = useState("");

  const hasShownToastRef = useRef(false);
  const hasWarning = useRef(false);
  const warning = useRef<string | null>("");

  const handleSetWarning = async (warningMessage: string) => {
    warning.current = warningMessage;
  };

  const determineWarning = useCallback(() => {
    if (pastHourPrecip > 2 && pastHourPrecip < 7.5) {
      setColorClass("text-[#00ff01]");

      handleSetWarning(`Light rain at ${stationName}.`);
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (pastHourPrecip >= 7.5 && pastHourPrecip < 15) {
      setColorClass("text-[#fbd007]");
      handleSetWarning(
        `Heavy rains are expected, flooding is possible at ${stationName}!`
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Heavy rainfall detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass,
          navigate,
        });

        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (pastHourPrecip >= 15 && pastHourPrecip <= 30) {
      setColorClass("text-[#ed761c]");
      handleSetWarning(
        `With intense rains, flooding is threatening, and the public is advised to be alert for possible evacuation at ${stationName}`
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Intense rain detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass,
          navigate,
        });

        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (pastHourPrecip > 30) {
      setColorClass("text-[#ff3300] ");
      handleSetWarning(
        `Torrential rains could cause serious flooding in some areas, so affected residents must evacuate as soon as possible at ${stationName}!`
      );

      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Torrential rain detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass,
          navigate,
        });

        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    }
  }, [navigate, dashboardType, pastHourPrecip, stationName]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">Precipitation</span>
      </div>

      <div className={`cardDataDiv `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-medium text-xl flex h-full items-center flex-row justify-center gap-2 w-full bg-red-200 ">
                <div className="flex flex-col w-full bg-blue-200">
                  <span className="weatherDataText">
                    {(Math.round(precipitation * 100) / 100).toFixed(1)} mm
                  </span>
                  <span className="weatherDataText">
                    {(Math.round(pastHourPrecip * 100) / 100).toFixed(1)} mm/hr
                  </span>
                </div>
                <div className="bg-green-200">
                  {hasWarning.current && (
                    <AlertIcon className={`${colorClass} size-16`} />
                  )}
                </div>
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
