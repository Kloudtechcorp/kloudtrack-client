import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArgCard from "@/components/dynamic/DashboardCards/ArgCard";
import AwsCard from "@/components/dynamic/DashboardCards/AwsCard";
import RlmsCard from "@/components/dynamic/DashboardCards/RlmsCard";
import ClmsCard from "@/components/dynamic/DashboardCards/ClmsCard";
import { useUserContext } from "@/hooks/context/authContext";
import { useMemo } from "react";

const Dashboard = () => {
  const { user, isLoading } = useUserContext();

  const stationCategories = useMemo(
    () => [
      { type: "AWS", label: "Weather Stations", CardComponent: AwsCard },
      { type: "ARG", label: "Rain Gauges", CardComponent: ArgCard },
      { type: "RLMS", label: "River Level", CardComponent: RlmsCard },
      { type: "CLMS", label: "Coastal Level", CardComponent: ClmsCard },
    ],
    []
  );

  const filteredStations = useMemo(() => {
    return stationCategories.reduce((acc, category) => {
      acc[category.type] = user.stations.filter(
        (station) => station.type === category.type
      );
      return acc;
    }, {} as Record<string, typeof user.stations>);
  }, [user.stations, stationCategories]);

  return (
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl md:p-[1rem] p-[0.5rem] custom-scrollbar">
      {isLoading ? (
        <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
          <Skeleton className="w-full cardContainer dark:bg-primary" />
          <Skeleton className="w-full cardContainer dark:bg-primary" />
        </div>
      ) : (
        <Tabs defaultValue="AWS" className="w-full flex flex-col ">
          <TabsList className="flex justify-start container">
            {stationCategories.map(
              (category) =>
                filteredStations[category.type].length > 0 && (
                  <TabsTrigger key={category.type} value={category.type}>
                    {category.label}
                  </TabsTrigger>
                )
            )}
          </TabsList>

          {stationCategories.map(
            (category) =>
              filteredStations[category.type].length > 0 && (
                <TabsContent key={category.type} value={category.type}>
                  <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                    {filteredStations[category.type].map((station) => (
                      <category.CardComponent
                        key={station.id}
                        id={station.id}
                      />
                    ))}
                  </div>
                </TabsContent>
              )
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
