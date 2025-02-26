import React, { useEffect } from "react";
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

interface AwsCardProps {
  id: string;
}

const AwsTable: React.FC<AwsCardProps> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetAwsData2(id);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  useEffect(() => {
    if (stationData?.data) {
      const { data } = stationData;
      const heatIndexWarning = getWarningInfo(
        "heatIndex",
        stationData.data.heatIndex
      );
      const windWarning = getWarningInfo(
        "windSpeed",
        stationData.data.windSpeed
      );
      const uvWarning = getWarningInfo("uvIndex", stationData.data.uvIndex);
      const hourRainWarning = getWarningInfo(
        "precipitation",
        stationData.pastHourPrecip
      );

      if (data.windSpeed >= WARNING_THRESHOLDS.windSpeed.high) {
        toast(
          <div className="flex flex-col">
            <span>Strong Winds Alert at {stationData.station.name}</span>
            <span
              className={`
${windWarning.color === "red" ? "text-red-500 font-bold" : ""}
${windWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
${windWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
            >
              {data.windSpeed}
              {weatherUnit("windSpeed")}
            </span>
          </div>,
          {
            position: "top-right",
            duration: 10000,
          }
        );
      }

      if (data.uvIndex >= WARNING_THRESHOLDS.uvIndex.high) {
        toast(
          <div className="flex flex-col">
            <span>High UV Index Alert at {stationData.station.name}</span>
            <span
              className={`
${uvWarning.color === "red" ? "text-red-500 font-bold" : ""}
${uvWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
${uvWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
            >
              {data.uvIndex}
              {weatherUnit("uvIndex")}
            </span>
          </div>,
          {
            position: "top-right",
            duration: 10000,
          }
        );
      }

      if (data.heatIndex >= WARNING_THRESHOLDS.heatIndex.high) {
        toast(
          <div className="flex flex-col">
            <span>Dangerous Heat Index at {stationData.station.name}</span>
            <span
              className={`
${heatIndexWarning.color === "red" ? "text-red-500 font-bold" : ""}
${heatIndexWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
${heatIndexWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
            >
              {data.heatIndex}
              {weatherUnit("heatIndex")}
            </span>
          </div>,
          {
            position: "top-right",
            duration: 10000,
          }
        );
      }

      if (stationData.pastHourPrecip >= WARNING_THRESHOLDS.precipitation.high) {
        toast(
          <div className="flex flex-col">
            <span>Heavy Rainfall Warning at {stationData.station.name}</span>
            <span
              className={`
${hourRainWarning.color === "red" ? "text-red-500 font-bold" : ""}
${hourRainWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
${hourRainWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
            >
              {stationData.pastHourPrecip}
              {weatherUnit("precipitation")}/hr
            </span>
          </div>,
          {
            position: "top-right",
            duration: 10000,
          }
        );
      }
    }
  }, [stationData]);

  if (isLoading || !stationData) {
    return (
      <TableRow className="hover:bg-secondary cursor-pointer">
        <TableCell>Loading ...</TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow className="hover:bg-secondary cursor-pointer">
        <TableCell>Error</TableCell>
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
        className="hover:bg-secondary cursor-pointer"
        onClick={() => navigate(`/${stationData.station.id}`)}
      >
        <TableCell>{stationData.station.name}</TableCell>
        <TableCell>
          {formatDateString(stationData.data.recordedAt, "short")}
        </TableCell>
        <TableCell>
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
        <TableCell>
          {stationData.data.humidity > 0
            ? `${stationData.data.humidity} ${weatherUnit("humidity")}`
            : "--"}
        </TableCell>
        <TableCell>
          {stationData.data.pressure > 0
            ? `${stationData.data.pressure} ${weatherUnit("pressure")}`
            : "--"}
        </TableCell>
        <TableCell>
          {stationData.data.heatIndex > 0 ? (
            <div className="flex items-center gap-1">
              {heatIndexWarning &&
              heatIndexWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(
                heatIndexWarning.color
              ) ? (
                <Badge
                  className={`w-full ${
                    heatIndexWarning.color === "red"
                      ? "bg-red-500 font-bold"
                      : heatIndexWarning.color === "amber"
                      ? "bg-amber-500 font-bold"
                      : heatIndexWarning.color === "orange"
                      ? "bg-orange-600 font-bold"
                      : heatIndexWarning.color === "yellow"
                      ? "bg-yellow-500 font-bold"
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
        <TableCell>
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
                      ? "bg-red-500 font-bold"
                      : windWarning.color === "amber"
                      ? "bg-amber-500 font-bold"
                      : windWarning.color === "orange"
                      ? "bg-orange-600 font-bold"
                      : windWarning.color === "yellow"
                      ? "bg-yellow-500 font-bold"
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
        <TableCell>
          {getWindDirectionLabel(stationData.data.windDirection)}
        </TableCell>
        <TableCell>
          {stationData.data.uvIndex >= 0 &&
          stationData.data.uvIndex !== null ? (
            <div className="flex items-center gap-1">
              {uvWarning &&
              uvWarning.color &&
              ["red", "amber", "orange", "yellow"].includes(uvWarning.color) ? (
                <Badge
                  className={`w-full text-center ${
                    uvWarning.color === "red"
                      ? "bg-red-500 font-bold"
                      : uvWarning.color === "amber"
                      ? "bg-amber-500 font-bold"
                      : uvWarning.color === "orange"
                      ? "bg-orange-600 font-bold"
                      : uvWarning.color === "yellow"
                      ? "bg-yellow-500 font-bold"
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
        <TableCell>
          {stationData.data.light >= 0 && stationData.data.light !== null
            ? `${stationData.data.light} ${weatherUnit("light")}`
            : "--"}
        </TableCell>
        <TableCell>
          {stationData.data.precipitation === null ? (
            "--"
          ) : (
            <div className="flex items-center gap-1">
              <span
                className={`
  ${rainWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${rainWarning.color === "amber" ? "text-amber-500 font-bold" : ""}
  ${rainWarning.color === "orange" ? "text-orange-600 font-bold" : ""}
  ${rainWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}

`}
              >{`${stationData.data.precipitation} ${weatherUnit(
                "precipitation"
              )}`}</span>
            </div>
          )}
        </TableCell>
        <TableCell>
          {stationData.pastHourPrecip === null ? (
            "--"
          ) : (
            <div className="flex items-center gap-1">
              <span
                className={`
  ${hourRainWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${hourRainWarning.color === "amber" ? "text-amber-500 font-bold" : ""}
  ${hourRainWarning.color === "orange" ? "text-orange-600 font-bold" : ""}
  ${hourRainWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
              >{`${stationData.pastHourPrecip} ${weatherUnit(
                "precipitation"
              )}`}</span>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{stationData.station.name}</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
      <TableCell>-- </TableCell>
      <TableCell>-- </TableCell>
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
    </TableRow>
  );
};

export default AwsTable;
