import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  checkAS5600,
  checkBH1750,
  checkBME280,
  checkRTC,
  checkSlave,
  checkUV,
  NO_VALUE_BADGE,
} from "@/lib/helper";
import { useGetStationList } from "@/hooks/react-query/queries";
import HashLoader from "react-spinners/HashLoader";
import PuffLoader from "react-spinners/PuffLoader";
import React from "react";

const StationList = () => {
  const { data: stationList, isLoading, isError } = useGetStationList();
  console.log(stationList);

  if (isLoading || !stationList) {
    return (
      <div className="w-full h-full flex justify-center items-center relative">
        <HashLoader
          color={"#fbd008"}
          size={150}
          className="absolute top-0 left-[15.5rem] z-50"
        />
        <PuffLoader
          color={"#545454"}
          size={500}
          className="absolute top-0 left-[-10rem]"
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading station list.</div>;
  }

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Stations List</CardTitle>
        <CardDescription>
          This list shows the status of every station and its sensors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto min-w-[1440px]">
          <TableHeader className="h-10">
            <TableRow className="text-center dark:text-white">
              {[
                "Station Name",
                "Latitude & Longitude",
                "Location",
                "Serial",
                "BME280-1",
                "BME280-2",
                "BME280-3",
                "BH1750",
                "AS5600",
                "SLAVE",
                "RTC",
                "UV",
              ].map((header, index) => (
                <TableHead
                  key={index}
                  className={`text-center p-0 dark:text-white ${
                    index === 0
                      ? "w-[100px]"
                      : index === 1
                      ? "w-[200px]"
                      : index === 2
                      ? "w-[250px]"
                      : index === 3
                      ? "w-[300px]"
                      : "w-24"
                  }`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            ) : (
              stationList.map((station, index) => (
                <TableRow className="bg-accent h-10" key={index}>
                  <TableCell className="text-center p-0">
                    {station.stationName} ({station.stationType.typeName})
                  </TableCell>
                  <TableCell className="text-center p-0">{`${station.latitude}, ${station.longitude}`}</TableCell>
                  <TableCell className="text-center p-0">{`${station.barangay.barangay}, ${station.municipality.municipality}, ${station.province.province}`}</TableCell>
                  <TableCell className="text-center p-0">
                    {station.serial}
                  </TableCell>
                  {station.currentweather?.length
                    ? station.currentweather.map((weather, idx) => (
                        <React.Fragment key={idx}>
                          <TableCell>
                            {checkBME280(weather.T1, weather.H1, weather.P1)}
                          </TableCell>
                          <TableCell>
                            {checkBME280(weather.T2, weather.H2, weather.P2)}
                          </TableCell>
                          <TableCell>
                            {checkBME280(weather.T3, weather.H3, weather.P3)}
                          </TableCell>
                          <TableCell>{checkBH1750(weather.light)}</TableCell>
                          <TableCell>
                            {checkAS5600(weather.windDirection)}
                          </TableCell>
                          <TableCell>
                            {checkSlave(
                              weather.windSpeed,
                              weather.precipitation,
                              weather.gust
                            )}
                          </TableCell>
                          <TableCell>{checkRTC(weather.recordedAt)}</TableCell>
                          <TableCell>{checkUV(weather.uvIntensity)}</TableCell>
                        </React.Fragment>
                      ))
                    : Array.from({ length: 8 }).map((_, idx) => (
                        <TableCell key={idx}>{NO_VALUE_BADGE}</TableCell>
                      ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StationList;
