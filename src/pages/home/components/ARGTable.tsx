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
    return (
      <TableRow
        className="hover:bg-secondary cursor-pointer h-14"
        onClick={() => navigate(`/${stationData.station.id}`)}
      >
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.station.name}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {stationData.station.barangay}, {stationData.station.municipality}
        </TableCell>
        <TableCell className="border border-stone-200 dark:border-stone-700">
          {formatDateString(stationData.data.recordedAt, "long")}
        </TableCell>

        <TableCell className="border border-stone-200 dark:border-stone-700">
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
      <TableCell className="border border-stone-200 dark:border-stone-700">
        {stationData.station.name}
      </TableCell>
      <TableCell className="border border-stone-200 dark:border-stone-700">
        {stationData.station.barangay}, {stationData.station.municipality}
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

export default ArgTable;
