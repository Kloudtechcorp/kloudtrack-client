import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArgCard from "@/components/dynamic/DashboardCards/ArgCard";
import AwsCard from "@/components/dynamic/DashboardCards/AwsCard";
import RlmsCard from "@/components/dynamic/DashboardCards/RlmsCard";
import ClmsCard from "@/components/dynamic/DashboardCards/ClmsCard";
import { useUserContext } from "@/hooks/context/authContext";
import { useMemo, useRef, useState, useEffect } from "react";
import { CreditCard, Fullscreen, TableIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AwsTable from "@/components/dynamic/DashboardCards/Tabular/AWSTable";
import ArgTable from "@/components/dynamic/DashboardCards/Tabular/ARGTable";
import RlmsTable from "@/components/dynamic/DashboardCards/Tabular/RLMSTable";
import ClmsTable from "@/components/dynamic/DashboardCards/Tabular/CLMSTable";

const Dashboard = () => {
  const { user, isLoading } = useUserContext();
  const imageRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<string>(
    () => localStorage.getItem("view") || "card"
  );
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
            <div className="flex flex-row gap-2">
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
                              <SelectItem value="card">
                                <div className="flex flex-row items-center gap-2">
                                  <CreditCard className="h-4 w-4" />
                                  <span>Card View</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="table">
                                <div className="flex flex-row items-center gap-2">
                                  <TableIcon className="h-4 w-4" />
                                  <span>Table View</span>
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

          {stationCategories.map(
            (category) =>
              filteredStations[category.type].length > 0 && (
                <TabsContent key={category.type} value={category.type}>
                  <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
                    {view === "table" ? (
                      <div>
                        {category.type === "AWS" && (
                          <Table className="border">
                            <TableCaption>
                              A list of your automated weather stations.
                            </TableCaption>
                            <TableHeader className="bg-secondary">
                              <TableRow className="h-14">
                                <TableHead className="w-[12rem]">
                                  Name
                                </TableHead>
                                <TableHead>Date Recorded</TableHead>
                                <TableHead>Temperature</TableHead>
                                <TableHead>Humidity</TableHead>
                                <TableHead>Pressure</TableHead>
                                <TableHead>Heat Index</TableHead>
                                <TableHead>Wind Speed</TableHead>
                                <TableHead>Wind Direction</TableHead>
                                <TableHead>UV Index</TableHead>
                                <TableHead>Light</TableHead>
                                <TableHead>Precipitation</TableHead>
                                <TableHead>Hourly Precipitation</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStations[category.type].map(
                                (station) => (
                                  <AwsTable id={station.id} />
                                )
                              )}
                            </TableBody>
                          </Table>
                        )}
                        {category.type === "ARG" && (
                          <Table className="border">
                            <TableCaption>
                              A list of your automated rain gauges.
                            </TableCaption>
                            <TableHeader className="bg-secondary">
                              <TableRow className="h-14">
                                <TableHead className="w-[12rem]">
                                  Name
                                </TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Date Recorded</TableHead>
                                <TableHead>Precipitation</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStations[category.type].map(
                                (station) => (
                                  <ArgTable id={station.id} />
                                )
                              )}
                            </TableBody>
                          </Table>
                        )}
                        {category.type === "RLMS" && (
                          <Table className="border">
                            <TableCaption>
                              A list of your river level monitoring systems.
                            </TableCaption>
                            <TableHeader className="bg-secondary">
                              <TableRow className="h-14">
                                <TableHead className="w-[12rem]">
                                  Name
                                </TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Date Recorded</TableHead>
                                <TableHead>Distance</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStations[category.type].map(
                                (station) => (
                                  <RlmsTable id={station.id} />
                                )
                              )}
                            </TableBody>
                          </Table>
                        )}
                        {category.type === "CLMS" && (
                          <Table className="border">
                            <TableCaption>
                              A list of your coastal level monitoring systems.
                            </TableCaption>
                            <TableHeader className="bg-secondary">
                              <TableRow className="h-14">
                                <TableHead className="w-[12rem]">
                                  Name
                                </TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Date Recorded</TableHead>
                                <TableHead>Temperature</TableHead>
                                <TableHead>Humidity</TableHead>
                                <TableHead>Pressure</TableHead>
                                <TableHead>Distance</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStations[category.type].map(
                                (station) => (
                                  <ClmsTable id={station.id} />
                                )
                              )}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    ) : (
                      filteredStations[category.type].map((station) => (
                        <category.CardComponent
                          key={station.id}
                          id={station.id}
                        />
                      ))
                    )}
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
