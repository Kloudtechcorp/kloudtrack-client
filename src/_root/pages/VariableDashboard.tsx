// import StationSelect from "@/components/test/stationSelect";
import VariableGraph from "@/components/dynamic/VariableGraph";
import VerticalCards from "@/components/shared/VerticalCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useStationContext } from "@/hooks/context/stationContext";
import { stationStaticType } from "@/types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VariableDashboard = () => {
  const navigate = useNavigate();
  const { station } = useParams();
  const { stationNames, isLoading } = useStationContext();
  const [weatherData, setWeatherData] = useState("temperature");

  const filteredStations = stationNames.find(
    (stationItem: stationStaticType) => stationItem.stationName === station
  );
  if (!station) {
    return <div>Station parameter not found.</div>;
  }
  if (!filteredStations) {
    return <div>Station not found.</div>;
  }

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
                  <h1 className="capitalize text-2xl font-bold ">
                    {filteredStations.stationName}
                  </h1>
                  <p>
                    {filteredStations.latitude}, {filteredStations.longitude}
                  </p>
                </div>
              </div>
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
                  <SelectItem value="uvIntensity">UV Index</SelectItem>
                  <SelectItem value="irradiance">Irradiance</SelectItem>
                  <SelectItem value="light">Light Intensity</SelectItem>
                  <SelectItem value="batteryVoltage">Battery Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <VerticalCards
                stationName={filteredStations.stationName}
                range={24}
                weatherData={weatherData}
                repeat="minute"
              />
              <hr className="h-[55rem] my-auto w-[0.1rem] bg-blue-200 hidden md:block" />
              <div className="w-full flex flex-col gap-5 py-5">
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Hours</p>
                  <VariableGraph
                    stationName={filteredStations.stationName}
                    range={12}
                    weatherData={weatherData}
                    repeat="hour"
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Days</p>
                  <VariableGraph
                    stationName={filteredStations.stationName}
                    range={12}
                    weatherData={weatherData}
                    repeat="day"
                  />
                </div>
                <div className="border p-2 rounded-lg flex flex-col gap-2">
                  <p>Past 12 Weeks</p>
                  <VariableGraph
                    stationName={filteredStations.stationName}
                    range={12}
                    weatherData={weatherData}
                    repeat="week"
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
