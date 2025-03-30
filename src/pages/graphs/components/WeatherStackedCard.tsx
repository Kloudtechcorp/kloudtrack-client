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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import PuffLoader from "react-spinners/PuffLoader";
import { useGetStackedGraphData } from "@/hooks/queries/useStations";
import { StackedGraph } from "@/types/station.type";

const WeatherStackedCard: React.FC<{ id: string[] }> = ({ id }) => {
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

  const stationDataParams = useMemo<StackedGraph>(
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

  const handleWeatherDataChange = (value: string) => {
    setIsRefetching(true);
    setWeatherData(value);
  };

  const handleRangeDataChange = (value: string) => {
    setIsRefetching(true);
    setRangeData(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isRefetching) {
        await refetch();
        setIsRefetching(false);
      }
    };
    fetchData();
  }, [refetch, isRefetching]);

  const updatedData = useMemo(
    () => (graphData ? getFormattedDataset(graphData) : []),
    [graphData]
  );

  const chartConfig = useMemo(() => {
    if (updatedData.length === 0) return {} as ChartConfig;

    const colors = Array.from(
      { length: 10 },
      (_, i) => `hsl(var(--chart-${i + 1}))`
    );

    return Object.fromEntries(
      Object.keys(updatedData[0])
        .filter((key) => key !== "recorded")
        .map((key, index) => [
          key,
          {
            label: addSpacesToPascalCase(key),
            color: colors[index % colors.length],
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
                            <Bar
                              key={key}
                              dataKey={key}
                              fill={getRandomColor()}
                            />
                          );
                        })}
                      <ChartLegend content={<ChartLegendContent />} />
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
                      <ChartLegend
                        content={<ChartLegendContent />}
                        align="center"
                        wrapperStyle={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          maxWidth: "100%",
                        }}
                      />
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

export default WeatherStackedCard;
