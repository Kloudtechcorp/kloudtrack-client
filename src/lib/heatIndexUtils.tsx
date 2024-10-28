import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TempIcon from "@/components/dynamic/DynamicIcons/TempIcon";

export function HeatIndex({ heatIndexval }: { heatIndexval: number }) {
  const roundedHeatIndex = Math.round((heatIndexval + 40) * 100) / 100;

  const [colorClass, setColorClass] = useState("");
  const [warning, setWarning] = useState("");
  const [hasShownToast, setHasShownToast] = useState(false); // To avoid repeated toasts

  useEffect(() => {
    const determineWarning = () => {
      if (roundedHeatIndex < 27) {
        setColorClass("text-green-500");
        setWarning("Caution: Stay hydrated!");
        setHasShownToast(false); // Reset toast trigger
      } else if (roundedHeatIndex >= 27 && roundedHeatIndex <= 32) {
        setColorClass("text-green-500");
        setWarning("Caution: Stay hydrated");
        setHasShownToast(false);
      } else if (roundedHeatIndex > 32 && roundedHeatIndex <= 41) {
        setColorClass("text-yellow-500");
        setWarning("Extreme Caution: Avoid prolonged exertion!");
        setHasShownToast(false);
      } else if (roundedHeatIndex > 41 && roundedHeatIndex <= 54) {
        setColorClass("text-orange-500");
        setWarning("Danger: High risk of heat-related illnesses!");
        if (!hasShownToast) {
          triggerWarningToast("Danger: High risk of heat-related illnesses!");
        }
      } else if (roundedHeatIndex > 54) {
        setColorClass("text-red-500");
        setWarning("Extreme Danger: Heatstroke is imminent!");
        if (!hasShownToast) {
          triggerWarningToast("Extreme Danger: Heatstroke is imminent!");
        }
      }
    };

    const triggerWarningToast = (message: string) => {
      toast(message, {
        description: "Please take the necessary precautions.",
        action: {
          label: "Acknowledge",
          onClick: () => console.log("Acknowledge clicked"),
        },
      });
      setHasShownToast(true); // Prevent repeated toast within the same range
    };

    determineWarning();
  }, [roundedHeatIndex, hasShownToast]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
        <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
          Heat Index
        </span>
      </div>

      <div className="text-xl flex h-full items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <TempIcon className={`dark:invert md:block ${colorClass}`} />
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
        <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
          {roundedHeatIndex} C&deg;
        </span>
      </div>
    </div>
  );
}
