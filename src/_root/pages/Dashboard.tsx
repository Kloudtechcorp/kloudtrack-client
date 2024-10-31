import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArgCard from "@/components/dynamic/DashboardCards/ArgCard";
import AwsCard from "@/components/dynamic/DashboardCards/AwsCard";
import RlmsCard from "@/components/dynamic/DashboardCards/RlmsCard";
import { useUserContext } from "@/hooks/context/authContext";
import ClmsCard from "@/components/dynamic/DashboardCards/ClmsCard";

const Dashboard = () => {
  const { user, isLoading } = useUserContext();

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
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem] custom-scrollbar">
      {isLoading ? (
        <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
          <Skeleton className="w-full cardContainer dark:bg-primary" />
          <Skeleton className="w-full cardContainer dark:bg-primary" />
        </div>
      ) : (
        <Tabs defaultValue="aws" className="w-full flex flex-col">
          <TabsList className="flex justify-start">
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
              <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                {user.stations
                  .filter((station) => station.type === "AWS")
                  .map((station, key) => (
                    <AwsCard key={key} id={station.id} />
                  ))}
              </div>
            </TabsContent>
          )}

          {hasArgStations && (
            <TabsContent value="arg">
              <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                {user.stations
                  .filter((station) => station.type === "ARG")
                  .map((station, key) => (
                    <ArgCard key={key} id={station.id} />
                  ))}
              </div>
            </TabsContent>
          )}

          {hasRlmsStations && (
            <TabsContent value="rlms">
              <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                {user.stations
                  .filter((station) => station.type === "RLMS")
                  .map((station, key) => (
                    <RlmsCard key={key} id={station.id} />
                  ))}
              </div>
            </TabsContent>
          )}

          {hasClmsStations && (
            <TabsContent value="clms">
              <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                {user.stations
                  .filter((station) => station.type === "CLMS")
                  .map((station, key) => (
                    <ClmsCard key={key} id={station.id} />
                  ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
