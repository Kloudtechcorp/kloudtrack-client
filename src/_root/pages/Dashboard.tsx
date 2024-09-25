import DashboardCard from "@/components/dynamic/DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useStationContext } from "@/hooks/context/stationContext";

const Dashboard = () => {
  const { stationNames, isLoading } = useStationContext();
  return (
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem]">
      {isLoading ? (
        <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
          <Skeleton className="w-full cardContainer dark:bg-primary" />
          <Skeleton className="w-full cardContainer dark:bg-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
          {stationNames.map((station, key) => (
            <DashboardCard key={key} station={station} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
