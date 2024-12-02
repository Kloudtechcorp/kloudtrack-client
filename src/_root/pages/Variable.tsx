import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwsVariableCard from "@/components/dynamic/VariableCards/AwsVariableCard";
import ArgVariableCard from "@/components/dynamic/VariableCards/ArgVariableCard";
import ClmsVariableCard from "@/components/dynamic/VariableCards/ClmsVariableCard";
import RlmsVariableCard from "@/components/dynamic/VariableCards/RlmsVariableCard";
import { useRef } from "react";
import { Fullscreen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Variable = () => {
  const { user, isLoading } = useUserContext();
  const imageRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950">
        <div className=" flex flex-col gap-2 container ">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  const hasAwsStations = user.stations.some(
    (station) => station.type === "AWS"
  );
  const hasArgStations = user.stations.some(
    (station) => station.type === "ARG"
  );
  const hasRlmsStations = user.stations.some(
    (station) => station.type === "RLMS"
  );
  const hasClmsStations = user.stations.some(
    (station) => station.type === "CLMS"
  );

  const awsIds = user.stations
    .filter((item) => item.type === "AWS")
    .map((item) => item.id);
  const argIds = user.stations
    .filter((item) => item.type === "ARG")
    .map((item) => item.id);
  const clmsIds = user.stations
    .filter((item) => item.type === "CLMS")
    .map((item) => item.id);
  const rlmsIds = user.stations
    .filter((item) => item.type === "RLMS")
    .map((item) => item.id);

  return (
    <>
      <div
        className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem] custom-scrollbar"
        ref={imageRef}
      >
        {isLoading ? (
          <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
            <Skeleton className="w-full cardContainer dark:bg-primary" />
            <Skeleton className="w-full cardContainer dark:bg-primary" />
          </div>
        ) : (
          <Tabs defaultValue="aws" className="w-full flex flex-col">
            <TabsList className="flex justify-between container items-center">
              <div className="flex justify-start gap-1">
                {hasAwsStations && (
                  <TabsTrigger value="aws">Weather Stations</TabsTrigger>
                )}
                {hasArgStations && (
                  <TabsTrigger value="arg">Rain Gauges</TabsTrigger>
                )}
                {hasRlmsStations && (
                  <TabsTrigger value="rlms">River Level</TabsTrigger>
                )}
                {hasClmsStations && (
                  <TabsTrigger value="clms">Coastal Level</TabsTrigger>
                )}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleFullscreen}
                      className="rounded-lg px-2"
                    >
                      <Fullscreen />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fullscreen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>
            {hasAwsStations && (
              <TabsContent value="aws" className="my-0">
                <AwsVariableCard id={awsIds} />
              </TabsContent>
            )}
            {hasArgStations && (
              <TabsContent value="arg" className="my-0">
                <ArgVariableCard id={argIds} />
              </TabsContent>
            )}
            {hasRlmsStations && (
              <TabsContent value="rlms" className="my-0">
                <RlmsVariableCard id={rlmsIds} />
              </TabsContent>
            )}
            {hasClmsStations && (
              <TabsContent value="clms" className="my-0">
                <ClmsVariableCard id={clmsIds} />
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </>
  );
};

export default Variable;
