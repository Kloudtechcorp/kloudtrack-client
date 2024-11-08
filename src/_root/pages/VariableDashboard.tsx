import VariableGraph from "@/components/dynamic/VariableGraph";
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
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const VariableDashboard = () => {
  const navigate = useNavigate();
  const { station } = useParams();
  const { state } = useLocation();

  if (!station) {
    return <div>No station found</div>;
  }
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetStationNames(station.toString());

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

  const [weatherData, setWeatherData] = useState<string>(() => {
    if (!stationData) {
      return "temperature";
    }

    switch (stationData.type) {
      case "ARG":
        return "precipitation";
      case "CLMS":
        return "temperature";
      case "RLMS":
        return "distance";
      default:
        return "temperature";
    }
  });

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950 overflow-auto custom-scrollbar">
      <div className="container p-2">
        <Card className="cardContainer">
          <CardContent className="h-full flex flex-col gap-2">
            <div className="flex items-center gap-5 justify-between pb-2">
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
              <hr className="h-[55rem] my-auto w-[0.1rem] bg-blue-200 hidden md:block" />
              <div className="w-full flex flex-col gap-5 py-5">
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Hours</p>
                  <VariableGraph
                    stationId={stationData.id}
                    range={12}
                    weatherData={weatherData}
                    repeat="hour"
                    type={stationData.type.toLowerCase()}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Days</p>
                  <VariableGraph
                    stationId={stationData.id}
                    range={12}
                    weatherData={weatherData}
                    repeat="day"
                    type={stationData.type.toLowerCase()}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Weeks</p>
                  <VariableGraph
                    stationId={stationData.id}
                    range={12}
                    weatherData={weatherData}
                    repeat="week"
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
