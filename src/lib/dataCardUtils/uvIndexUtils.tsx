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

export function UVIndex({
  uvIndexVal,
  stationName,
  dashboardType,
}: {
  uvIndexVal: number;
  stationName: string;
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
    if (uvIndexVal < 3) {
      handleSetWarning(
        "Low danger from the sun's UV rays for the average person."
      );
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (uvIndexVal >= 3 && uvIndexVal <= 5) {
      setColorClass("text-[#fbfc04]");
      handleSetWarning("Moderate risk of harm from unprotected sun exposure.");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (uvIndexVal >= 6 && uvIndexVal <= 7) {
      setColorClass("text-[#fa6801]");
      handleSetWarning(
        "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed!"
      );
      hasShownToastRef.current = false;
      hasWarning.current = true;
    } else if (uvIndexVal >= 8 && uvIndexVal <= 10) {
      setColorClass("text-[#fe0000] ");
      handleSetWarning(
        `Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly at ${stationName}!`
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: ` Very High UV Index detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass,
          navigate,
        });
        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (uvIndexVal > 10) {
      setColorClass("text-[#83007e] ");
      handleSetWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Extreme UV detected at ${stationName}!`,

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
  }, [navigate, dashboardType, uvIndexVal, stationName]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">UV Index</span>
      </div>

      <div className={`text-xl flex h-full items-center justify-center `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-medium flex items-center">
                <span className="weatherDataText">
                  {Math.round(uvIndexVal * 100) / 100}
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
