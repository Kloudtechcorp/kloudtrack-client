import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwsVariableCard from "@/components/dynamic/VariableCards/AwsVariableCard";
import ArgVariableCard from "@/components/dynamic/VariableCards/ArgVariableCard";
import ClmsVariableCard from "@/components/dynamic/VariableCards/ClmsVariableCard";
import RlmsVariableCard from "@/components/dynamic/VariableCards/RlmsVariableCard";
import { useRef, useState, useEffect } from "react";
import { Fullscreen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the possible keys for the visibleCount state
type TabType = "aws" | "arg" | "clms" | "rlms";

const BATCH_SIZE = 3; // Number of cards to load at a time

const Variable = () => {
  const { user, isLoading } = useUserContext();
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  // Explicitly define the state type using TabType
  const [visibleCount, setVisibleCount] = useState<Record<TabType, number>>({
    aws: BATCH_SIZE,
    arg: BATCH_SIZE,
    clms: BATCH_SIZE,
    rlms: BATCH_SIZE,
  });

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

  // Lazy load observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tab = entry.target.getAttribute("data-tab") as TabType; // Explicitly assert the type here
            setVisibleCount((prev) => ({
              ...prev,
              [tab]: prev[tab] + BATCH_SIZE,
            }));
          }
        });
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={toggleFullscreen} className="rounded-lg px-2">
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
            <AwsVariableCard id={awsIds.slice(0, visibleCount.aws)} />
            <div ref={observerRef} data-tab="aws" className="h-10 w-full" />
          </TabsContent>
        )}
        {hasArgStations && (
          <TabsContent value="arg" className="my-0">
            <ArgVariableCard id={argIds.slice(0, visibleCount.arg)} />
            <div ref={observerRef} data-tab="arg" className="h-10 w-full" />
          </TabsContent>
        )}
        {hasRlmsStations && (
          <TabsContent value="rlms" className="my-0">
            <RlmsVariableCard id={rlmsIds.slice(0, visibleCount.rlms)} />
            <div ref={observerRef} data-tab="rlms" className="h-10 w-full" />
          </TabsContent>
        )}
        {hasClmsStations && (
          <TabsContent value="clms" className="my-0">
            <ClmsVariableCard id={clmsIds.slice(0, visibleCount.clms)} />
            <div ref={observerRef} data-tab="clms" className="h-10 w-full" />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Variable;
