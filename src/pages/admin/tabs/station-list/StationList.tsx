import { useUserContext } from "@/hooks/custom-hooks/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArgSensors, AwsSensors, ClmsSensors, RlmsSensors } from "./components";

const StationList = () => {
  const { user, isLoading } = useUserContext();

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

  return (
    <div className="px-5 w-full">
      <span className="flex pt-5 font-bold text-lg">Station List</span>
      <span className="flex pb-5 text-sm">
        This page will show the list of stations per station type along with its
        sensors.
      </span>

      <div className="w-full overflow-auto rounded-md custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
            <Skeleton className="w-full cardContainer dark:bg-primary" />
            <Skeleton className="w-full cardContainer dark:bg-primary" />
          </div>
        ) : (
          <Tabs defaultValue="aws" className="w-full flex flex-col">
            <TabsList className="flex justify-start container">
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
            </TabsList>
            {hasAwsStations && (
              <TabsContent value="aws">
                <AwsSensors />
              </TabsContent>
            )}
            {hasArgStations && (
              <TabsContent value="arg">
                <ArgSensors />
              </TabsContent>
            )}
            {hasRlmsStations && (
              <TabsContent value="rlms">
                <RlmsSensors />
              </TabsContent>
            )}
            {hasClmsStations && (
              <TabsContent value="clms">
                <ClmsSensors />
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default StationList;
