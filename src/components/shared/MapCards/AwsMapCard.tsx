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
import NoData from "@/components/shared/NoData";

interface MapCardProps {
  data: awsDashboardType | null;
}

const AwsMapCard: React.FC<MapCardProps> = ({ data }) => {
  if (!data || !data.data) {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <NoData />
      </div>
    );
  }

  return (
    <div>
      <div className="p-2">
        <Card className="">
          <CardDescription className="p-2 text-xs md:text-sm">
            Current weather data recorded as of{" "}
            {formatDateString(data.data.recordedAt, "long")}
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
                        <p className="tooltipContentDiv">
                          The measurement of warmth or coldness in the
                          atmosphere. Temperature is typically measured in
                          degrees Celsius or Fahrenheit.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-medium text-4xl md:text-7xl text-center">
                  {Math.round(data.data.temperature * 100) / 100}
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
                              <p className="tooltipContentDiv">
                                How hot it actually feels when humidity is
                                factored into the air temperature. This combines
                                temperature and moisture in the air to reflect
                                the “real feel.”
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {Math.round(data.data.heatIndex * 100) / 100} °C
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
                              <p className="tooltipContentDiv">
                                The amount of moisture in the air. Higher
                                humidity means more moisture, making it feel
                                warmer and stickier. Low humidity can make the
                                air feel drier.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {Math.round(data.data.humidity * 100) / 100} %
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
                              <p className="tooltipContentDiv">
                                Any form of water, like rain, drizzle, snow, or
                                hail, that falls from clouds. Precipitation
                                levels tell us how much water is coming from the
                                sky, which helps predict wet weather, storms, or
                                dry days.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.data.precipitation * 100) / 100} mm/hr
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
                              <p className="tooltipContentDiv">
                                The force exerted by the air around us. High
                                pressure usually brings clear, stable weather,
                                while low pressure often signals rain, storms,
                                or changing conditions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold">
                        {data.data.pressure} mb
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
                              <p className="tooltipContentDiv">
                                The strength of sunlight at a specific time.
                                High light intensity means bright, strong
                                sunlight, which affects temperature and
                                visibility.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.data.light * 100) / 100} lux
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
                              <p className="tooltipContentDiv">
                                The direction from which the wind is blowing.
                                This information helps predict weather changes,
                                as different wind directions bring different
                                types of weather.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.data.windDirection * 100) / 100}{" "}
                        {getWindDirectionLabel(data.data.windDirection)}
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
                              <p className="tooltipContentDiv">
                                How fast the wind is blowing. Calm winds mean
                                light breezes, while high speeds indicate strong
                                winds or even storm conditions
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="font-bold text-sm">
                        {Math.round(data.data.windSpeed * 100) / 100} km/h
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

export default AwsMapCard;
