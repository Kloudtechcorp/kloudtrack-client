import React from "react";
import { formatDateString } from "@/lib/utils";
import { clmsDashboardType } from "@/types/queryTypes";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

interface MapCardProps {
  data: clmsDashboardType | null;
}

const ClmsDataCard: React.FC<MapCardProps> = ({ data }) => {
  if (!data || !data.data) {
    return (
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="items-center justify-center text-center flex flex-col gap-5">
          <span className="bg-gradient-to-b from-[#fbd008] to-bg-transparent  bg-clip-text text-[7.5rem] font-extrabold leading-none text-transparent">
            No Data Found
          </span>
          <h2 className="font-heading my-2 text-2xl font-bold">
            Data from this station is not available. We're sorry for
            inconvenience.
          </h2>
        </div>
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
            <div className="flex flex-col pb-3 gap-1 h-full">
              <div className="flex flex-col pb-3 gap-2 items-center justify-center h-full">
                <Card className="w-full h-44">
                  <CardContent className="px-0 p-0 h-full">
                    <div className="text-center w-full flex flex-col h-full">
                      <div className="weatherDataTextDiv">
                        <span className="weatherDataTitle">Distance</span>
                      </div>
                      <div className="text-xl flex h-full items-center justify-center">
                        <span className="weatherDataText">
                          {Math.round(data.data.distance * 100) / 100} cm
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-row gap-2 w-full h-full">
                  <Card className="w-full h-44">
                    <CardContent className="px-0 p-0 h-full">
                      <div className="text-center w-full flex flex-col h-full">
                        <div className="weatherDataTextDiv">
                          <span className="weatherDataTitle">Temperature</span>
                        </div>
                        <div className="text-xl flex h-full items-center justify-center">
                          <span className="weatherDataText">
                            {Math.round(data.data.temperature * 100) / 100}{" "}
                            C&deg;
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full h-44">
                    <CardContent className="px-0 p-0 h-full">
                      <div className="text-center w-full flex flex-col h-full">
                        <div className="weatherDataTextDiv">
                          <span className="weatherDataTitle">Air Pressure</span>
                        </div>
                        <div className="text-xl flex h-full items-center justify-center">
                          <span className="weatherDataText">
                            {Math.round(data.data.pressure * 100) / 100} mb
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full h-44">
                    <CardContent className="px-0 p-0 h-full">
                      <div className="text-center w-full flex flex-col h-full">
                        <div className="weatherDataTextDiv">
                          <span className="weatherDataTitle">Humidity</span>
                        </div>
                        <div className="text-xl flex h-full items-center justify-center">
                          <span className="weatherDataText">
                            {Math.round(data.data.humidity * 100) / 100} %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClmsDataCard;
