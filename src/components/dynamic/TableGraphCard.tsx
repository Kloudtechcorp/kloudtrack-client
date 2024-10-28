import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { formatDateString, weatherUnit } from "@/lib/utils";
import { useGetTableGraphData } from "@/hooks/react-query/queries";
import VariableGrapht from "./VariableGraph";
import { TableGraphCardType } from "@/types/queryTypes";
import React from "react";

const TableGraphCard = ({
  stationId,
  weatherData,
  range,
  repeat,
}: TableGraphCardType) => {
  const stationDataParams: TableGraphCardType = {
    stationId,
    weatherData,
    range,
    repeat,
  };
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetTableGraphData(stationDataParams);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading || !stationData) {
    return (
      <div className="w-full min-h-[16rem] flex flex-row rounded-lg p-1 pr-3 gap-1">
        <div className="w-1/3 flex flex-col gap-1">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <Skeleton className="w-full" />
      </div>
    );
  }
  return (
    <div className="w-full h-full border-b-2 flex flex-col md:flex-row pb-2 p-1 gap-1">
      <div className="grow w-full h-full md:w-1/2 rounded-lg p-1">
        <Table className="border border-[#545454]">
          <TableHeader>
            <TableRow className="bg-yellow-200 border border-[#545454]">
              <TableHead className="p-2 border border-[#545454] text-center">
                Information
              </TableHead>
              <TableHead className="p-2 border border-[#545454] text-center">
                Measurement
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Station Name
              </TableCell>
              <TableCell className="border border-[#545454]">
                {stationData.info.stationName}
              </TableCell>
            </TableRow>
            {stationData.info.currentweather.map((data, key) => (
              <React.Fragment key={key}>
                <TableRow>
                  <TableCell className="border border-[#545454] p-1">
                    Date Recorded
                  </TableCell>
                  <TableCell className="border border-[#545454]">
                    {formatDateString(data.recordedAt, "long")}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Current
              </TableCell>
              <TableCell className="border border-[#545454]">
                {Math.round(stationData.info.data[0] * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Location
              </TableCell>
              <TableCell className="border border-[#545454]">
                {`${stationData.info.barangay.barangay}, ${stationData.info.municipality.municipality}, ${stationData.info.province.province}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Highest (12-Hours)
              </TableCell>
              <TableCell className="border border-[#545454]">
                {Math.round(stationData.max * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Lowest (12-Hours)
              </TableCell>
              <TableCell className="border border-[#545454]">
                {Math.round(stationData.min * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-[#545454] p-1">
                Past (6-Hours)
              </TableCell>
              <TableCell className="border border-[#545454]">
                {Math.round(stationData.average * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-lg w-full h-full grow p-1 flex">
        <VariableGrapht
          stationId={stationId}
          range={range}
          weatherData={weatherData}
          repeat={repeat}
        />
      </div>
    </div>
  );
};

export default TableGraphCard;
