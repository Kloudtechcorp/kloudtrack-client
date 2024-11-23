import VariableDashboardGraph from "@/components/dynamic/VariableDashboardGraph";
import NotFound from "@/components/shared/NotFound";
import VerticalCards from "@/components/shared/VerticalCards";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetStationNames } from "@/hooks/react-query/queries";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const VariableDashboard = () => {
  const navigate = useNavigate();
  const { station } = useParams();
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetStationNames(station?.toString() || "");
  const [weatherData, setWeatherData] = useState<string>("temperature");

  useEffect(() => {
    if (stationData) {
      switch (stationData.type) {
        case "ARG":
          setWeatherData("precipitation");
          break;
        case "CLMS":
          setWeatherData("temperature");
          break;
        case "RLMS":
          setWeatherData("distance");
          break;
        default:
          setWeatherData("temperature");
          break;
      }
    }
  }, [stationData]);

  if (!station) {
    return <div>No station found</div>;
  }

  if (isError)
    return (
      <div className="w-full flex justify-center items-center h-full">
        <NotFound />
      </div>
    );

  if (isLoading || !stationData || !stationData)
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
    <div className="mainContainer bg-[#F6F8FC] dark:bg-secondary overflow-auto custom-scrollbar">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="h-full flex flex-col gap-2">
            <div className="flex items-center gap-5 justify-between ">
              <div className="flex gap-2">
                <img
                  src="/assets/icons/back.svg"
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />

                <div className="flex flex-col leading-3">
                  <h1 className="capitalize text-2xl font-bold ">{station}</h1>
                </div>
              </div>
              {(stationData.type === "AWS" && (
                <Select
                  defaultValue={weatherData}
                  onValueChange={(value) => setWeatherData(value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Variable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Temperature</SelectItem>
                    <SelectItem value="humidity">Humidity</SelectItem>
                    <SelectItem value="heatIndex">Heat Index</SelectItem>
                    <SelectItem value="pressure">Air Pressure</SelectItem>
                    <SelectItem value="precipitation">Precipitation</SelectItem>
                    <SelectItem value="uvIndex">UV Index</SelectItem>
                    <SelectItem value="light">Light Intensity</SelectItem>
                  </SelectContent>
                </Select>
              )) ||
                (stationData.type === "ARG" && (
                  <Select
                    defaultValue={weatherData}
                    onValueChange={(value) => setWeatherData(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="precipitation">
                        Precipitation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )) ||
                (stationData.type === "RLMS" && (
                  <Select
                    defaultValue={weatherData}
                    onValueChange={(value) => setWeatherData(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                )) ||
                (stationData.type === "CLMS" && (
                  <Select
                    defaultValue={weatherData}
                    onValueChange={(value) => setWeatherData(value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Variable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="humidity">Humidity</SelectItem>
                      <SelectItem value="pressure">Air Pressure</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                ))}
            </div>

            <div className="flex gap-4">
              <VerticalCards
                stationId={stationData.id}
                range={24}
                weatherData={weatherData}
                repeat="minute"
                type={stationData.type.toLowerCase()}
              />
              <div className="w-full flex flex-col gap-5 ">
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 12 Hours</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={12}
                    weatherData={weatherData}
                    repeat="hour"
                    type={stationData.type.toLowerCase()}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 3 Days</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={72}
                    weatherData={weatherData}
                    repeat="hour"
                    type={stationData.type.toLowerCase()}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 7 Days</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={168}
                    weatherData={weatherData}
                    repeat="hour"
                    type={stationData.type.toLowerCase()}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VariableDashboard;
