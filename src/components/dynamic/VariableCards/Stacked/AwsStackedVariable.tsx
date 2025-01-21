import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { addSpacesToPascalCase } from "@/lib/utils";
import RangeRepeatSelector from "@/components/shared/SelectRangeRepeat";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  useGetDataset,
  useGetStackedGraphData,
} from "@/hooks/react-query/queries";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { DynamicDatasetType } from "@/types/queryTypes";
import PuffLoader from "react-spinners/PuffLoader";
import { formattedDataType } from "@/types";

const chartConfig = {
  desktop: {
    label: "average",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface GraphData {
  recorded: string;
  [key: string]: number | string;
}

const AwsStackedVariable: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState<string>(
    () => localStorage.getItem("weatherData") || "temperature"
  );
  const [repeatData, setRepeatData] = useState<string>(
    () => localStorage.getItem("weatherRepeat") || "hour"
  );
  const [rangeData, setRangeData] = useState<string>(
    () => localStorage.getItem("weatherRange") || "24"
  );

  useEffect(() => {
    localStorage.setItem("weatherData", weatherData);
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("weatherRepeat", repeatData);
  }, [repeatData]);

  useEffect(() => {
    localStorage.setItem("weatherRange", rangeData);
  }, [rangeData]);

  const stationDataParams: DynamicDatasetType = {
    type: "aws",
    stationIds: id,
    weatherData: weatherData,
    range: +rangeData,
    repeat: repeatData,
  };

  const {
    data: graphData,
    isError,
    isLoading,
  } = useGetStackedGraphData(stationDataParams);

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (isLoading || !graphData) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <PuffLoader />
      </div>
    );
  }

  const getFormattedDataset = (graphData: GraphData[]): GraphData[] => {
    return graphData.map((item) => {
      const formattedDate = new Date(item.recorded).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        ...(repeatData !== "day" && { hour: "2-digit", minute: "2-digit" }),
        hour12: false,
      });
      const datetimeWithAt = formattedDate.replace(",", " at");
      return {
        ...item,
        recorded: datetimeWithAt,
      };
    });
  };

  const updatedData = getFormattedDataset(graphData);

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary flex flex-col overflow-hidden">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex flex-row justify-between items-center ">
              <span className="text-3xl font-bold px-4 capitalize">
                {addSpacesToPascalCase(weatherData)}
              </span>
              <div className="flex gap-1">
                <div className="flex flex-col justify-center items-center px-1">
                  <span className="text-sm px-1">Parameter Option</span>
                  <span className="text-3xl font-bold">
                    <Select
                      defaultValue={weatherData}
                      onValueChange={(value) => setWeatherData(value)}
                    >
                      <SelectTrigger className="selectTrigger">
                        <SelectValue placeholder="Variable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heatIndex">Heat Index</SelectItem>
                        <SelectItem value="temperature">Temperature</SelectItem>
                        <SelectItem value="humidity">Humidity</SelectItem>
                        <SelectItem value="pressure">Air Pressure</SelectItem>
                        <SelectItem value="windSpeed">Wind Speed</SelectItem>
                        <SelectItem value="uvIndex">UV Index</SelectItem>
                        <SelectItem value="light">Light Intensity</SelectItem>
                        <SelectItem value="precipitation">
                          Precipitation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row">
                  <RangeRepeatSelector
                    repeatData={repeatData}
                    setRepeatData={setRepeatData}
                    rangeData={rangeData}
                    setRangeData={setRangeData}
                  />
                </div>
              </div>
            </div>

            <div className="tableGraphCard">
              <ChartContainer
                config={chartConfig}
                className="h-full w-full m-0 p-0"
              >
                {weatherData === "precipitation" ||
                weatherData === "uvIndex" ? (
                  <BarChart
                    accessibilityLayer
                    data={updatedData}
                    margin={{
                      left: 2,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="recorded"
                      tickLine={true}
                      axisLine={true}
                      tickMargin={10}
                    />
                    <YAxis />
                    <ChartTooltip
                      cursor={true}
                      content={<ChartTooltipContent />}
                    />
                    {Object.keys(updatedData[0])
                      .filter((key) => key !== "recorded")
                      .map((key) => (
                        <Bar key={key} dataKey={key} fill="#fbd008" />
                      ))}
                  </BarChart>
                ) : (
                  <LineChart
                    accessibilityLayer
                    data={updatedData}
                    margin={{
                      left: 2,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="recorded"
                      tickLine={true}
                      axisLine={true}
                      tickMargin={10}
                    />
                    <YAxis />
                    <ChartTooltip
                      cursor={true}
                      content={<ChartTooltipContent />}
                    />
                    {Object.keys(updatedData[0])
                      .filter((key) => key !== "recorded")
                      .map((key) => (
                        <Line
                          key={key}
                          dataKey={key}
                          type="linear"
                          stroke="#fbd008"
                          isAnimationActive={true}
                          animateNewValues={true}
                          animationEasing={"ease-in-out"}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      ))}
                  </LineChart>
                )}
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AwsStackedVariable;
