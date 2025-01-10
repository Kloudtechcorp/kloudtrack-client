import React, { useEffect } from "react";

import NoData from "@/components/shared/NoData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetArgData, useGetAwsData2 } from "@/hooks/react-query/queries";
import { Card, CardContent } from "@/components/ui/card";
import PuffLoader from "react-spinners/PuffLoader";
import { getWindDirectionLabel, weatherUnit } from "@/lib/utils";
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
      <Card className="cardContainer flex flex-row">
        <CardContent className="puffLoaderCardContent">
          <div className="puffLoaderDiv ">
            <PuffLoader color={"#545454"} size={"100%"} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-3 gap-1 relative h-full items-center justify-center">
              <NoData />
            </div>
          </div>
        </CardContent>
      </Card>
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
          {Number(stationData.station.latitude).toFixed(5)},{" "}
          {Number(stationData.station.longitude).toFixed(5)}
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
      <TableCell>
        {Number(stationData.station.latitude).toFixed(5)},{" "}
        {Number(stationData.station.longitude).toFixed(5)}
      </TableCell>

      <TableCell>N/A</TableCell>
    </TableRow>
  );
};

export default ArgTable;
