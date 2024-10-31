import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import DataCards from "@/components/shared/DataCards";
import { useGetAwsData } from "@/hooks/react-query/queries";
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
  const { data: stationData, isError, isLoading } = useGetAwsData(stationId);

  if (isError || !stationData?.data)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <NotFound />
      </div>
    );
  if (isLoading || !stationData)
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <PuffLoader color={"#545454"} size={500} />
          </div>
        </CardContent>
      </Card>
    );

  return (
    <div className="flex lg:flex-row flex-col w-full gap-2">
      <div className="flex flex-col w-full lg:w-2/3 px-2 gap-2">
        {!stationData ? (
          <p className="font-bold">There is no station data.</p>
        ) : (
          <div className="w-full gap-2 flex flex-col">
            <div className=" px-3 text-xs md:text-sm border lg:text-base">
              Current Weather as of{" "}
              {formatDateString(stationData.data.recordedAt, "long")}
            </div>
            <DataCards
              currentweather={stationData.data}
              type={"DATADASHBOARD"}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full justify-start border px-3">
          <span className="w-full font-bold">Weather Data Graphs</span>
          <WeatherDialog name={stationData.station.name} id={stationId} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
          <div
            className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
            onClick={() =>
              navigate(`/${stationData.station.name}/data-analysis`, {
                state: { variable: "heatIndex" },
              })
            }
          >
            <div className="px-2 font-semibold">Heat Index</div>
            <VariableGraph
              stationId={stationId}
              weatherData={"heatIndex"}
              repeat={"hour"}
              range={24}
              key={1}
            />
          </div>
          <div
            className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
            onClick={() =>
              navigate(`/${stationData.station.name}/data-analysis`, {
                state: { variable: "temperature" },
              })
            }
          >
            <div className="px-2 font-semibold">Temperature</div>
            <VariableGraph
              stationId={stationId}
              weatherData={"temperature"}
              range={24}
              repeat={"hour"}
              key={1}
            />
          </div>
          <div
            className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
            onClick={() =>
              navigate(`/${stationData.station.name}/data-analysis`, {
                state: { variable: "humidity" },
              })
            }
          >
            <div className="px-2 font-semibold">Humidity</div>
            <VariableGraph
              stationId={stationId}
              weatherData={"humidity"}
              range={24}
              key={1}
              repeat={"hour"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwsDataCard;
