import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import DataCards from "@/components/shared/DataCards";
import { useGetAwsData2 } from "@/hooks/react-query/queries";
import { formatDateString } from "@/lib/utils";
import VariableGraph from "@/components/dynamic/VariableGraph";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/shared/NotFound";
import WeatherDialog from "@/components/dynamic/DownloadCards/WeatherDialog";
// import WeatherDialog2 from "@/components/dynamic/DownloadCards/WeatherDialog2";
import { useEffect } from "react";
import { toast } from "sonner";

type AwsDataCardProps = {
  stationId: string;
};

const AwsDataCard = ({ stationId }: AwsDataCardProps) => {
  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetAwsData2(stationId);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

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
    { label: "Pressure", variable: "pressure" },
    { label: "Precipitation", variable: "precipitation" },
    { label: "Wind Speed", variable: "windSpeed" },
    { label: "UV Index", variable: "uvIndex" },
    { label: "Light Index", variable: "light" },
  ];

  return (
    <div className="flex lg:flex-row flex-col w-full gap-2">
      <div className="flex flex-col w-full lg:w-2/3 px-2 gap-2">
        <div className="w-full gap-2 flex flex-col">
          <span className="currentWeatherText">
            Current Weather as of {formattedDate}
          </span>
          <DataCards
            currentweather={data}
            type={"DATADASHBOARD"}
            stationName={station.name}
            id={station.id}
            pastHourPrecip={stationData.pastHourPrecip}
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2 px-2">
        <div className="flex w-full items-center ">
          <span className="weatherDataGraphs">Weather Data Graphs</span>
          <WeatherDialog name={station.name} id={stationId} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer h-[53.5rem] custom-scrollbar">
          {weatherVariables.map(({ label, variable }) => (
            <div
              key={variable}
              className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() =>
                navigate(`/${station.id}/data-analysis`, {
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
                type={"aws"}
                showDots={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwsDataCard;
