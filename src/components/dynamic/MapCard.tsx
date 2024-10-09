import React from "react";
import { formatDateString, getWindDirectionLabel } from "@/lib/utils";
import { awsDashboardType } from "@/types/queryTypes";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface MapCardProps {
  data: awsDashboardType;
}

const MapCard: React.FC<MapCardProps> = ({ data }) => {
  return (
    <div>
      <div className="p-2">
        <Card className="">
          <CardDescription className="p-2 text-xs md:text-sm">
            Current weather data recorded as of{" "}
            {formatDateString(data.currentweather.recordedAt, "long")}
          </CardDescription>
          <CardContent>
            <div className="">
              <div className="flex justify-center flex-col">
                <div className="flex justify-center">
                  <span className="font-medium text-sm sm:text-base md:text-2xl">
                    Temperature
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          src="/assets/icons/help.svg"
                          width={15}
                          className="dark:invert hidden md:block"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Temperature is ...</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium text-4xl md:text-7xl text-center">
                  {Math.round(data.currentweather.heatIndex * 100) / 100}
                  <span className="text-3xl md:text-5xl">°C</span>
                </span>
              </div>

              <div className="p-2 mt-4 flex border rounded-xl">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/heatIndex.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span className="">Heat Index</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Heat Index is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {Math.round(data.currentweather.heatIndex * 100) / 100}{" "}
                        °C
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/humidity.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Humidity</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Humidity is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {Math.round(data.currentweather.humidity * 100) / 100} %
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/precip.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Precipitation</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Precipitation is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.currentweather.precipitation * 100) /
                          100}{" "}
                        mm/hr
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/airPressure.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Air Pressure</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Air Pressure is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {data.currentweather.pressure} mb
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/lightIntensity.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Light Intensity</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Light Intensity is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.currentweather.light * 100) / 100} lux
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/windDirection.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Wind Direction</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Wind Direction is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.currentweather.windDirection * 100) /
                          100}{" "}
                        {getWindDirectionLabel(
                          data.currentweather.windDirection
                        )}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="font-medium w-[12.5%]">
                        <img
                          src="/assets/icons/windSpeed.svg"
                          width={25}
                          className="dark:invert hidden md:block"
                        />
                      </TableCell>
                      <TableCell className="font-medium flex gap-1 items-center">
                        <span>Wind Speed</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Wind Speed is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.currentweather.windSpeed * 100) / 100}{" "}
                        km/h
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapCard;
