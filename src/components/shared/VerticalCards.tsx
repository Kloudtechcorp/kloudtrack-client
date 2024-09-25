import React from "react";
import { Card, CardContent } from "../ui/card";
import { useGetTableGraphData } from "@/hooks/react-query/queries";
import { TableGraphCardType } from "@/types/queryTypes";
import { Skeleton } from "../ui/skeleton";

const VerticalCards = ({
  stationName,
  weatherData,
  range,
  repeat,
}: TableGraphCardType) => {
  const stationDataParams: TableGraphCardType = {
    stationName,
    weatherData,
    range,
    repeat,
  };
  const {
    data: stationData,
    isError,
    isLoading: isTableLoading,
  } = useGetTableGraphData(stationDataParams);

  if (isTableLoading || !stationData) {
    return (
      <div className="flex flex-col gap-3 w-[20%]">
        <div className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1">
          <Skeleton className="w-full h-7 border" />
          <Skeleton className="h-52 w-full" />
        </div>
        <div className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1">
          <Skeleton className="w-full h-7 border" />
          <Skeleton className="h-52 w-full" />
        </div>
        <div className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1">
          <Skeleton className="w-full h-7 border" />
          <Skeleton className="h-52 w-full" />
        </div>
        <div className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1">
          <Skeleton className="w-full h-7 border" />
          <Skeleton className="h-52 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col gap-3 w-[20%]">
      <Card className="w-full h-full aspect-square">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <span className="w-full h-7 border border-transparent border-b-gray-300">
            Current
          </span>
          <div className="h-full flex items-center justify-center">
            <span className="text-5xl font-bold ">
              {stationData.currentData.current}°C
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <span className="w-full h-7 border border-transparent border-b-gray-300">
            Past 1-minute°C
          </span>
          <div className="h-full flex items-center justify-center">
            <span className="text-5xl font-bold ">
              {stationData.currentData.past1min}°C
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <span className="w-full h-7 border border-transparent border-b-gray-300">
            Highest (Past 24-hours)
          </span>
          <div className="h-full flex items-center justify-center">
            <span className="text-5xl font-bold ">{stationData.max}°C </span>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <span className="w-full h-7 border border-transparent border-b-gray-300">
            Lowest (Past 24-hours)
          </span>
          <div className="h-full flex items-center justify-center">
            <span className="text-5xl font-bold ">{stationData.min}°C</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerticalCards;
