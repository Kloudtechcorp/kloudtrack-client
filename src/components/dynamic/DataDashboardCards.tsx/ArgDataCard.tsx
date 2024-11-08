import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useGetArgData } from "@/hooks/react-query/queries";
import { formatDateString } from "@/lib/utils";
import VariableGraph from "@/components/dynamic/VariableGraph";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/shared/NotFound";
import RainGaugeDialog from "../DownloadCards/RainGaugeDialog";

type ArgDataCardProps = {
  stationId: number;
};

const ArgDataCard = ({ stationId }: ArgDataCardProps) => {
  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetArgData(stationId);

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
  const precipitation = Math.round(data.precipitation * 100) / 100;

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col w-full px-2 gap-2">
        <div className="w-full gap-2 flex flex-col">
          <div className="px-3 text-xs md:text-sm border lg:text-base">
            Current Weather as of {formattedDate}
          </div>

          <Card className="h-72">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                    Precipitation
                  </span>
                </div>
                <div className="text-xl flex h-full items-center justify-center">
                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                    {precipitation} mm
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full justify-start border px-3">
          <span className="w-full font-bold">Weather Data Graphs</span>
          <RainGaugeDialog name={station.name} id={stationId} />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
          <div
            className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900 pr-5"
            onClick={() => navigate(`/${station.name}/data-analysis`)}
          >
            <div className="px-2 font-semibold">Precipitation</div>
            <VariableGraph
              stationId={stationId}
              weatherData="precipitation"
              repeat="hour"
              range={12}
              type={"arg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgDataCard;
