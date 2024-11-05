import { toast } from "sonner";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/dynamic/DynamicIcons/AlertIcon";

export function UVIndex({
  uvIndexVal,
  stationName,
}: {
  uvIndexVal: number;
  stationName: string;
}) {
  const [colorClass, setColorClass] = useState("");
  const [warning, setWarning] = useState("");
  const hasShownToastRef = useRef(false);
  const hasWarning = useRef(false);

  const determineWarning = useCallback(() => {
    if (uvIndexVal < 3) {
      setWarning("Low danger from the sun's UV rays for the average person.");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (uvIndexVal >= 3 && uvIndexVal <= 5) {
      setColorClass("text-[#fbfc04]");
      setWarning("Moderate risk of harm from unprotected sun exposure.");
      hasShownToastRef.current = false;
      hasWarning.current = false;
    } else if (uvIndexVal >= 6 && uvIndexVal <= 7) {
      setColorClass("text-[#fa6801]");
      setWarning(
        "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed!"
      );
      hasShownToastRef.current = false;
      hasWarning.current = true;
    } else if (uvIndexVal >= 8 && uvIndexVal <= 10) {
      setColorClass("text-[#fe0000] ");
      setWarning(
        `Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly at ${stationName}!`
      );
      if (!hasShownToastRef.current) {
        triggerWarningToast(
          `Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly at ${stationName}!`
        );
        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    } else if (uvIndexVal > 10) {
      setColorClass("text-[#83007e] ");
      setWarning("Extreme Danger: Heatstroke is imminent!");
      if (!hasShownToastRef.current) {
        triggerWarningToast(
          `Extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes at ${stationName}!`
        );
        hasShownToastRef.current = true;
        hasWarning.current = true;
      }
    }
  }, [uvIndexVal, stationName]);

  const triggerWarningToast = (message: string) => {
    toast(message, {
      description: "Please take the necessary precautions.",
      action: {
        label: "Close",
        onClick: () => console.log("Sonner closed"),
      },
    });
  };

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="border border-transparent border-b-gray-200 w-full dark:text-slate-800 py-1">
        <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
          UV Index
        </span>
      </div>

      <div className={`text-xl flex h-full items-center justify-center `}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                  {Math.round(uvIndexVal * 100) / 100}
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
