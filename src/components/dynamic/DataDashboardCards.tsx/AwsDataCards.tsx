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
import { useGetAwsData } from "@/hooks/react-query/queries";
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

type AwsDataCardProps = {
  stationName: string;
};

const AwsDataCard = ({ stationName }: AwsDataCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { data: stationData, isError, isLoading } = useGetAwsData(stationName);

  if (isError || !stationData?.currentweather)
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
              {formatDateString(stationData.currentweather.recordedAt, "long")}
            </div>
            <DataCards
              currentweather={stationData.currentweather}
              stationName={stationName}
            />
          </div>
        )}

        {/* <div className="p-2 overflow-y-auto custom-scrollbar w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="text-center border px-2 py-1 dark:bg-slate-800 text-lg font-bold dark:text-white rounded"
                  colSpan={2}
                >
                  Weather Stations
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stationNames.map((station, index) => (
                <TableRow
                  key={index}
                  className={`hover-row h-7 ${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-500"
                  }`}
                >
                  <TableCell className="text-center ">
                    {station.stationName}
                  </TableCell>
                  <TableCell className="text-center ">
                    {returnActive(station.isActive)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
      </div>

      <div className="flex flex-col w-full gap-2">
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
      </div>
    </div>
  );
};

export default AwsDataCard;
