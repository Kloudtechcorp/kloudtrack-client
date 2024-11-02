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

interface MapCardProps {
  data: argDashboardType | null;
}

const ArgMapCard: React.FC<MapCardProps> = ({ data }) => {
  if (!data || !data.raingaugedata) {
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
            {formatDateString(data.raingaugedata.recordedAt, "long")}
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
                <span className="font-medium text-4xl md:text-7xl text-center">
                  {Math.round(data.raingaugedata.precipitation * 100) / 100}
                  <span className="text-3xl md:text-5xl">mm</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArgMapCard;
