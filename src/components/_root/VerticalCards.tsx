import React from "react";
import { Card, CardContent } from "../ui/card";
import { useGetAnalysis } from "@/hooks/react-query/queries";
import { analysisType, TableGraphCardType } from "@/types/queryTypes";
import { Skeleton } from "../ui/skeleton";
import { formatDateStringGraph, weatherUnit } from "@/lib/utils";

const VerticalCards = ({
  stationId,
  weatherData,
  type,
  repeat,
}: analysisType) => {
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetAnalysis({
    type,
    stationId,
    weatherData,
    repeat,
  });

  const renderSkeletons = () => (
    <>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="w-full h-full aspect-square text-center flex flex-col px-0 gap-1"
        >
          <Skeleton className="w-full h-7" />
          <Skeleton className="h-[11rem] w-full" />
        </div>
      ))}
    </>
  );

  const renderCard = (title: string, value: number | null, time?: string) => {
    return (
      <Card className="w-full md:h-[11rem]">
        <CardContent className="text-center flex flex-col h-full w-full px-0">
          <div className="cardTitleDiv">
            <span className="weatherDataTitle">{title}</span>
          </div>
          <div className="cardDataDiv ">
            <div className="flex flex-col gap-2">
              <span className="weatherDataText">
                {weatherData !== "uvIndex"
                  ? value
                  : value?.toString().slice(0, 1)}{" "}
                {weatherUnit(weatherData)}
              </span>
              <span>{time && <span> {time}</span>}</span>
            </div>
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
    <div className="flex md:flex-col gap-3 md:w-[20%] flex-wrap">
      {renderCard("Current", stationData.currentData)}
      {renderCard("Past 1-minute", stationData.past1minute)}
      {renderCard(
        "Highest today",
        +stationData.max,
        formatDateStringGraph(stationData.maxTime)
      )}
      {renderCard(
        "Lowest today",
        +stationData.min,
        formatDateStringGraph(stationData.minTime)
      )}
    </div>
  );
};

export default VerticalCards;
