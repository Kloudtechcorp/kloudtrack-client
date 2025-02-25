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
import { AlertTriangle } from "lucide-react";

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
          `High Temperature Alert: ${data.temperature}${weatherUnit(
            "temperature"
          )}`,
          {
            duration: 10000,
          }
        );
      }

      if (data.heatIndex >= WARNING_THRESHOLDS.heatIndex.high) {
        toast.warning(
          `Dangerous Heat Index: ${data.heatIndex}${weatherUnit("heatIndex")}`,
          {
            duration: 10000,
          }
        );
      }

      if (data.precipitation >= WARNING_THRESHOLDS.precipitation.high) {
        toast.warning(
          `Heavy Rainfall Warning: ${data.precipitation}${weatherUnit(
            "precipitation"
          )}`,
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

    return (
      <TableRow
        className="hover:bg-secondary cursor-pointer"
        onClick={() => navigate(`/${stationData.station.id}`)}
      >
        <TableCell>{stationData.station.name}</TableCell>
        <TableCell>
          {formatDateString(stationData.data.recordedAt, "long")}
        </TableCell>
        <TableCell>
          {stationData.data.temperature > 0 ? (
            <div className="flex items-center gap-1">
              <span>{`${stationData.data.temperature} ${weatherUnit(
                "temperature"
              )}`}</span>
              {tempWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={tempWarning.color}
                  className="animate-pulse"
                />
              )}
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
              <span>{`${stationData.data.heatIndex} ${weatherUnit(
                "heatIndex"
              )}`}</span>
              {heatIndexWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={heatIndexWarning.color}
                  className="animate-pulse"
                />
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
              <span>{`${stationData.data.windSpeed} ${weatherUnit(
                "windSpeed"
              )}`}</span>
              {windWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={windWarning.color}
                  className="animate-pulse"
                />
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
              <span>{stationData.data.uvIndex}</span>
              {uvWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={uvWarning.color}
                  className="animate-pulse"
                />
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
              <span>{`${stationData.data.precipitation} ${weatherUnit(
                "precipitation"
              )}`}</span>
              {rainWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={rainWarning.color}
                  className="animate-pulse"
                />
              )}
            </div>
          )}
        </TableCell>
        <TableCell>
          {stationData.pastHourPrecip === null ? (
            "--"
          ) : (
            <div className="flex items-center gap-1">
              <span>{`${stationData.pastHourPrecip} ${weatherUnit(
                "precipitation"
              )}`}</span>
              {rainWarning.level !== "none" && (
                <AlertTriangle
                  size={16}
                  color={rainWarning.color}
                  className="animate-pulse"
                />
              )}
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
