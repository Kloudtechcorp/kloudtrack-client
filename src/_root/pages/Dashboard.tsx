import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArgCard from "@/components/dynamic/DashboardCards/ArgCard";
import AwsCard from "@/components/dynamic/DashboardCards/AwsCard";
import RlmsCard from "@/components/dynamic/DashboardCards/RlmsCard";
import ClmsCard from "@/components/dynamic/DashboardCards/ClmsCard";
import { useUserContext } from "@/hooks/context/authContext";
import { useMemo, useRef, useState, useEffect } from "react";
import { Fullscreen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BATCH_SIZE = 3;

const Dashboard = () => {
  const { user, isLoading } = useUserContext();
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Record<string, number>>({});

  const toggleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

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

  useEffect(() => {
    const initialVisibleCards = stationCategories.reduce((acc, category) => {
      acc[category.type] = BATCH_SIZE;
      return acc;
    }, {} as Record<string, number>);
    setVisibleCards(initialVisibleCards);
  }, [stationCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const updated = { ...prev };
              const currentTab = entry.target.getAttribute("data-tab")!;
              updated[currentTab] += BATCH_SIZE;
              return updated;
            });
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

  return (
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
        <Tabs defaultValue="AWS" className="w-full flex flex-col">
          <TabsList className="flex justify-between container">
            <div className="flex justify-start flex-wrap md:px-2">
              {stationCategories.map(
                (category) =>
                  filteredStations[category.type].length > 0 && (
                    <TabsTrigger key={category.type} value={category.type}>
                      {category.label}
                    </TabsTrigger>
                  )
              )}
            </div>
            <div className="md:flex hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleFullscreen}
                      className="rounded-lg px-2 flex p-2 flex-end "
                    >
                      <Fullscreen />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fullscreen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsList>

          {stationCategories.map(
            (category) =>
              filteredStations[category.type].length > 0 && (
                <TabsContent key={category.type} value={category.type}>
                  <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                    {filteredStations[category.type]
                      .slice(0, visibleCards[category.type])
                      .map((station) => (
                        <category.CardComponent
                          key={station.id}
                          id={station.id}
                        />
                      ))}
                    <div
                      ref={observerRef}
                      data-tab={category.type}
                      className="h-10 w-full"
                    />
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
