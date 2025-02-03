import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState, useMemo } from "react";
import { addSpacesToPascalCase, getFormattedDataset } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetStackedGraphData } from "@/hooks/react-query/queries";
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

const AwsStackedVariable: React.FC<{ id: string[] }> = ({ id }) => {
  const [weatherData, setWeatherData] = useState<string>(
    () => localStorage.getItem("weatherData") || "temperature"
  );

  const [rangeData, setRangeData] = useState<string>(
    () => localStorage.getItem("weatherRange") || "24"
  );

  const [isRefetching, setIsRefetching] = useState(false);

  useEffect(() => {
    localStorage.setItem("weatherData", weatherData);
  }, [weatherData]);

  useEffect(() => {
    localStorage.setItem("weatherRange", rangeData);
  }, [rangeData]);

  const stationDataParams = useMemo<DynamicDatasetType>(
    () => ({
      type: "aws",
      stationIds: id,
      weatherData: weatherData,
      range: +rangeData,
      repeat: "hour",
    }),
    [id, weatherData, rangeData]
  );

  const {
    data: graphData,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useGetStackedGraphData(stationDataParams);

  const handleWeatherDataChange = async (value: string) => {
    setIsRefetching(true);
    setWeatherData(value);
    await refetch();
    setIsRefetching(false);
  };

  const handleRangeDataChange = async (value: string) => {
    setIsRefetching(true);
    setRangeData(value);
    await refetch();
    setIsRefetching(false);
  };

  const updatedData = useMemo(
    () => (graphData ? getFormattedDataset(graphData) : []),
    [graphData]
  );

  const chartConfig = useMemo(() => {
    if (updatedData.length === 0) return {} as ChartConfig;
    return Object.fromEntries(
      Object.keys(updatedData[0])
        .filter((key) => key !== "recorded")
        .map((key) => [
          key,
          {
            label: addSpacesToPascalCase(key),
            color: `hsl(var(--chart-${Math.floor(Math.random() * 10) + 1}))`,
          },
        ])
    ) satisfies ChartConfig;
  }, [updatedData]);

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
                      value={weatherData}
                      onValueChange={handleWeatherDataChange}
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
                <div className="flex flex-col justify-center items-center px-1">
                  <span className="selectTitle">Data Range</span>
                  <span className="text-3xl font-bold">
                    <Select
                      value={rangeData}
                      onValueChange={handleRangeDataChange}
                    >
                      <SelectTrigger className="selectTrigger">
                        <SelectValue placeholder="Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">1 Day</SelectItem>
                        <SelectItem value="72">3 Days</SelectItem>
                        <SelectItem value="168">1 Week</SelectItem>
                        <SelectItem value="336">2 Weeks</SelectItem>
                        <SelectItem value="672">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </div>
              </div>
            </div>
            {isError ? (
              <div>Error fetching data...</div>
            ) : isLoading || isFetching || isRefetching ? (
              <div className="w-full flex justify-center items-center h-full">
                <PuffLoader />
              </div>
            ) : updatedData.length > 0 ? (
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
                        .map((key) => {
                          const getRandomColor = () => {
                            const letters = "0123456789ABCDEF";
                            let color = "#";
                            for (let i = 0; i < 6; i++) {
                              color += letters[Math.floor(Math.random() * 16)];
                            }
                            return color;
                          };

                          return (
                            <Line
                              key={key}
                              dataKey={key}
                              type="linear"
                              stroke={getRandomColor()}
                              isAnimationActive={true}
                              animateNewValues={true}
                              animationEasing={"ease-in-out"}
                              strokeWidth={1.5}
                              dot={false}
                            />
                          );
                        })}
                      <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                  )}
                </ChartContainer>
              </div>
            ) : (
              <div>No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AwsStackedVariable;
