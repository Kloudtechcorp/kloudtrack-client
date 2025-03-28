import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGetClmsData } from "@/hooks/react-query/queries";
import { formatDateString } from "@/lib/utils";
import VariableGraph from "@/pages/graphs/components/CustomChart";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/pages/error/NotFound";
import CoastalDialog from "./CoastalDownloadDialog";

type CoastalDataCardProps = {
  stationId: string;
};

const CoastalDataCard = ({ stationId }: CoastalDataCardProps) => {
  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetClmsData(stationId);

  if (isError || !stationData?.data) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <NotFound />
      </div>
    );
  }

  if (isLoading || !stationData) {
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

  const metrics = [
    { label: "Distance", value: data.distance, unit: "cm" },
    { label: "Humidity", value: data.humidity, unit: "%" },
    { label: "Temperature", value: data.temperature, unit: "°C" },
    { label: "Air Pressure", value: data.pressure, unit: "mb" },
  ];

  const weatherVariables = [
    { label: "Heat Index", variable: "distance" },
    { label: "Temperature", variable: "temperature" },
    { label: "Humidity", variable: "humidity" },
  ];

  return (
    <div className="flex lg:flex-row flex-col w-full gap-2">
      <div className="flex flex-col w-full lg:w-2/3 px-2 gap-2">
        <div className="w-full gap-2 flex flex-col">
          <span className="currentWeatherText">
            Current Weather as of {formattedDate}
          </span>
          {metrics.map(({ label, value, unit }) => (
            <Card key={label} className="h-[10.25rem]">
              <CardContent className="px-0 p-0 h-full">
                <div className="text-center w-full flex flex-col h-full">
                  <div className="cardTitleDiv">
                    <span className="weatherDataTitle">{label}</span>
                  </div>
                  <div className="cardDataDiv">
                    <span className="weatherDataText">
                      {Math.round(value * 100) / 100} {unit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-2 px-2">
        <div className="flex w-full items-center ">
          <span className="weatherDataGraphs">Weather Data Graphs</span>
          <CoastalDialog name={station.name} id={stationId} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
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
                range={12}
                repeat="hour"
                type={"clms"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoastalDataCard;
