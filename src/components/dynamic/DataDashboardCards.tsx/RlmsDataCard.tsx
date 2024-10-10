import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DataCards from "@/components/shared/DataCards";
import {
  useGetArgData,
  useGetAwsData,
  useGetRlmsData,
} from "@/hooks/react-query/queries";
import { useStationContext } from "@/hooks/context/stationContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateString, returnActive } from "@/lib/utils";
import VariableGraph from "@/components/dynamic/VariableGraph";
import { useState } from "react";
import { stationStaticType } from "@/types";
import DialogDownload from "@/components/shared/DialogDownload";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/shared/NotFound";

type RlmsDataCardProps = {
  stationName: string;
};

const RlmsDataCard = ({ stationName }: RlmsDataCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetRlmsData(stationName);

  if (isError || !stationData?.riverleveldata)
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
      <div className="flex flex-col w-full px-2 gap-2">
        {!stationData ? (
          <p className="font-bold">There is no station data.</p>
        ) : (
          <div className="w-full gap-2 flex flex-col">
            <div className=" px-3 text-xs md:text-sm border lg:text-base">
              Current Weather as of{" "}
              {formatDateString(stationData.riverleveldata.recordedAt, "long")}
            </div>
            <Card className="h-96">
              <CardContent className="px-0 p-0 h-full">
                <div className="text-center w-full flex flex-col h-full">
                  <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
                    <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                      Precipitation
                    </span>
                  </div>
                  <div className="text-xl flex h-full items-center justify-center">
                    <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                      {Math.round(stationData.riverleveldata.distance * 100) /
                        100}{" "}
                      cm;
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>{" "}
          </div>
        )}
      </div>

      {/* <div className="flex flex-col w-full gap-2">
          <div className="flex w-full justify-start border px-3">
            <span className="w-full font-bold">Weather Data Graphs</span>
            <DialogDownload name={stationName} />
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
            <div
              className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
              onClick={() =>
                navigate(`/${stationName}/data-analysis`, {
                  state: { variable: "heatIndex" },
                })
              }
            >
              <div className="px-2 font-semibold">Heat Index</div>
              <VariableGraph
                stationName={stationName}
                weatherData={"heatIndex"}
                repeat={"hour"}
                range={12}
                key={1}
              />
            </div>
            <div
              className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
              onClick={() =>
                navigate(`/${stationName}/data-analysis`, {
                  state: { variable: "temperature" },
                })
              }
            >
              <div className="px-2 font-semibold">Temperature</div>
              <VariableGraph
                stationName={stationName}
                weatherData={"temperature"}
                range={12}
                repeat={"hour"}
                key={1}
              />
            </div>
            <div
              className="flex flex-col gap-1 border p-1 rounded-lg hover:bg-yellow-100/25 dark:hover:bg-gray-900"
              onClick={() =>
                navigate(`/${stationName}/data-analysis`, {
                  state: { variable: "humidity" },
                })
              }
            >
              <div className="px-2 font-semibold">Humidity</div>
              <VariableGraph
                stationName={stationName}
                weatherData={"humidity"}
                range={12}
                key={1}
                repeat={"hour"}
              />
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default RlmsDataCard;
