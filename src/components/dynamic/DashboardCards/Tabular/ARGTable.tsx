import React, { useEffect } from "react";

import NoData from "@/components/shared/NoData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetArgData, useGetAwsData2 } from "@/hooks/react-query/queries";
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

const ArgTable: React.FC<AwsCardProps> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetArgData(id);

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
    </TableRow>
  );
};

export default ArgTable;
