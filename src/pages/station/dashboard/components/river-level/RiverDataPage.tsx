import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "@/lib/utils";
import VariableGraph from "@/pages/graphs/components/CustomChart";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/pages/error/NotFound";
import RiverLevelDialog from "./RiverDownloadDialog";
import { useGetRiverData } from "@/hooks/queries/useStations";

type RlmsDataCardProps = {
  stationId: string;
};

const RlmsDataCard = ({ stationId }: RlmsDataCardProps) => {
  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetRiverData(stationId);

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

  const metrics = [{ label: "Distance", value: data.distance, unit: "cm" }];

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex  w-full px-2 gap-2">
        <div className="w-full gap-2 flex flex-col">
          <span className="currentWeatherText">
            Current Weather as of {formattedDate}
          </span>
          {metrics.map(({ label, value, unit }) => (
            <Card key={label} className="h-72">
              <CardContent className="px-0 p-0 h-full">
                <div className="text-center w-full flex flex-col h-full">
                  <div className="cardTitleDiv">
                    <span className="weatherDataTitle">{label}</span>
                  </div>
                  <div className="text-xl flex h-full items-center justify-center">
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
          <RiverLevelDialog name={station.name} id={stationId} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
          <div
            className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() =>
              navigate(`/${station.id}/data-analysis`, {
                state: { variable: "distance" },
              })
            }
          >
            <div className="px-2 font-semibold">Distance</div>
            <VariableGraph
              stationId={stationId}
              weatherData={"distance"}
              repeat={"hour"}
              range={12}
              key={1}
              type={"rlms"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RlmsDataCard;
