import React, { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetArgData } from "@/hooks/react-query/queries";
import { formatDateString, weatherUnit } from "@/lib/utils";
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
          {stationData.data.precipitation >= 0
            ? `${stationData.data.precipitation} ${weatherUnit(
                "precipitation"
              )}`
            : "--"}
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
      <TableCell>--</TableCell>
      <TableCell>--</TableCell>
    </TableRow>
  );
};

export default ArgTable;
