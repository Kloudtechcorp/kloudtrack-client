import React from "react";
import { Card, CardContent } from "../ui/card";
import { useGetTableGraphData } from "@/hooks/react-query/queries";
import { TableGraphCardType } from "@/types/queryTypes";
import { Skeleton } from "../ui/skeleton";
import { weatherUnit } from "@/lib/utils";

const VerticalCards = ({
  stationId,
  weatherData,
  range,
  repeat,
  type,
}: TableGraphCardType) => {
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetTableGraphData({
    type,
    stationId,
    weatherData,
    range,
    repeat,
  });

  const renderSkeletons = () => (
    <>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1"
        >
          <Skeleton className="w-full h-7 border" />
          <Skeleton className="h-52 w-full" />
        </div>
      ))}
    </>
  );

  const renderCard = (title: string, value: number | null) => {
    return (
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <span className="w-full h-7 border border-transparent border-b-gray-300">
            {title}
          </span>
          <div className="h-full flex items-center justify-center">
            <span className="text-5xl font-bold">
              {weatherData !== "uvIndex"
                ? value
                : value?.toString().slice(0, 1)}{" "}
              <span className="text-3xl">{weatherUnit(weatherData)}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading || !stationData) {
    return (
      <div className="flex flex-col gap-3 w-[20%]">{renderSkeletons()}</div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col gap-3 w-[20%]">
      {renderCard("Current", stationData.currentData)}
      {renderCard("Past 1-minute", stationData.past1minute)}
      {renderCard("Highest (Past 24-hours)", stationData.max)}
      {renderCard("Lowest (Past 24-hours)", stationData.min)}
    </div>
  );
};

export default VerticalCards;
