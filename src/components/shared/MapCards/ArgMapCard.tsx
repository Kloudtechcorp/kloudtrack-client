import React from "react";
import { formatDateString } from "@/lib/utils";
import { argDashboardType } from "@/types/queryTypes";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NoData from "../NoData";
import VariableGraph from "@/components/dynamic/VariableGraph";

interface MapCardProps {
  data: argDashboardType | null;
  id: number;
}

const ArgMapCard: React.FC<MapCardProps> = ({ data, id }) => {
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
            <div className="">
              <div className="flex justify-center flex-col">
                <div className="flex justify-center">
                  <span className="font-medium text-sm sm:text-base md:text-2xl">
                    Precipitation
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
                        <p>Precipitation is ...</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-col gap-5">
                  <span className="font-medium text-4xl md:text-7xl text-center">
                    {Math.round(data.data.precipitation * 100) / 100}
                    <span className="text-3xl md:text-5xl">mm</span>
                  </span>
                  <Card className="w-full h-full">
                    <CardContent className="px-0 p-0 h-full flex justify-center items-center">
                      <div className="text-center w-full flex flex-col h-full">
                        <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
                          <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                            Precipitation{" "}
                            <span className="text-sm">(last 15 minutes)</span>
                          </span>
                        </div>
                        <div className="text-xl flex h-full items-center justify-center pr-5 py-5 pl-0">
                          <VariableGraph
                            stationId={id}
                            weatherData={"precipitation"}
                            repeat={"minute"}
                            range={15}
                            key={1}
                          />
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

export default ArgMapCard;
