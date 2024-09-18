// src/pages/DataDashboard.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { chartData1, chartData2, chartData3 } from "@/lib/objects/dummy";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChartComponent from "@/components/graphs/chartComponent";
import { WeatherDataProps } from "@/lib/types";
import { locationArray } from "@/lib/objects/arrays";
import StationSelect from "@/components/test/stationSelect";

const DataDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentData: initialData } = location.state || {};
  const [currentData, setCurrentData] = useState<WeatherDataProps | undefined>(
    initialData
  );

  const handleStationChange = (stationName: string) => {
    const selectedStation = locationArray.find(
      (station) => station.name === stationName
    );
    if (selectedStation) {
      setCurrentData(selectedStation);
      navigate(`/dashboard/${stationName}`);
    }
  };

  const handleStationClick = (station: WeatherDataProps) => {
    setCurrentData(station);
    navigate(`/dashboard/${station.name}`, { state: { currentData: station } });
  };

  const getWindDirectionLabel = (value: number) => {
    const direction = value === undefined ? 0 : value;
    if (direction === 0 || direction === 360) {
      return "N";
    } else if (direction > 0 && direction < 90) {
      return "NE";
    } else if (direction === 90) {
      return "E";
    } else if (direction > 90 && direction < 180) {
      return "SE";
    } else if (direction === 180) {
      return "S";
    } else if (direction > 180 && direction < 270) {
      return "SW";
    } else if (direction === 270) {
      return "W";
    } else if (direction > 270 && direction < 360) {
      return "NW";
    } else {
      return `${direction}`;
    }
  };

  const cardsData = [
    { title: "Temperature", value: currentData?.temp ?? 0, unit: " °C" },
    { title: "Heat Index", value: currentData?.heatIndex ?? 0, unit: " °C" },
    { title: "Humidity", value: currentData?.humidity ?? 0, unit: " %" },
    { title: "Precipitation", value: currentData?.precip ?? 0, unit: " mm/hr" },
    { title: "UV Index", value: currentData?.uvIndex ?? 0, unit: "" },
    { title: "Irradiance", value: currentData?.irradiance ?? 0, unit: " W/m²" },
    {
      title: "Air Pressure",
      value: currentData?.airPressure ?? 0,
      unit: " mb",
    },
    { title: "Gust", value: currentData?.gust ?? 0, unit: " kph" },
    {
      title: "10 min Wind Averages",
      value: currentData?.windSpeed ?? 0,
      unit: " kph",
      value2: currentData?.windDirection ?? 0,
      unit2: " °N",
    },
  ];

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950 overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0">
            <div className="w-full flex justify-start flex-row gap-3 ">
              <div className="p-1">
                <img src="/assets/img/logo-v1.png" className="size-14" />
              </div>
              <div className="flex flex-col py-1">
                <span className="text-3xl font-bold">
                  <StationSelect
                    currentData={currentData}
                    onValueChange={handleStationChange}
                  />
                </span>
                <span className="text-sm">
                  {currentData?.coordinates[0]} , {currentData?.coordinates[1]}
                </span>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col w-full h-[calc(100vh-14rem)]">
              <div className="flex flex-col min-w-[46%]">
                <div className="flex w-full px-2 py-1 justify-between items-center ">
                  <span className="font-bold text-xl">
                    Current Weather Conditions
                  </span>
                  <Button
                    variant="link"
                    className="font-semibold text-sm underline"
                  >
                    Download Data
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-3 w-full gap-3 px-2 py-1 justify-center h-full">
                    {cardsData.map((data, key) => (
                      <Card key={key} className="h-36">
                        <CardContent className="px-0 p-0 h-full">
                          <div className="text-center w-full flex flex-col h-full">
                            <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                              <span className="font-bold xl:text-base lg:text-sm md:text-xs flex justify-center px-2 h-8 items-center">
                                {data.title}
                              </span>
                            </div>
                            {key !== 8 ? (
                              <div className="text-xl flex h-full items-center justify-center">
                                <span className="w-full xl:text-3xl lg:text-xl md:text-base sm:text-sm ">
                                  {data.value ?? 0}
                                  {data.unit}
                                </span>
                              </div>
                            ) : (
                              <div className="flex py-5 justify-center items-center overflow-hidden">
                                <div
                                  className="compass"
                                  style={
                                    {
                                      "--compass-size": "4rem",
                                    } as React.CSSProperties
                                  }
                                >
                                  <div className="direction">
                                    <p>
                                      {getWindDirectionLabel(data.value2 ?? 0)}
                                      <span>{data.value ?? 0} kph</span>
                                    </p>
                                  </div>
                                  <div
                                    className={`arrow ${getWindDirectionLabel(
                                      data.value2 ?? 0
                                    )}`}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="px-2 overflow-y-auto h-36">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead
                            className="text-center border px-2 py-1 bg-yellow-200 dark:bg-slate-800 text-lg font-bold   dark:text-white rounded"
                            colSpan={2}
                          >
                            Weather Stations
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {locationArray.map((station, index) => (
                          <TableRow
                            key={station.stationId}
                            className={`hover-row ${
                              index % 2 === 0
                                ? "bg-gray-100 dark:bg-gray-700"
                                : "bg-white dark:bg-gray-500"
                            }`}
                          >
                            <TableCell>
                              <Button
                                variant="link"
                                onClick={() => handleStationClick(station)}
                                className="dark:invert "
                              >
                                {station.name}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center">
                              {station.status}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full px-6">
                <div className="flex w-full py-1 justify-between items-center">
                  <span className="font-bold text-xl">
                    Current Weather Conditions
                  </span>
                  <Button
                    variant="link"
                    className="font-semibold text-sm underline"
                    onClick={() => {
                      if (currentData) {
                        navigate(`/dashboard/${currentData.name}/graphs`, {
                          state: { stationData: currentData },
                        });
                      }
                    }}
                  >
                    See more...
                  </Button>
                </div>
                <div className="h-full">
                  <ChartComponent
                    title="Temperature"
                    data={chartData1}
                    xKey="name"
                    lineKeys={["highest", "lowest"]}
                  />
                  <ChartComponent
                    title="Humidity"
                    data={chartData2}
                    xKey="name"
                    lineKeys={["highest", "lowest"]}
                  />
                  <ChartComponent
                    title="Wind Speed"
                    data={chartData3}
                    xKey="name"
                    lineKeys={["highest", "lowest"]}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataDashboard;
