import { stationCurrentWeatherType } from "@/types/queryTypes";
import { Card, CardContent } from "../ui/card";
import { getWindDirectionLabel } from "@/lib/utils";
import { HeatIndex } from "../../lib/dataCardUtils/heatIndexUtils";
import { UVIndex } from "@/lib/dataCardUtils/uvIndexUtils";
import { Precipitation } from "@/lib/dataCardUtils/rainUtils";

type DataCardsProps = {
  currentweather: stationCurrentWeatherType;
  pastHourPrecip: number;
  stationName: string;
};

const DataCards = ({
  currentweather,
  pastHourPrecip,
  stationName,
}: DataCardsProps) => {
  return (
    <div className="grid grid-cols-3 w-full h-full gap-3 justify-center">
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <HeatIndex
            heatIndexval={currentweather.heatIndex}
            stationName={stationName}
          />
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Temperature
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.temperature * 100) / 100} C&deg;
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Humidity
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.humidity * 100) / 100} %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Pressure
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.pressure * 100) / 100} mb
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Wind Speed
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.windSpeed * 100) / 100} kph
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Wind Direction
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {getWindDirectionLabel(currentweather.windDirection)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <UVIndex
            uvIndexVal={currentweather.uvIndex}
            stationName={stationName}
          />
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Light
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.light * 100) / 100} lux
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <Precipitation
            precipitation={currentweather.precipitation}
            pastHourPrecip={pastHourPrecip}
            stationName={stationName}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCards;
