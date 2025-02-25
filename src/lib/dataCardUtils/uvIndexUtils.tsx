import { useEffect, useCallback, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/dynamic/DynamicIcons/AlertIcon";
import { triggerWarningToast } from "./triggerWarning";
import { useNavigate } from "react-router-dom";

type UVCategory = {
  range: [number, number];
  message: string;
  color: string;
  requiresWarning: boolean;
};

const UV_CATEGORIES: UVCategory[] = [
  {
    range: [0, 2.99],
    message: "Low danger from the sun's UV rays for the average person.",
    color: "text-primary",
    requiresWarning: false,
  },
  {
    range: [3, 5.99],
    message: "Moderate risk of harm from unprotected sun exposure.",
    color: "text-[#fbfc04]",
    requiresWarning: false,
  },
  {
    range: [6, 7.99],
    message:
      "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed!",
    color: "text-[#fa6801]",
    requiresWarning: false,
  },
  {
    range: [8, 10.99],
    message:
      "Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly!",
    color: "text-[#fe0000]",
    requiresWarning: true,
  },
  {
    range: [11, Infinity],
    message: "Extreme Danger: Heatstroke is imminent!",
    color: "text-[#83007e]",
    requiresWarning: true,
  },
];

export interface UVIndexProps {
  uvIndexVal: number;
  stationName: string;
  dashboardType: string;
  id: string;
}

export function UVIndex({
  uvIndexVal,
  stationName,
  dashboardType,
  id,
}: UVIndexProps) {
  const navigate = useNavigate();
  const [hasWarning, setHasWarning] = useState(false);
  const hasShownToastRef = useRef(false);
  const [warning, setWarning] = useState<string>("");
  const [colorClass, setColorClass] = useState<string>("");

  const determineWarning = useCallback(() => {
    // Find the matching category for the current UV index
    const category = UV_CATEGORIES.find(
      (cat) => uvIndexVal >= cat.range[0] && uvIndexVal <= cat.range[1]
    );

    if (!category) return;

    setWarning(category.message);
    setColorClass(category.color);

    if (category.requiresWarning && !hasShownToastRef.current) {
      const title =
        uvIndexVal > 10
          ? `Extreme UV detected at ${stationName}!`
          : `Very High UV Index detected at ${stationName}!`;

      triggerWarningToast({
        title,
        message: category.message,
        id,
        dashboardType,
        colorClass: category.color,
        navigate,
      });

      hasShownToastRef.current = true;
      setHasWarning(true);
    } else if (!category.requiresWarning) {
      hasShownToastRef.current = false;
      setHasWarning(false);
    }
  }, [uvIndexVal, stationName, dashboardType, id, navigate]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">UV Index</span>
      </div>

      <div className="text-xl flex h-full items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-medium flex items-center">
                <span className={`weatherDataText ${colorClass}`}>
                  {(Math.round(uvIndexVal * 100) / 100).toFixed(1)}
                </span>
                {hasWarning && <AlertIcon className={`${colorClass} w-1/4`} />}
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
