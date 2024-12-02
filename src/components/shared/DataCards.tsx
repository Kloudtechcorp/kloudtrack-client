import { stationCurrentWeatherType } from "@/types/queryTypes";
import { Card, CardContent } from "../ui/card";
import { getWindDirectionLabel } from "@/lib/utils";
import { HeatIndex } from "../../lib/dataCardUtils/heatIndexUtils";
import { UVIndex } from "@/lib/dataCardUtils/uvIndexUtils";
import { Precipitation } from "@/lib/dataCardUtils/rainUtils";

type DataCardsProps = {
  type: "DASHBOARD" | "DATADASHBOARD";
  currentweather: stationCurrentWeatherType;
  pastHourPrecip: number;
  stationName: string;
};
const DataCards = ({
  currentweather,
  type,
  stationName,
  pastHourPrecip,
}: DataCardsProps) => {
  if (type === "DATADASHBOARD") {
    return (
      <div className="flex flex-col gap-2 pb-2 ">
        <Card className="cardDashboard">
          <CardContent className="px-0 p-0 h-full">
            <HeatIndex
              heatIndexval={currentweather.heatIndex}
              stationName={stationName}
              dashboardType={type}
            />
          </CardContent>
        </Card>
        <div className={`grid grid-cols-2 w-full h-full gap-3 justify-center`}>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Temperature</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {Math.round(currentweather.temperature * 100) / 100} &deg;C
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Humidity</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {Math.round(currentweather.humidity * 100) / 100} %
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Pressure</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {Math.round(currentweather.pressure * 100) / 100} mb
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Wind Speed</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {Math.round(currentweather.windSpeed * 100) / 100} kph
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Wind Direction</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {getWindDirectionLabel(currentweather.windDirection)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <UVIndex
                uvIndexVal={currentweather.uvIndex}
                stationName={stationName}
                dashboardType={type}
              />
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Light</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {Math.round(currentweather.light * 100) / 100} lux
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cardDashboard">
            <CardContent className="px-0 p-0 h-full">
              <Precipitation
                precipitation={currentweather.precipitation}
                pastHourPrecip={pastHourPrecip}
                stationName={stationName}
                dashboardType={type}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  // Dashboard
  return (
    <div className={`grid grid-cols-3 w-full h-full gap-3 justify-center`}>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <HeatIndex
            heatIndexval={currentweather.heatIndex}
            stationName={stationName}
            dashboardType={type}
          />
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Temperature</span>
            </div>
            <div className="flex h-full items-center justify-center">
              <span className="weatherDataText">
                {Math.round(currentweather.temperature * 100) / 100} &deg;C
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Humidity</span>
            </div>
            <div className="cardDataDiv">
              <span className="weatherDataText">
                {Math.round(currentweather.humidity * 100) / 100} %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Pressure</span>
            </div>
            <div className="cardDataDiv">
              <span className="weatherDataText">
                {Math.round(currentweather.pressure * 100) / 100} mb
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Wind Speed</span>
            </div>
            <div className="flex h-full items-center justify-center">
              <span className="weatherDataText">
                {Math.round(currentweather.windSpeed * 100) / 100} kph
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Wind Direction</span>
            </div>
            <div className="cardDataDiv">
              <span className="weatherDataText">
                {getWindDirectionLabel(currentweather.windDirection)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <UVIndex
            uvIndexVal={currentweather.uvIndex}
            stationName={stationName}
            dashboardType={type}
          />
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Light</span>
            </div>
            <div className="cardDataDiv">
              <span className="weatherDataText">
                {Math.round(currentweather.light * 100) / 100} lux
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <Precipitation
            precipitation={currentweather.precipitation}
            pastHourPrecip={pastHourPrecip}
            stationName={stationName}
            dashboardType={type}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCards;
