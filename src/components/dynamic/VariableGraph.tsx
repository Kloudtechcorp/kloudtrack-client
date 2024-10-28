import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetHourlyDataset } from "@/hooks/react-query/queries";
import { TableGraphCardType } from "@/types/queryTypes";
import PuffLoader from "react-spinners/PuffLoader";
import { R } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";

const chartConfig = {
  desktop: {
    label: "average",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const VariableGraph = ({
  stationId,
  weatherData,
  range,
  repeat,
}: TableGraphCardType) => {
  const stationDataParams: TableGraphCardType = {
    stationId,
    weatherData,
    range,
    repeat,
  };
  const {
    data: graphData,
    isError,
    isLoading,
  } = useGetHourlyDataset(stationDataParams);

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

  const reversedGraphData = [...graphData].reverse();

  const sliceDetails = (change: string, value: any) => {
    if (change == "minute" || change == "hour") {
      return value.slice(11, 16);
    }
    return value.slice(0, 10);
  };

  return (
    <div className="w-full rounded-lg p-1 border-[#545454] m-0 flex items-center justify-center">
      <ChartContainer config={chartConfig} className="h-52 w-full m-0 p-0">
        <LineChart
          accessibilityLayer
          data={reversedGraphData}
          margin={{
            left: 2,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tickLine={true}
            axisLine={true}
            tickMargin={10}
            tickFormatter={(value) => sliceDetails(repeat, value)}
          />
          <YAxis />
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <Line
            dataKey="average"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default VariableGraph;
