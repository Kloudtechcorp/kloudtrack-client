import React, { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetAwsData2 } from "@/hooks/react-query/queries";
import {
  formatDateString,
  getWarningInfo,
  getWindDirectionLabel,
  WARNING_THRESHOLDS,
  weatherUnit,
} from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AwsCardProps {
  id: string;
}

// Create a type to track warning states
interface WarningState {
  lastWarningTime: number;
  lastWarningColor: string | null;
}

const WeatherDataTable: React.FC<AwsCardProps> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetAwsData2(id);

  // Ref to store warning states for different parameters
  const warningStatesRef = useRef<{
    windSpeed?: WarningState;
    uvIndex?: WarningState;
    heatIndex?: WarningState;
    precipitation?: WarningState;
  }>({});

  // Function to check if a warning should be shown
  const shouldShowWarning = (
    paramName: keyof typeof warningStatesRef.current,
    currentWarningColor: string
  ): boolean => {
    const warningStates = warningStatesRef.current;
    const currentTime = Date.now();

    // If no previous warning state exists, show warning
    if (!warningStates[paramName]) {
      warningStates[paramName] = {
        lastWarningTime: currentTime,
        lastWarningColor: currentWarningColor,
      };
      return true;
    }

    const paramState = warningStates[paramName]!;
    const timeSinceLastWarning = currentTime - paramState.lastWarningTime;
    const isColorChanged = paramState.lastWarningColor !== currentWarningColor;

    // Show warning if color changed or 30 minutes have passed
    if (isColorChanged || timeSinceLastWarning >= 30 * 60 * 1000) {
      // Update warning state
      paramState.lastWarningTime = currentTime;
      paramState.lastWarningColor = currentWarningColor;
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!stationData?.data) return;

    const { data } = stationData;
    const heatIndexWarning = getWarningInfo("heatIndex", data.heatIndex);
    const windWarning = getWarningInfo("windSpeed", data.windSpeed);
    const uvWarning = getWarningInfo("uvIndex", data.uvIndex);
    const hourRainWarning = getWarningInfo(
      "precipitation",
      stationData.pastHourPrecip
    );

    // Wind Speed Warning
    if (
      data.windSpeed >= WARNING_THRESHOLDS.windSpeed.high &&
      shouldShowWarning("windSpeed", windWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                ${windWarning.color === "red" ? "Typhoon Force" : ""}
                ${windWarning.color === "orange" ? "Storm Force" : ""}
                ${windWarning.color === "amber" ? "Gale Force" : ""}
                ${windWarning.color === "yellow" ? "Strong" : ""}
              `}{" "}
            Winds Alert at {stationData.station.name}
          </span>
          <span
            className={`
                ${
                  windWarning.color === "red"
                    ? "text-[#FE0000] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "orange"
                    ? "text-[#FFC000] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "amber"
                    ? "text-[#FFFF00] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "yellow"
                    ? "text-[#00CCFF] font-bold text-2xl"
                    : ""
                }
              `}
          >
            {data.windSpeed}
            {weatherUnit("windSpeed")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() =>
              toast.dismiss(`windSpeed-${stationData.station.name}`)
            }
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `windSpeed-${stationData.station.name}`,
        }
      );
    }

    // UV Index Warning
    if (
      data.uvIndex >= WARNING_THRESHOLDS.uvIndex.high &&
      shouldShowWarning("uvIndex", uvWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                ${uvWarning.color === "red" ? "Extreme" : ""}
                ${uvWarning.color === "orange" ? "Very High" : ""}
                ${uvWarning.color === "amber" ? "High" : ""}
                ${uvWarning.color === "yellow" ? "Moderate" : ""}
              `}{" "}
            UV Index Alert at {stationData.station.name}
          </span>
          <span
            className={`
                ${
                  uvWarning.color === "red"
                    ? "text-[#9E47CC] font-bold text-2xl"
                    : ""
                }
                ${
                  uvWarning.color === "orange"
                    ? "text-[#F55023] font-bold text-2xl"
                    : ""
                }
                ${
                  uvWarning.color === "amber"
                    ? "text-[#FF9000] font-bold text-2xl"
                    : ""
                }
                ${
                  uvWarning.color === "yellow"
                    ? "text-[#FFBC01] font-bold text-2xl"
                    : ""
                }
              `}
          >
            {data.uvIndex}
            {weatherUnit("uvIndex")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() => toast.dismiss(`uvIndex-${stationData.station.name}`)}
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `uvIndex-${stationData.station.name}`,
        }
      );
    }

    // Heat Index Warning
    if (
      data.heatIndex >= WARNING_THRESHOLDS.heatIndex.high &&
      shouldShowWarning("heatIndex", heatIndexWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {heatIndexWarning.color === "red"
              ? "Extreme Danger"
              : heatIndexWarning.color === "orange"
              ? "Danger"
              : heatIndexWarning.color === "amber"
              ? "Extreme Caution"
              : heatIndexWarning.color === "yellow"
              ? "Caution"
              : ""}{" "}
            Heat Index at {stationData.station.name}
          </span>
          <span
            className={`
                ${
                  heatIndexWarning.color === "red"
                    ? "text-[#CC0001] font-bold text-2xl"
                    : ""
                }
                ${
                  heatIndexWarning.color === "orange"
                    ? "text-[#FF6600] font-bold text-2xl"
                    : ""
                }
                ${
                  heatIndexWarning.color === "amber"
                    ? "text-[#FFCC00] font-bold text-2xl"
                    : ""
                }
                ${
                  heatIndexWarning.color === "yellow"
                    ? "text-[#FFFF00] font-bold text-2xl"
                    : ""
                }
              `}
          >
            {data.heatIndex}
            {weatherUnit("heatIndex")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() =>
              toast.dismiss(`heatIndex-${stationData.station.name}`)
            }
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `heatIndex-${stationData.station.name}`,
        }
      );
    }

    // Precipitation Warning
    if (
      stationData.pastHourPrecip >= WARNING_THRESHOLDS.precipitation.high &&
      shouldShowWarning("precipitation", hourRainWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                ${hourRainWarning.color === "red" ? "Torrential" : ""}
                ${hourRainWarning.color === "orange" ? "Intense" : ""}
                ${hourRainWarning.color === "amber" ? "Heavy" : ""}
              `}{" "}
            Rainfall Warning at {stationData.station.name}
          </span>
          <span
            className={`
                ${
                  hourRainWarning.color === "red"
                    ? "text-red-500 font-bold text-2xl"
                    : ""
                }
                ${
                  hourRainWarning.color === "orange"
                    ? "text-orange-500 font-bold text-2xl"
                    : ""
                }
                ${
                  hourRainWarning.color === "yellow"
                    ? "text-yellow-500 font-bold text-2xl"
                    : ""
                }
              `}
          >
            {stationData.pastHourPrecip}
            {weatherUnit("precipitation")}/hr
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() =>
              toast.dismiss(`precipitation-${stationData.station.name}`)
            }
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `precipitation-${stationData.station.name}`,
        }
      );
    }
  }, [stationData]);

  if (isLoading || !stationData) {
    return (
      <TableRow className="hover:bg-secondary cursor-pointer">
        <TableCell className="border border-stone-200 dark:border-stone-700">
          Loading ...
        </TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow className="hover:bg-secondary cursor-pointer">
        <TableCell className="border border-stone-200 dark:border-stone-700">
          Error
        </TableCell>
      </TableRow>
    );
  }

  if (stationData.data) {
    const heatIndexWarning = getWarningInfo(
      "heatIndex",
      stationData.data.heatIndex
    );
    const windWarning = getWarningInfo("windSpeed", stationData.data.windSpeed);
    const uvWarning = getWarningInfo("uvIndex", stationData.data.uvIndex);
    const rainWarning = getWarningInfo(
      "precipitation",
      stationData.data.precipitation
    );
    const hourRainWarning = getWarningInfo(
      "precipitation",
      stationData.pastHourPrecip
    );

    return (
      <TableRow
        className="hover:bg-secondary cursor-pointer h-14"
        onClick={() => navigate(`/${stationData.station.id}`)}
      >
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.station.name}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {formatDateString(stationData.data.recordedAt, "short")}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.temperature > 0 ? (
            <div className="flex items-center gap-1">
              <span>{`${stationData.data.temperature} ${weatherUnit(
                "temperature"
              )}`}</span>
            </div>
          ) : (
            "--"
          )}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.humidity > 0
            ? `${stationData.data.humidity} ${weatherUnit("humidity")}`
            : "--"}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.pressure > 0
            ? `${stationData.data.pressure} ${weatherUnit("pressure")}`
            : "--"}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700 p-2">
          {stationData.data.heatIndex > 0 ? (
            <div className="flex items-center p-0">
              {heatIndexWarning &&
              heatIndexWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(
                heatIndexWarning.color
              ) ? (
                <Badge
                  className={`w-full ${
                    heatIndexWarning.color === "red"
                      ? "bg-[#CC0001] font-bold hover:bg-[#FE0000]/80 text-white"
                      : heatIndexWarning.color === "orange"
                      ? "bg-[#FF6600] font-bold hover:bg-[#FF6600]/80 text-white"
                      : heatIndexWarning.color === "amber"
                      ? "bg-[#FFCC00] font-bold hover:bg-[#FFCC00]/80 text-black"
                      : heatIndexWarning.color === "yellow"
                      ? "bg-[#FFFF00] font-bold hover:bg-[#FFFF00]/80 text-black"
                      : ""
                  }`}
                >{`${stationData.data.heatIndex} ${weatherUnit(
                  "heatIndex"
                )}`}</Badge>
              ) : (
                <div className="w-full px-2.5 py-0.5">{`${
                  stationData.data.heatIndex
                } ${weatherUnit("heatIndex")}`}</div>
              )}
            </div>
          ) : (
            "--"
          )}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.windSpeed >= 0 &&
          stationData.data.windSpeed !== null ? (
            <div className="flex items-center gap-1">
              {windWarning &&
              windWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(
                windWarning.color
              ) ? (
                <Badge
                  className={`w-full ${
                    windWarning.color === "red"
                      ? "bg-[#FE0000] font-bold hover:bg-[#FE0000]/80 text-white"
                      : windWarning.color === "orange"
                      ? "bg-[#FFC000] font-bold hover:bg-[#FFC000]/80 text-black"
                      : windWarning.color === "amber"
                      ? "bg-[#FFFF00] font-bold hover:bg-[#FFFF00]/80 text-black"
                      : windWarning.color === "yellow"
                      ? "bg-[#00CCFF] font-bold hover:bg-[#00CCFF]/80 text-black"
                      : ""
                  }`}
                >{`${stationData.data.windSpeed} ${weatherUnit(
                  "windSpeed"
                )}`}</Badge>
              ) : (
                <div className="w-full px-2.5 py-0.5">{`${
                  stationData.data.windSpeed
                } ${weatherUnit("windSpeed")}`}</div>
              )}
            </div>
          ) : (
            "--"
          )}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {getWindDirectionLabel(stationData.data.windDirection)}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.uvIndex >= 0 &&
          stationData.data.uvIndex !== null ? (
            <div className="flex items-center gap-1">
              {uvWarning &&
              uvWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(uvWarning.color) ? (
                <Badge
                  className={`w-full text-center ${
                    uvWarning.color === "red"
                      ? "bg-[#9E47CC] font-bold hover:bg-[#9E47CC]/80 text-white"
                      : uvWarning.color === "orange"
                      ? "bg-[#F55023] font-bold hover:bg-[#F55023]/80 text-white"
                      : uvWarning.color === "amber"
                      ? "bg-[#FF9000] font-bold hover:bg-[#FF9000]/80 text-black"
                      : uvWarning.color === "yellow"
                      ? "bg-[#FFBC01] font-bold hover:bg-[#FFBC01]/80 text-black"
                      : ""
                  }`}
                >
                  <span className="w-full">{`${stationData.data.uvIndex} 
                `}</span>
                </Badge>
              ) : (
                <div className="w-full px-2.5 py-0.5 text-center">{`${stationData.data.uvIndex}`}</div>
              )}
            </div>
          ) : (
            "--"
          )}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.light >= 0 && stationData.data.light !== null
            ? `${stationData.data.light} ${weatherUnit("light")}`
            : "--"}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.data.precipitation >= 0 &&
          stationData.data.precipitation !== null ? (
            <div className="flex items-center gap-1">
              {rainWarning &&
              rainWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(
                rainWarning.color
              ) ? (
                <Badge
                  className={`w-full text-center ${
                    rainWarning.color === "red"
                      ? "bg-[#FF0000] font-bold hover:bg-[#FF0000]/80 text-white"
                      : rainWarning.color === "orange"
                      ? "bg-[#FFA500] font-bold hover:bg-[#FFA500]/80 text-black"
                      : rainWarning.color === "amber"
                      ? "bg-[#FFFF00] font-bold hover:bg-[#FFFF00]/80 text-black"
                      : ""
                  }`}
                >
                  <span className="w-full">
                    {stationData.data.precipitation}{" "}
                    {weatherUnit("precipitation")}
                  </span>
                </Badge>
              ) : (
                <div className="w-full px-2.5 py-0.5 text-center">
                  {stationData.data.precipitation}{" "}
                  {weatherUnit("precipitation")}
                </div>
              )}
            </div>
          ) : (
            "--"
          )}
        </TableCell>

        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.pastHourPrecip >= 0 &&
          stationData.pastHourPrecip !== null ? (
            <div className="flex items-center gap-1">
              {hourRainWarning &&
              hourRainWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(
                hourRainWarning.color
              ) ? (
                <Badge
                  className={`w-full text-center ${
                    hourRainWarning.color === "red"
                      ? "bg-[#FF0000] font-bold hover:bg-[#FF0000]/80 text-white"
                      : hourRainWarning.color === "orange"
                      ? "bg-[#FFA500] font-bold hover:bg-[#FFA500]/80 text-black"
                      : hourRainWarning.color === "amber"
                      ? "bg-[#FFFF00] font-bold hover:bg-[#FFFF00]/80 text-black"
                      : ""
                  }`}
                >
                  <span className="w-full">
                    {stationData.pastHourPrecip} {weatherUnit("precipitation")}
                    /hr
                  </span>
                </Badge>
              ) : (
                <div className="w-full px-2.5 py-0.5 text-center">
                  {stationData.pastHourPrecip} {weatherUnit("precipitation")}/hr
                </div>
              )}
            </div>
          ) : (
            "--"
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        {stationData.station.name}
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --{" "}
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --{" "}
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        --
      </TableCell>
    </TableRow>
  );
};

export default WeatherDataTable;
