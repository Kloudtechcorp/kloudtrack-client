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

  const [hasWarning, setHasWarning] = useState<boolean>(false);
  // const [hasShownToastRef, setHasShownToastRef] = useState<boolean>(false);
  const hasShownToastRef = useRef(false);

  const warning = useRef<string | null>("");
  const colorClass = useRef<string>("");

  const handleSetWarning = async (warningMessage: string) => {
    warning.current = warningMessage;
  };
  const determineWarning = useCallback(() => {
    if (uvIndexVal < 3) {
      handleSetWarning(
        "Low danger from the sun's UV rays for the average person."
      );
      hasShownToastRef.current = false;
      colorClass.current = "text-primary";

      setHasWarning(false);
    } else if (uvIndexVal >= 3 && uvIndexVal <= 5) {
      colorClass.current = "text-[#fbfc04]";
      handleSetWarning("Moderate risk of harm from unprotected sun exposure.");
      hasShownToastRef.current = false;
      setHasWarning(false);
    } else if (uvIndexVal >= 6 && uvIndexVal <= 7) {
      colorClass.current = "text-[#fa6801]";
      handleSetWarning(
        "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed!"
      );
      hasShownToastRef.current = false;
      setHasWarning(false);
    } else if (uvIndexVal >= 8 && uvIndexVal <= 10) {
      colorClass.current = "text-[#fe0000]";
      handleSetWarning(
        "Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly!"
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: ` Very High UV Index detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });
        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    } else if (uvIndexVal > 10) {
      colorClass.current = "text-[#83007e]";

      console.log("color class in uv is ", colorClass);
      handleSetWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `Extreme UV detected at ${stationName}!`,
          message: `${warning.current}`,
          stationName: stationName,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });
        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    }
  }, [uvIndexVal, stationName, dashboardType, navigate]);

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
