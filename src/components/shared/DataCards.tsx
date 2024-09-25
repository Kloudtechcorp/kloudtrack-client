import { stationCurrentWeatherType } from "@/types/queryTypes";
import { Card, CardContent } from "../ui/card";

type DataCardsProps = {
  currentweather: stationCurrentWeatherType;
};
const DataCards = ({ currentweather }: DataCardsProps) => {
  return (
    <div className="grid grid-cols-3 w-full h-full gap-3 px-2 justify-center">
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Heat Index
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.heatIndex * 100) / 100} C&deg;
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
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
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
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
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
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
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
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
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Wind Direction
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.windDirection * 100) / 100} &deg;
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Gust
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.gust * 100) / 100} kph
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Light
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.light * 100) / 100} kph
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full h-full aspect-[10/9]">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="border w-full bg-[#FBD008] dark:bg-slate-800">
              <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                Precipitation
              </span>
            </div>
            <div className="text-xl flex h-full items-center justify-center">
              <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
                {Math.round(currentweather.precipitation * 100) / 100} mm
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCards;
