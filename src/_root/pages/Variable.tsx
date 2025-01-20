import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwsVariableCard from "@/components/dynamic/VariableCards/AwsVariableCard";
import ArgVariableCard from "@/components/dynamic/VariableCards/ArgVariableCard";
import ClmsVariableCard from "@/components/dynamic/VariableCards/ClmsVariableCard";
import RlmsVariableCard from "@/components/dynamic/VariableCards/RlmsVariableCard";
import { useRef, useState, useEffect } from "react";
import { CreditCard, Fullscreen, TableIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AwsStackedVariable from "@/components/dynamic/VariableCards/Stacked/AwsStackedVariable";

const Variable = () => {
  const { user, isLoading } = useUserContext();
  const imageRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState(() => {
    return localStorage.getItem("view") || "linear";
  });

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const toggleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

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

  if (isLoading) {
    return (
      <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950">
        <div className="flex flex-col gap-2 container">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem] custom-scrollbar"
      ref={imageRef}
    >
      <Tabs defaultValue="aws" className="w-full flex flex-col ">
        <TabsList className="flex justify-between container items-center md:px-6 lg:px-3 px-6">
          <div className="flex flex-wrap justify-start gap-1 ">
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
          <div className="flex flex-row gap-2">
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
            <div className="flex items-center space-x-2 pr-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Select
                        defaultValue={view}
                        onValueChange={(value) => setView(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a view" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="linear">
                              <div className="flex flex-row items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                <span>Linear View</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="stacked">
                              <div className="flex flex-row items-center gap-2">
                                <TableIcon className="h-4 w-4" />
                                <span>Stacked View</span>
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </TabsList>
        {view === "linear" ? (
          <>
            {hasAwsStations && (
              <TabsContent value="aws" className="my-0">
                <AwsVariableCard id={awsIds.slice(0)} />
                <div data-tab="aws" className="h-10 w-full" />
              </TabsContent>
            )}
            {hasArgStations && (
              <TabsContent value="arg" className="my-0">
                <ArgVariableCard id={argIds.slice(0)} />
                <div data-tab="arg" className="h-10 w-full" />
              </TabsContent>
            )}
            {hasRlmsStations && (
              <TabsContent value="rlms" className="my-0">
                <RlmsVariableCard id={rlmsIds.slice(0)} />
                <div data-tab="rlms" className="h-10 w-full" />
              </TabsContent>
            )}
            {hasClmsStations && (
              <TabsContent value="clms" className="my-0">
                <ClmsVariableCard id={clmsIds.slice(0)} />
                <div data-tab="clms" className="h-10 w-full" />
              </TabsContent>
            )}
          </>
        ) : (
          <>
            {hasAwsStations && (
              <TabsContent value="aws" className="my-0">
                <AwsStackedVariable id={awsIds} />
                <div data-tab="aws" className="h-10 w-full" />
              </TabsContent>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Variable;
