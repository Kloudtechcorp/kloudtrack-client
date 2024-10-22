// heatIndexUtils.tsx

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HeatIndex({ heatIndexval }: { heatIndexval: number }) {
  const roundedHeatIndex = Math.round(heatIndexval * 100) / 100;

  let colorClass = "";
  let warning = "";

  if (roundedHeatIndex < 27) {
    colorClass = "text-green-500";
  } else if (roundedHeatIndex >= 27 && roundedHeatIndex <= 32) {
    colorClass = "text-green-500";
    warning = "Caution: Stay hydrated!";
  } else if (roundedHeatIndex > 32 && roundedHeatIndex <= 41) {
    colorClass = "text-yellow-500";
    warning = "Extreme Caution: Avoid prolonged exertion!";
  } else if (roundedHeatIndex > 41 && roundedHeatIndex <= 54) {
    colorClass = "text-orange-500";
    warning = "Danger: High risk of heat-related illnesses!";
  } else if (roundedHeatIndex > 54) {
    colorClass = "text-red-500";
    warning = "Extreme Danger: Heatstroke is imminent!";
  }

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
        <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
          Heat Index
        </span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              src="/assets/icons/help.svg"
              width={15}
              className="dark:invert md:block"
              alt="Help Icon"
            />
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>{warning || "No warning available"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div
        className={`text-xl flex h-full items-center justify-center ${colorClass}`}
      >
        <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
          {roundedHeatIndex} C&deg;
        </span>
        {warning && (
          <span className="ml-2">
            <i className="fas fa-exclamation-circle" data-tip={warning}></i>
          </span>
        )}
      </div>
    </div>
  );
}
