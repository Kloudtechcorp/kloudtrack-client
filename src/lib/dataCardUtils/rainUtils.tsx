import React, { useEffect, useCallback, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AlertIcon from "@/components/global/icons/AlertIcon";
import { triggerWarningToast } from "./triggerWarning";
import { useNavigate } from "react-router-dom";
import { weatherUnit } from "../utils";

type PrecipitationCategory = {
  range: [number, number];
  message: string;
  color: string;
  warningTitle: string;
  requiresWarning: boolean;
};

const PRECIPITATION_CATEGORIES: PrecipitationCategory[] = [
  {
    range: [0, 2],
    message: "Normal precipitation levels.",
    color: "text-primary",
    warningTitle: "",
    requiresWarning: false,
  },
  {
    range: [2.01, 7.49],
    message: "Light rain.",
    color: "text-[#00ff01]",
    warningTitle: "",
    requiresWarning: false,
  },
  {
    range: [7.5, 14.99],
    message: "Heavy rains are expected, flooding is possible!",
    color: "text-[#fbd007]",
    warningTitle: "Heavy rainfall detected",
    requiresWarning: true,
  },
  {
    range: [15, 30],
    message:
      "With intense rains, flooding is threatening, and the public is advised to be alert for possible evacuation!",
    color: "text-[#ed761c]",
    warningTitle: "Intense rain detected",
    requiresWarning: true,
  },
  {
    range: [30.01, Infinity],
    message:
      "Torrential rains could cause serious flooding in some areas, so affected residents must evacuate as soon as possible!",
    color: "text-[#ff3300]",
    warningTitle: "Torrential rain detected",
    requiresWarning: true,
  },
];

export interface PrecipitationProps {
  precipitation: number;
  stationName: string;
  pastHourPrecip: number;
  dashboardType: string;
  id: string;
}

export function Precipitation({
  precipitation,
  stationName,
  pastHourPrecip,
  dashboardType,
  id,
}: PrecipitationProps) {
  const navigate = useNavigate();
  const [hasWarning, setHasWarning] = useState(false);
  const [warning, setWarning] = useState<string>("");
  const [colorClass, setColorClass] = useState<string>("");
  const hasShownToastRef = React.useRef(false);

  const determineWarning = useCallback(() => {
    // Find the matching category for the current precipitation rate
    const category = PRECIPITATION_CATEGORIES.find(
      (cat) => pastHourPrecip >= cat.range[0] && pastHourPrecip <= cat.range[1]
    );

    if (!category) return;

    setWarning(category.message);
    setColorClass(category.color);

    // Add station name to light rain message
    const displayMessage =
      category.range[0] === 2.01
        ? `Light rain at ${stationName}.`
        : category.message;

    setWarning(displayMessage);

    if (category.requiresWarning && !hasShownToastRef.current) {
      triggerWarningToast({
        title: `${category.warningTitle} at ${stationName}!`,
        message: displayMessage,
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
  }, [pastHourPrecip, stationName, dashboardType, id, navigate]);

  useEffect(() => {
    determineWarning();
  }, [determineWarning]);

  return (
    <div className="text-center w-full flex flex-col h-full">
      <div className="cardTitleDiv">
        <span className="weatherDataTitle">Precipitation</span>
      </div>

      <div className="text-xl flex h-full items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="font-medium text-xl flex h-full items-center flex-row justify-center gap-2">
                <div className="flex flex-col w-full">
                  <span className="weatherDataText">
                    {precipitation === null
                      ? "--"
                      : `${precipitation} ${weatherUnit("precipitation")}`}
                  </span>
                  <span className={`weatherDataText ${colorClass}`}>
                    {(Math.round(pastHourPrecip * 100) / 100).toFixed(1)} mm/hr
                  </span>
                </div>
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
