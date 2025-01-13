import { stationCurrentWeatherType } from "@/types/queryTypes";
import { Card, CardContent } from "../ui/card";
import { getWindDirectionLabel, weatherUnit } from "@/lib/utils";
import { HeatIndex } from "../../lib/dataCardUtils/heatIndexUtils";
import { UVIndex } from "@/lib/dataCardUtils/uvIndexUtils";
import { Precipitation } from "@/lib/dataCardUtils/rainUtils";

type DataCardsProps = {
  type: "DASHBOARD" | "DATADASHBOARD";
  currentweather: stationCurrentWeatherType;
  pastHourPrecip: number;
  stationName: string;
  id: string;
};
const DataCards = ({
  currentweather,
  type,
  stationName,
  pastHourPrecip,
  id,
}: DataCardsProps) => {
  if (type === "DATADASHBOARD") {
    return (
      <div className="flex flex-col gap-2 pb-2 ">
        <Card className="cardDashboard">
          <CardContent className="px-0 p-0 h-full">
            <HeatIndex
              heatIndexval={currentweather.heatIndex}
              stationName={stationName}
              id={id}
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
                    {currentweather.temperature > 0
                      ? `${currentweather.temperature} ${weatherUnit(
                          "temperature"
                        )}`
                      : "--"}
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
                    {currentweather.humidity > 0
                      ? `${currentweather.humidity} ${weatherUnit("humidity")}`
                      : "--"}
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
                    {currentweather.pressure > 0
                      ? `${currentweather.pressure} ${weatherUnit("pressure")}`
                      : "--"}
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
                    {currentweather.windSpeed >= 0 &&
                    currentweather.windSpeed !== null
                      ? `${currentweather.windSpeed} ${weatherUnit(
                          "windSpeed"
                        )}`
                      : "--"}
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
                id={id}
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
                    {currentweather.light >= 0 && currentweather.light !== null
                      ? `${currentweather.light} ${weatherUnit("light")}`
                      : "--"}
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
                id={id}
                stationName={stationName}
                dashboardType={type}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className={`grid grid-cols-3 w-full h-full gap-3 justify-center`}>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <HeatIndex
            heatIndexval={currentweather.heatIndex}
            stationName={stationName}
            dashboardType={type}
            id={id}
          />
        </CardContent>
      </Card>
      <Card className="cardMain">
        <CardContent className="px-0 p-0 h-full">
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Temperature </span>
            </div>
            <div className="flex h-full items-center justify-center gap-2">
              <span className="weatherDataText">
                {currentweather.temperature > 0
                  ? `${currentweather.temperature} ${weatherUnit(
                      "temperature"
                    )}`
                  : "--"}
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
                {currentweather.humidity > 0
                  ? `${currentweather.humidity} ${weatherUnit("humidity")}`
                  : "--"}
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
                {currentweather.pressure > 0
                  ? `${currentweather.pressure} ${weatherUnit("pressure")}`
                  : "--"}
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
                {currentweather.windSpeed >= 0 &&
                currentweather.windSpeed !== null
                  ? `${currentweather.windSpeed} ${weatherUnit("windSpeed")}`
                  : "--"}
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
            id={id}
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
                {currentweather.light >= 0 && currentweather.light !== null
                  ? `${currentweather.light} ${weatherUnit("light")}`
                  : "--"}
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
            id={id}
            stationName={stationName}
            dashboardType={type}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCards;
