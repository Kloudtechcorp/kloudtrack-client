import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetAwsData } from "@/hooks/react-query/queries";
import { useStationContext } from "@/hooks/context/stationContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { stationStaticType } from "@/types";
import PuffLoader from "react-spinners/PuffLoader";
import NotFound from "@/components/shared/NotFound";
import AwsDataCard from "@/components/dynamic/DataDashboardCards.tsx/AwsDataCards";
import ArgDataCard from "@/components/dynamic/DataDashboardCards.tsx/ArgDataCard";
import RlmsDataCard from "@/components/dynamic/DataDashboardCards.tsx/RlmsDataCard";

const DataDashboard = () => {
  const { station } = useParams<string>();
  const { stationNames } = useStationContext();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetAwsData(!station ? "" : station);

  if (!station) {
    return <div>No station found</div>;
  }
  const filteredStations = stationNames.find(
    (stationItem: stationStaticType) => stationItem.stationName === station
  );

  if (isError)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <NotFound />
      </div>
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

  return (
    <div className="w-full bg-[#F6F8FC] dark:bg-secondary rounded-xl p-[1rem] custom-scrollbar overflow-auto">
      <div className="container p-1 shadow-lg">
        <Card className="cardContainer">
          <CardContent className="flex flex-col p-0 gap-2">
            <div className="w-full flex justify-start flex-row gap-3">
              <div className="p-1">
                <img src="/assets/img/logo-v1.png" className="size-14" />
              </div>
              <div className="flex flex-col justify-center items-start dark:invert">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <span
                      className="text-sm xs:text-lg md:text-xl xl:text-3xl font-bold self-start p-0 hover:text-[#fbd008] dark:invert dark:hover:text-blue-500 ease-in-out duration-300 hover:scale-125 cursor-pointer"
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
                  <span>{`${filteredStations.barangay.barangay}, ${filteredStations.municipality.municipality}, ${filteredStations.province.province}`}</span>
                </span>
              </div>
            </div>

            {(filteredStations.stationType.typeName === "AWS" && (
              <AwsDataCard stationName={filteredStations.stationName} />
            )) ||
              (filteredStations.stationType.typeName === "ARG" && (
                <ArgDataCard stationName={filteredStations.stationName} />
              )) ||
              (filteredStations.stationType.typeName === "RLMS" && (
                <RlmsDataCard stationName={filteredStations.stationName} />
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataDashboard;
