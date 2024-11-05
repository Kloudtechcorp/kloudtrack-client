import { toast } from "sonner";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/dynamic/DynamicIcons/AlertIcon";
import { triggerWarningToast } from "./triggerWarning";

export function HeatIndex({
  heatIndexval,
  stationName,
}: {
  heatIndexval: number;
  stationName: string;
}) {
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
        triggerWarningToast(`${warning.current} at ${stationName}`.toString());
        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (roundedHeatIndex > 54) {
      setColorClass("text-[#ff3300]");
      handleSetWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast(`${warning.current} at ${stationName} `);

        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    }
  }, [roundedHeatIndex, stationName]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="border border-transparent border-b-gray-200 w-full dark:text-slate-800 py-1">
        <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
          Heat Index
        </span>
      </div>

      <div className={`text-xl flex h-full items-center justify-center `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                  {roundedHeatIndex} C&deg;
                </span>
                {hasWarning.current && (
                  <AlertIcon className={`dark:invert md:block ${colorClass}`} />
                )}

                {warning && (
                  <span className="ml-2">
                    <i className="fas fa-exclamation-circle"></i>
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>{warning || "No warning available"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
