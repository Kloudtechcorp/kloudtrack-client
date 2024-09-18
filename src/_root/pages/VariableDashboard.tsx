import StationSelect from "@/components/test/stationSelect";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locationArray } from "@/lib/objects/arrays";
import { WeatherDataProps } from "@/lib/types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VariableDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDataType, setSelectedDataType] =
    useState<string>("temperature");

  const handleChange = (value: string) => {
    setSelectedDataType(value);
    // Optionally, trigger data fetching or update based on the selected data type
  };
  const { currentData: initialData } = location.state || {};
  const [currentData, setCurrentData] = useState<WeatherDataProps | undefined>(
    initialData
  );

  const handleStationChange = (stationName: string) => {
    const selectedStation = locationArray.find(
      (station) => station.name === stationName
    );
    if (selectedStation) {
      setCurrentData(selectedStation);
      // Navigate to a different route or perform another action as needed
    }
  };

  const displayData = () => {
    switch (selectedDataType) {
      case "temperature":
        return currentData?.temp;
      case "humidity":
        return currentData?.humidity;
      case "heatIndex":
        return currentData?.heatIndex;
      case "airPressure":
        return currentData?.airPressure;
      case "precipitation":
        return currentData?.precip;
      case "uvIndex":
        return currentData?.uvIndex;
      case "irradiance":
        return currentData?.irradiance;
      case "lux":
        return currentData?.lux; // Add this field to your data if needed
      case "batteryLevel":
        return currentData?.batteryLevel; // Add this field to your data if needed
      default:
        return "No data available";
    }
  };

  return (
    <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950 ">
      <div className="container p-2">
        <Card className="cardContainer">
          <div>
            <StationSelect
              currentData={currentData}
              onValueChange={handleStationChange}
            />
            <Select
              onValueChange={handleChange}
              defaultValue={selectedDataType}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Variable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="humidity">Humidity</SelectItem>
                <SelectItem value="heatIndex">Heat Index</SelectItem>
                <SelectItem value="airPressure">Air Pressure</SelectItem>
                <SelectItem value="precipitation">Precipitation</SelectItem>
                <SelectItem value="uvIndex">UV Index</SelectItem>
                <SelectItem value="irradiance">Irradiance</SelectItem>
                <SelectItem value="lux">Light Intensity</SelectItem>
                <SelectItem value="batteryLevel">Battery Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CardContent className="flex flex-col p-0">
            <div className="flex flex-row gap-3 bg-red-200">
              <div className="flex flex-col bg-blue-200 gap-4">
                <Card>
                  <span className="bg-yellow-200 dark:bg-slate-800 font-bold xl:text-base lg:text-sm md:text-xs flex justify-center px-2 h-8 items-center">
                    Title
                  </span>
                  <CardContent>
                    <span className="text-8xl font-bold">27°C</span>
                  </CardContent>
                </Card>

                <Card>
                  <span className="bg-yellow-200 dark:bg-slate-800 font-bold xl:text-base lg:text-sm md:text-xs flex justify-center px-2 h-8 items-center">
                    Title
                  </span>
                  <CardContent>
                    <span className="text-8xl font-bold">27°C</span>
                  </CardContent>
                </Card>

                <Card>
                  <span className="bg-yellow-200 dark:bg-slate-800 font-bold xl:text-base lg:text-sm md:text-xs flex justify-center px-2 h-8 items-center">
                    Title
                  </span>
                  <CardContent>
                    <span className="text-8xl font-bold">27°C</span>
                  </CardContent>
                </Card>

                <Card>
                  <span className="bg-yellow-200 dark:bg-slate-800 font-bold xl:text-base lg:text-sm md:text-xs flex justify-center px-2 h-8 items-center">
                    Title
                  </span>
                  <CardContent>
                    <span className="text-8xl font-bold">27°C</span>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2>Selected Data Type: {selectedDataType}</h2>
                <p>Value: {displayData()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VariableDashboard;
