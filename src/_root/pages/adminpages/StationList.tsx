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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { stationsListType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
const server = import.meta.env.VITE_SERVER_LOCAL || "http://localhost:8000";

const StationList = () => {
  const [stationList, setStationList] = useState<stationsListType[] | []>([]);
  useEffect(() => {
    const fetchStationList = async () => {
      try {
        const response = await fetch(`${server}/admin/all/stations`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const regions: stationsListType[] = data.stations;
        setStationList(regions);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchStationList();
    const interval = setInterval(() => {
      console.log("hello world");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkBME280 = (temp: number, humid: number, press: number) => {
    if (temp === null || !humid === null || !press === null) {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    } else if (temp === 0 || humid === 0 || press === 0) {
      return (
        <Badge className="text-xs w-full justify-center" variant="outline">
          No Value
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  const checkBH1750 = (light: number) => {
    if (light === null) {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    } else if (light === 0) {
      return (
        <Badge className="text-xs w-full justify-center" variant="outline">
          No Value
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  const checkAS5600 = (windDirection: number) => {
    if (windDirection === null) {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    } else if (windDirection === 0) {
      return (
        <Badge className="text-xs w-full justify-center" variant="outline">
          No Value
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  const checkRTC = (recordedAt: string) => {
    if (recordedAt === "2000-01-01T10:10:10.000Z") {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  const checkUV = (uv: number) => {
    if (uv === null) {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    } else if (uv === 0) {
      return (
        <Badge className="text-xs w-full justify-center" variant="outline">
          No Value
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  const checkSlave = (windSpeed: number, rain: number, gust: number) => {
    if (windSpeed === null || !rain === null || !gust === null) {
      return (
        <Badge className="text-xs w-full justify-center" variant="destructive">
          Failed
        </Badge>
      );
    } else if (windSpeed === 0 || rain === 0 || gust === 0) {
      return (
        <Badge className="text-xs w-full justify-center" variant="outline">
          No Value
        </Badge>
      );
    }
    return (
      <Badge
        className="text-xs w-full justify-center bg-blue-500"
        variant="default"
      >
        Working
      </Badge>
    );
  };

  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Stations List</CardTitle>
          <CardDescription>
            This list will show the status of every stations and its sensors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="overflow-x-auto min-w-[1440px]">
            <TableHeader className="h-10">
              <TableRow className="text-center">
                <TableHead className="w-[100px] text-center p-0">
                  Station Name
                </TableHead>
                <TableHead className="w-[200px] text-center p-0">
                  Latitude & Longitude
                </TableHead>
                <TableHead className="w-[250px] text-center p-0">
                  Location
                </TableHead>
                <TableHead className="w-[300px] text-center p-0">
                  Serial
                </TableHead>
                <TableHead className="w-24 text-center p-0">BME280-1</TableHead>
                <TableHead className="w-24 text-center p-0">BME280-2</TableHead>
                <TableHead className="w-24 text-center p-0">BME280-3</TableHead>
                <TableHead className="w-24 text-center p-0">BH1750</TableHead>
                <TableHead className="w-24 text-center p-0">AS5600</TableHead>
                <TableHead className="w-24 text-center p-0">SLAVE</TableHead>
                <TableHead className="w-24 text-center p-0">RTC</TableHead>
                <TableHead className="w-24 text-center p-0">UV</TableHead>
              </TableRow>
            </TableHeader>

            {!stationList ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[100px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ) : (
              <TableBody>
                {stationList.map((station, key) => (
                  <TableRow className="bg-accent h-10" key={key}>
                    <TableCell className="text-center p-0">
                      {station.stationName}
                    </TableCell>
                    <TableCell className="text-center p-0">
                      {station.latitude}
                      {", "}
                      {station.longitude}
                    </TableCell>
                    <TableCell className="text-center p-0">
                      {station.barangay.barangay}
                      {", "}
                      {station.municipality.municipality}
                      {", "}
                      {station.province.province}
                    </TableCell>
                    <TableCell className="text-center p-0">
                      {station.serial}{" "}
                    </TableCell>

                    {!station.currentweather ? (
                      <>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="text-xs w-full justify-center"
                            variant="secondary"
                          >
                            No Value
                          </Badge>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        {station.currentweather.map((weather) => (
                          <>
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
                            <TableCell>
                              {checkRTC(weather.recordedAt)}
                            </TableCell>
                            <TableCell>
                              {checkUV(weather.uvIntensity)}
                            </TableCell>
                          </>
                        ))}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationList;
