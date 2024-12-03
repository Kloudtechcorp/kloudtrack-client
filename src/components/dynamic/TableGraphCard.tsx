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
import VariableGrapht from "./VariableGraph";
import { TableGraphCardType, tablesType } from "@/types/queryTypes";
import { useGetTableGraphData } from "@/hooks/react-query/queries";
import NoData from "../shared/NoData";

const TableGraphCard = ({
  type,
  stationId,
  weatherData,
  range,
  repeat,
  showDots = false,
}: TableGraphCardType) => {
  const stationDataParams: tablesType = {
    type,
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
    return (
      <div className="w-full min-h-[16rem] flex flex-row rounded-lg p-1 pr-3 gap-1">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col pb-3 gap-1 relative h-full items-center justify-center">
            <NoData />
            <div className="w-full h-full border-b-2 p-2 gap-1  "></div>
          </div>
        </div>
      </div>
    );
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
      <div className="grow w-full h-full md:w-1/2  border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-center border-r-[1px] text-black dark:text-white font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs !h-12 ">
                Information
              </TableHead>
              <TableHead className="text-center text-black dark:text-white font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs !h-12  ">
                Measurement
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center ">
            <TableRow>
              <TableCell className="p-1 border-r-[1px]">Station Name</TableCell>
              <TableCell className="">{stationData.station.name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="p-1 border-r-[1px]">
                Date Recorded
              </TableCell>
              <TableCell className="">
                {formatDateString(stationData.recordedAt, "long")}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="p-1 border-r-[1px]">Current</TableCell>
              <TableCell className="">
                {Math.round(stationData.currentData * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px]">Location</TableCell>
              <TableCell className="">
                {`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px]">
                Highest (12-Hours)
              </TableCell>
              <TableCell className="">
                {Math.round(stationData.max * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px]">
                Lowest (12-Hours)
              </TableCell>
              <TableCell className="">
                {Math.round(stationData.min * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px]">
                Past (6-Hours)
              </TableCell>
              <TableCell className="">
                {Math.round(stationData.average * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-lg w-full items-center h-full grow p-1 flex">
        <VariableGrapht
          type={type}
          stationId={stationId}
          range={range}
          weatherData={weatherData}
          repeat={repeat}
          showDots={showDots}
        />
      </div>
    </div>
  );
};

export default TableGraphCard;
