import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import DataCards from "@/components/shared/DataCards";
import { useGetAwsData2 } from "@/hooks/react-query/queries";
import { formatDateString } from "@/lib/utils";
import VariableGraph from "@/components/dynamic/VariableGraph";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/shared/NotFound";
import WeatherDialog from "@/components/dynamic/DownloadCards/WeatherDialog";

type AwsDataCardProps = {
  stationId: number;
};

const AwsDataCard = ({ stationId }: AwsDataCardProps) => {
  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetAwsData2(stationId);

  if (isError || !stationData?.data) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <NotFound />
      </div>
    );
  }

  if (isLoading) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <PuffLoader color={"#545454"} size={500} />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { station, data } = stationData;
  const formattedDate = formatDateString(data.recordedAt, "long");

  const weatherVariables = [
    { label: "Heat Index", variable: "heatIndex" },
    { label: "Temperature", variable: "temperature" },
    { label: "Humidity", variable: "humidity" },
  ];

  return (
    <div className="flex lg:flex-row flex-col w-full gap-2">
      <div className="flex flex-col w-full lg:w-2/3 px-2 gap-2">
        <div className="w-full gap-2 flex flex-col">
          <div className="font-medium text-xs md:text-sm lg:text-base ">
            Current Weather as of {formattedDate}
          </div>
          <DataCards
            currentweather={data}
            type={"DATADASHBOARD"}
            stationName={station.name}
            pastHourPrecip={stationData.pastHourPrecip}
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full">
          <span className="font-medium w-full">Weather Data Graphs</span>
          <WeatherDialog name={station.name} id={stationId} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
          {weatherVariables.map(({ label, variable }) => (
            <div
              key={variable}
              className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
              onClick={() =>
                navigate(`/${station.name}/data-analysis`, {
                  state: { variable },
                })
              }
            >
              <div className="px-2 font-semibold">{label}</div>
              <VariableGraph
                stationId={stationId}
                weatherData={variable}
                range={24}
                repeat="hour"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwsDataCard;
