import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TableGraphCardType } from "@/types/queryTypes";
import PuffLoader from "react-spinners/PuffLoader";
import { useGetDataset } from "@/hooks/react-query/queries";
import { formattedDataType } from "@/types";
import { formatDateString } from "@/lib/utils";

const chartConfig = {
  desktop: {
    label: "average",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const VariableDashboardGraph = ({
  stationId,
  weatherData,
  range,
  repeat,
  type,
  showDots = false,
}: TableGraphCardType) => {
  const stationDataParams: TableGraphCardType = {
    type,
    stationId,
    weatherData,
    range,
    repeat,
  };
  const {
    data: graphData,
    isError,
    isLoading,
  } = useGetDataset(stationDataParams);

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

  const getFormattedDataset = (
    graphData: formattedDataType[]
  ): formattedDataType[] => {
    return graphData.map((item) => {
      const formattedDate = new Date(item.datetime).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const datetimeWithAt = formattedDate.replace(",", " at");
      return {
        ...item,
        datetime: datetimeWithAt,
      };
    });
  };

  const updatedData = getFormattedDataset(graphData);

  return (
    <div className="w-full rounded-lg p-1 border-[#545454] m-0 flex items-center justify-center">
      <ChartContainer config={chartConfig} className="h-52 w-full m-0 p-0">
        {weatherData === "precipitation" || weatherData === "uvIndex" ? (
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
              dataKey="datetime"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
            />
            <YAxis />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Bar dataKey="data" fill={"#fbd008"} />
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
              dataKey="datetime"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
            />
            <YAxis />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="data"
              type="linear"
              stroke="#fbd008"
              strokeWidth={3}
              dot={showDots}
            />
          </LineChart>
        )}
      </ChartContainer>
    </div>
  );
};

export default VariableDashboardGraph;
