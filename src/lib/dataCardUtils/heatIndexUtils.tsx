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

export function HeatIndex({
  heatIndexval,
  stationName,
  dashboardType,
}: {
  heatIndexval: number;
  stationName: string;
  dashboardType: string;
}) {
  const navigate = useNavigate();

  const roundedHeatIndex = Math.round(heatIndexval * 100) / 100;

  const [colorClass, setColorClass] = useState("");
  // const [warning, setWarning] = useState<string | null>("aaaaa");
  const hasShownToastRef = useRef(false);
  const hasWarning = useRef(false);
  const warning = useRef<string | null>("");

  const handleSetWarning = async (warningMessage: string) => {
    warning.current = warningMessage;
  };

  const determineWarning = useCallback(() => {
    if (roundedHeatIndex < 27) {
      setColorClass("text-green-500");
      handleSetWarning("Caution: Stay hydrated!");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (roundedHeatIndex >= 27 && roundedHeatIndex <= 32) {
      setColorClass("text-green-500");
      handleSetWarning("Caution: Stay hydrated");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (roundedHeatIndex > 32 && roundedHeatIndex <= 41) {
      setColorClass("text-[#ffff01]");
      handleSetWarning("Extreme Caution: Avoid prolonged exertion!");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (roundedHeatIndex > 41 && roundedHeatIndex <= 54) {
      setColorClass("text-[#f79647]");
      handleSetWarning(
        "Danger: High risk of heat-related illnesses in " + stationName
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `High heat Index detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass,
          navigate,
        });
        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (roundedHeatIndex > 54) {
      setColorClass("text-[#ff3300]");
      handleSetWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `High heat Index detected at ${stationName}!`,
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
  }, [navigate, dashboardType, roundedHeatIndex, stationName]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">Heat Index</span>
      </div>

      <div className={`cardDataDiv `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="weatherDataText">
                  {roundedHeatIndex} &deg;C
                </span>
                {hasWarning.current && (
                  <AlertIcon className={`${colorClass} size-12`} />
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
