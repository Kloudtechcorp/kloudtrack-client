import React, { useEffect } from "react";

import NoData from "@/components/shared/NoData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetAwsData2 } from "@/hooks/react-query/queries";
import { Card, CardContent } from "@/components/ui/card";
import PuffLoader from "react-spinners/PuffLoader";
import {
  formatDateString,
  getWindDirectionLabel,
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
    return (
      <TableRow
        className="hover:bg-secondary cursor-pointer"
        onClick={() => navigate(`/${stationData.station.id}`)}
      >
        <TableCell>{stationData.station.name}</TableCell>
        <TableCell>
          {stationData.station.barangay}, {stationData.station.municipality}
        </TableCell>
        <TableCell>
          {formatDateString(stationData.data.recordedAt, "long")}
        </TableCell>
        <TableCell>
          {stationData.data.temperature > 0
            ? `${stationData.data.temperature} ${weatherUnit("temperature")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.humidity > 0
            ? `${stationData.data.humidity} ${weatherUnit("humidity")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.pressure > 0
            ? `${stationData.data.pressure} ${weatherUnit("pressure")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.heatIndex > 0
            ? `${stationData.data.heatIndex} ${weatherUnit("heatIndex")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.windSpeed > 0
            ? `${stationData.data.windSpeed} ${weatherUnit("windSpeed")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {getWindDirectionLabel(stationData.data.windDirection)}
        </TableCell>
        <TableCell>
          {stationData.data.uvIndex ? stationData.data.uvIndex : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.light > 0
            ? `${stationData.data.light} ${weatherUnit("light")}`
            : "N/A"}
        </TableCell>
        <TableCell>
          {stationData.data.precipitation === null
            ? "N/A"
            : `${stationData.data.precipitation} ${weatherUnit(
                "precipitation"
              )}`}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{stationData.station.name}</TableCell>
      <TableCell>
        {stationData.station.barangay}, {stationData.station.municipality}
      </TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A </TableCell>
      <TableCell>N/A </TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell>
    </TableRow>
  );
};

export default AwsTable;
