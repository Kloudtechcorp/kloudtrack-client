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

export function HeatIndex({
  heatIndexval,
  stationName,
  dashboardType,
  id,
}: {
  heatIndexval: number;
  stationName: string;
  dashboardType: string;
  id: string;
}) {
  const navigate = useNavigate();

  const roundedHeatIndex = Math.round(heatIndexval * 100) / 100;

  const colorClass = useRef<string>("");

  const [hasWarning, setHasWarning] = useState<boolean>(false);
  const hasShownToastRef = useRef(false);

  const warning = useRef<string | null>("");

  const handleSetWarning = async (warningMessage: string) => {
    warning.current = warningMessage;
  };

  const determineWarning = useCallback(() => {
    if (roundedHeatIndex >= 27 && roundedHeatIndex <= 32) {
      colorClass.current = "text-green-500";
      handleSetWarning("Caution: Stay hydrated");
      hasShownToastRef.current = false;
      setHasWarning(false);
    } else if (roundedHeatIndex > 32 && roundedHeatIndex <= 41) {
      colorClass.current = "text-[#ffff01]";
      handleSetWarning("Extreme Caution: Avoid prolonged exertion!");
      hasShownToastRef.current = false;
      setHasWarning(false);
    } else if (roundedHeatIndex > 41 && roundedHeatIndex <= 54) {
      colorClass.current = "text-[#f79647]";
      handleSetWarning(
        "Danger: High risk of heat-related illnesses in " + stationName
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `High heat Index detected at ${stationName}!`,
          message: `${warning.current}`,
          id: id,
          dashboardType: dashboardType,
          colorClass: colorClass.current,
          navigate,
        });
        hasShownToastRef.current = true;
        setHasWarning(true);
      }
    } else if (roundedHeatIndex > 54) {
      colorClass.current = "text-[#ff3300]";
      handleSetWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast({
          title: `High heat Index detected at ${stationName}!`,
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
  }, [roundedHeatIndex, stationName, dashboardType, navigate]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">Heat Index</span>
      </div>

      <div className={`text-xl flex h-full items-center justify-center `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="weatherDataText">
                  {roundedHeatIndex} &deg;C
                </span>
                {hasWarning && (
                  <AlertIcon className={`${colorClass.current}`} />
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
