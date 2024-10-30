import { toast } from "sonner";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HeatIndex({
  heatIndexval,
  stationName,
}: {
  heatIndexval: number;
  stationName: string;
}) {
  const roundedHeatIndex = Math.round((heatIndexval + 40) * 100) / 100;

  const [colorClass, setColorClass] = useState("");
  const [warning, setWarning] = useState("");
  const hasShownToastRef = useRef(false);

  const determineWarning = useCallback(() => {
    if (roundedHeatIndex < 27) {
      setColorClass("bg-green-500");
      setWarning("Caution: Stay hydrated!");
      hasShownToastRef.current = false;
    } else if (roundedHeatIndex >= 27 && roundedHeatIndex <= 32) {
      setColorClass("bg-green-500");
      setWarning("Caution: Stay hydrated");
      hasShownToastRef.current = false;
    } else if (roundedHeatIndex > 32 && roundedHeatIndex <= 41) {
      setColorClass("bg-[#ffff01]");
      setWarning("Extreme Caution: Avoid prolonged exertion!");
      hasShownToastRef.current = false;
    } else if (roundedHeatIndex > 41 && roundedHeatIndex <= 54) {
      setColorClass("bg-[#f79647] text-white");
      setWarning(
        `Danger: High risk of heat-related illnesses in ${stationName}!`
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast(
          `Danger: High risk of heat-related illnesses in ${stationName}!`
        );
        hasShownToastRef.current = true;
      }
    } else if (roundedHeatIndex > 54) {
      setColorClass("bg-[#ff3300] text-white");
      setWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast(
          `Extreme Danger: Heatstroke is imminent at ${stationName}!`
        );
        hasShownToastRef.current = true;
      }
    }
  }, [roundedHeatIndex, stationName]);

  const triggerWarningToast = (message: string) => {
    toast(message, {
      description: "Please take the necessary precautions.",
      action: {
        label: "Acknowledge",
        onClick: () => console.log("Acknowledge clicked"),
      },
    });
  };

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
        <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
          Heat Index
        </span>
      </div>

      <div
        className={`text-xl flex h-full items-center justify-center ${colorClass} `}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                  {roundedHeatIndex} C&deg;
                </span>
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
