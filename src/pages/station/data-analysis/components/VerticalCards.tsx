import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAnalysis } from "@/hooks/queries/useStations";
import { formatDateStringGraph, weatherUnit } from "@/lib/utils";
import { AnalysisRequirements } from "@/types/station.type";

const VerticalCards = ({
  stationId,
  weatherData,
  type,
  repeat,
}: AnalysisRequirements) => {
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
