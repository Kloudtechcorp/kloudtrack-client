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

      if (data.temperature >= WARNING_THRESHOLDS.temperature.high) {
        toast.warning(
          `High Temperature Alert at ${stationData.station.name}: ${
            data.temperature
          }${weatherUnit("temperature")}`,
          {
            duration: 10000,
          }
        );
      }

      if (data.heatIndex >= WARNING_THRESHOLDS.heatIndex.high) {
        toast.warning(
          `Dangerous Heat Index at ${stationData.station.name}: ${
            data.heatIndex
          }${weatherUnit("heatIndex")}`,
          {
            duration: 10000,
          }
        );
      }

      if (data.precipitation >= WARNING_THRESHOLDS.precipitation.high) {
        toast.warning(
          `Heavy Rainfall Warning at ${stationData.station.name}: ${
            data.precipitation
          }${weatherUnit("precipitation")}`,
          {
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
    const tempWarning = getWarningInfo(
      "temperature",
      stationData.data.temperature
    );
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
              <span
                className={`
  ${tempWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${tempWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
  ${tempWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
              >{`${stationData.data.temperature} ${weatherUnit(
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
              <span
                className={`
  ${heatIndexWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${heatIndexWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
  ${heatIndexWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
              >{`${stationData.data.heatIndex} ${weatherUnit(
                "heatIndex"
              )}`}</span>
            </div>
          ) : (
            "--"
          )}
        </TableCell>
        <TableCell>
          {stationData.data.windSpeed >= 0 &&
          stationData.data.windSpeed !== null ? (
            <div className="flex items-center gap-1">
              <span
                className={`
  ${windWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${windWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
  ${windWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
              >{`${stationData.data.windSpeed} ${weatherUnit(
                "windSpeed"
              )}`}</span>
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
              <span
                className={`
  ${uvWarning.color === "red" ? "text-red-500 font-bold" : ""}
  ${uvWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
  ${uvWarning.color === "yellow" ? "text-yellow-500 font-bold" : ""}
`}
              >
                {stationData.data.uvIndex}
              </span>
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
  ${rainWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
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
  ${hourRainWarning.color === "orange" ? "text-orange-500 font-bold" : ""}
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
