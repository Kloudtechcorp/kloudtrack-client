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
import { Switch } from "@/components/ui/switch";
import { useGetStationNames } from "@/hooks/react-query/queries";
import { checkRepeat } from "@/lib/utils";
import { Fullscreen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";

const VariableDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { station } = useParams();
  const {
    data: stationData,
    isError,
    isLoading,
  } = useGetStationNames(station?.toString() || "");
  const [weatherData, setWeatherData] = useState<string>(
    location.state?.variable || "temperature"
  );
  const imageRef = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState<boolean>(() =>
    localStorage.getItem("variableChecked") === "true" ? true : false
  );
  const [repeatData, setRepeatData] = useState<string>(
    () => localStorage.getItem("variableRepeat") || "hour"
  );

  useEffect(() => {
    localStorage.setItem("variableRepeat", repeatData);
  }, [repeatData]);

  useEffect(() => {
    localStorage.setItem("variableChecked", String(checked));
  }, [checked]);

  const toggleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    if (stationData) {
      switch (stationData.type) {
        case "ARG":
          setWeatherData(location.state?.variable || "precipitation");
          break;
        case "CLMS":
          setWeatherData(location.state?.variable || "distance");
          break;
        case "RLMS":
          setWeatherData(location.state?.variable || "distance");
          break;
        default:
          setWeatherData(location.state?.variable || "temperature");
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
        <Card className="cardContainer" ref={imageRef}>
          <CardContent className="h-full flex flex-col gap-2">
            <div className="flex items-center gap-5 justify-between ">
              <div className="flex gap-2">
                <img
                  src="/assets/icons/back.svg"
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />

                <div className="flex flex-row gap-2 leading-3">
                  <h1 className="capitalize text-2xl font-bold ">
                    {stationData.name}
                  </h1>
                  <button onClick={toggleFullscreen} className="p-2 rounded-lg">
                    <Fullscreen />
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                {weatherData !== "precipitation" &&
                  weatherData !== "uvIndex" && (
                    <div className="flex flex-col items-center h-full">
                      <span className="text-sm px-1">Show Dots</span>
                      <div className="h-10 flex items-center w-full justify-center">
                        <Switch
                          onCheckedChange={() => setChecked(!checked)}
                          checked={checked}
                        />
                      </div>
                    </div>
                  )}
                <div className="flex flex-col justify-center items-center px-1">
                  <span className="text-sm px-1">Interval</span>
                  <span className="text-3xl font-bold">
                    <Select
                      value={repeatData}
                      onValueChange={(value) => setRepeatData(value)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Repeat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minute">Minute</SelectItem>
                        <SelectItem value="halfhour">30 Minutes</SelectItem>
                        <SelectItem value="hour">Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm px-1">Parameter Option</span>
                  {(stationData.type === "AWS" && (
                    <span className="text-3xl font-bold">
                      <Select
                        defaultValue={weatherData}
                        onValueChange={(value) => setWeatherData(value)}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Variable" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heatIndex">Heat Index</SelectItem>
                          <SelectItem value="temperature">
                            Temperature
                          </SelectItem>
                          <SelectItem value="humidity">Humidity</SelectItem>
                          <SelectItem value="pressure">Air Pressure</SelectItem>
                          <SelectItem value="windSpeed">Wind Speed</SelectItem>
                          <SelectItem value="uvIndex">UV Index</SelectItem>
                          <SelectItem value="light">Light Intensity</SelectItem>
                          <SelectItem value="precipitation">
                            Precipitation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </span>
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
                          <SelectItem value="temperature">
                            Temperature
                          </SelectItem>
                          <SelectItem value="humidity">Humidity</SelectItem>
                          <SelectItem value="pressure">Air Pressure</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                        </SelectContent>
                      </Select>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <VerticalCards
                stationId={stationData.id}
                weatherData={weatherData}
                type={stationData.type.toLowerCase()}
              />
              <div className="w-full flex flex-col gap-5 ">
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 12 Hours</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={checkRepeat(repeatData, 12)}
                    weatherData={weatherData}
                    repeat={repeatData}
                    type={stationData.type.toLowerCase()}
                    showDots={checked}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 3 Days</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={checkRepeat(repeatData, 72)}
                    weatherData={weatherData}
                    repeat={repeatData}
                    type={stationData.type.toLowerCase()}
                    showDots={checked}
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p className="font-semibold">Past 7 Days</p>
                  <VariableDashboardGraph
                    stationId={stationData.id}
                    range={checkRepeat(repeatData, 168)}
                    weatherData={weatherData}
                    repeat={repeatData}
                    type={stationData.type.toLowerCase()}
                    showDots={checked}
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
