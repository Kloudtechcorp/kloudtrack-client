import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  formatDateString,
  formatDateStringGraph,
  weatherUnit,
} from "@/lib/utils";
import NoData from "../../error/NoData";
import { LinearGraph } from "@/types/station.type";
import CustomChart from "../../../components/global/custom-ui/CustomChart";
import { useGetAnalysis } from "@/hooks/queries/useStations";

const DataVisuals = ({
  type,
  stationId,
  weatherData,
  range,
  repeat,
  showDots = false,
}: LinearGraph) => {
  const stationDataParams: LinearGraph = {
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
  } = useGetAnalysis(stationDataParams);

  if (isError) {
    return (
      <div className="w-full md:min-h-[16rem] min-h-[10rem] flex flex-row rounded-lg p-1 pr-3 gap-1">
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
      <div className="w-full md:min-h-[16rem] min-h-[10rem] flex flex-row rounded-lg p-1 pr-3 gap-1">
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
              <TableCell className="p-1 border-r-[1px] tableText">
                Station Name
              </TableCell>
              <TableCell className="tableText">
                {stationData.station.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Date Recorded
              </TableCell>
              <TableCell className="tableText">
                {formatDateString(
                  stationData.recordedAt.toLocaleString(),
                  "long"
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Current Record
              </TableCell>
              <TableCell className="tableText">
                {Math.round(stationData.currentData * 100) / 100}{" "}
                {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Location
              </TableCell>
              <TableCell className="tableText">
                {`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Highest (Today)
              </TableCell>
              <TableCell className="tableText">
                {stationData.max} {weatherUnit(weatherData)} (
                {formatDateStringGraph(stationData.maxTime)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Lowest (Today)
              </TableCell>
              <TableCell className="tableText">
                {stationData.min}
                {weatherUnit(weatherData)} (
                {formatDateStringGraph(stationData.minTime)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-1 border-r-[1px] tableText">
                Average (Today)
              </TableCell>
              <TableCell className="tableText">
                {stationData.average} {weatherUnit(weatherData)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="border rounded-lg w-full items-center lg:h-[17.5rem] grow p-1 flex  ">
        <CustomChart
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

export default DataVisuals;
