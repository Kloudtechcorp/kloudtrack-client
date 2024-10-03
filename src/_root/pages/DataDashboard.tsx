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
import { useGetStationData } from "@/hooks/react-query/queries";
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

const DataDashboard = () => {
  const { station } = useParams<string>();
  const { stationNames } = useStationContext();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetStationData(!station ? "" : station);

  if (!station) {
    return <div>No station found</div>;
  }

  const filteredStations = stationNames.find(
    (stationItem: stationStaticType) => stationItem.stationName === station
  );

  if (isLoading || !stationData || !filteredStations)
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <PuffLoader color={"#545454"} size={500} />
          </div>
        </CardContent>
      </Card>
    );

  if (isError)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <img src="/assets/icons/error.svg" className="size-14" />
        <span>Error fetching data.</span>
      </div>
    );

  return (
    <div className="w-full bg-[#F6F8FC] dark:bg-secondary rounded-xl p-[1rem] custom-scrollbar overflow-auto">
      <div className="container p-1">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0">
            <div className="w-full flex justify-start flex-row gap-3">
              <div className="p-1">
                <img src="/assets/img/logo-v1.png" className="size-14" />
              </div>
              <div className="flex flex-col justify-center items-start dark:invert">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <span
                      className="text-sm xs:text-lg m2d:text-xl xl:text-2xl font-bold self-start p-0 hover:text-[#fbd008] dark:invert dark:hover:text-blue-500 ease-in-out duration-300 hover:scale-110 hover:underline cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      {station}
                    </span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                      <DialogTitle>Choose station to navigate</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto custom-scrollbar">
                      {stationNames.map((stations, key) => (
                        <Button
                          key={key}
                          className="bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800"
                          onClick={() => {
                            navigate(`/${stations.stationName}`);
                            setIsOpen(false);
                          }}
                        >
                          {stations.stationName}
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                <span className="text-xs md:text-sm lg:text-base dark:invert">
                  {filteredStations.longitude} , {filteredStations.latitude}
                </span>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-2">
              <div className="flex flex-col w-full px-2 gap-2">
                {!stationData.currentweather ? (
                  <p className="font-bold">There is no station data.</p>
                ) : (
                  <div className="w-full gap-2 flex flex-col">
                    <div className=" px-3 text-xs md:text-sm border lg:text-base">
                      Current Weather as of{" "}
                      {formatDateString(stationData.currentweather.recordedAt)}
                    </div>
                    <DataCards currentweather={stationData.currentweather} />
                  </div>
                )}

                <div className="p-2 overflow-y-auto custom-scrollbar h-56 w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          className="text-center border px-2 py-1 bg-[#FBD008] dark:bg-slate-800 text-lg font-bold dark:text-white rounded"
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
                          className={`hover-row h-11 ${
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
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <div className="flex w-full justify-start border px-3">
                  <span className="w-full font-bold">Weather Data Graphs</span>
                  <DialogDownload name={filteredStations.stationName} />
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto cursor-pointer">
                  <div
                    className="flex flex-col gap-1 border p-1 rounded-lg"
                    onClick={() =>
                      navigate(`/${station}/data-analysis`, {
                        state: { variable: "heatIndex" },
                      })
                    }
                  >
                    <div className="px-2 font-semibold">Heat Index</div>
                    <VariableGraph
                      stationName={station}
                      weatherData={"heatIndex"}
                      repeat={"hour"}
                      range={12}
                      key={1}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-1 border p-1 rounded-lg"
                    onClick={() =>
                      navigate(`/${station}/data-analysis`, {
                        state: { variable: "temperature" },
                      })
                    }
                  >
                    <div className="px-2 font-semibold">Temperature</div>
                    <VariableGraph
                      stationName={station}
                      weatherData={"temperature"}
                      range={12}
                      repeat={"hour"}
                      key={1}
                    />
                  </div>
                  <div
                    className="flex flex-col gap-1 border p-1 rounded-lg"
                    onClick={() =>
                      navigate(`/${station}/data-analysis`, {
                        state: { variable: "humidity" },
                      })
                    }
                  >
                    <div className="px-2 font-semibold">Humidity</div>
                    <VariableGraph
                      stationName={station}
                      weatherData={"humidity"}
                      range={12}
                      key={1}
                      repeat={"hour"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataDashboard;
