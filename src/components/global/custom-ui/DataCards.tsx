import { Card, CardContent } from "@/components/ui/card";
import {
  getWindDirectionLabel,
  weatherUnit,
  getWarningInfo,
  WARNING_THRESHOLDS,
} from "@/lib/utils";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { IoWarning } from "react-icons/io5";
import { X } from "lucide-react";
import { WeatherData } from "@/types/station.type";

type DataCardsProps = {
  type: "DASHBOARD" | "DATADASHBOARD";
  currentweather: WeatherData;
  pastHourPrecip: number;
  stationName: string;
  id: string;
};

interface WarningState {
  lastWarningTime: number;
  lastWarningColor: string | null;
}

const DataCards = ({
  currentweather,
  type,
  stationName,
  pastHourPrecip,
  id,
}: DataCardsProps) => {
  const warningStatesRef = useRef<{
    windSpeed?: WarningState;
    uvIndex?: WarningState;
    heatIndex?: WarningState;
    precipitation?: WarningState;
  }>({});

  const shouldShowWarning = (
    paramName: keyof typeof warningStatesRef.current,
    currentWarningColor: string
  ): boolean => {
    const warningStates = warningStatesRef.current;
    const currentTime = Date.now();

    if (!warningStates[paramName]) {
      warningStates[paramName] = {
        lastWarningTime: currentTime,
        lastWarningColor: currentWarningColor,
      };
      return true;
    }

    const paramState = warningStates[paramName]!;
    const timeSinceLastWarning = currentTime - paramState.lastWarningTime;
    const isColorChanged = paramState.lastWarningColor !== currentWarningColor;

    if (isColorChanged || timeSinceLastWarning >= 30 * 60 * 1000) {
      paramState.lastWarningTime = currentTime;
      paramState.lastWarningColor = currentWarningColor;
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!currentweather) return;

    const heatIndexWarning = getWarningInfo(
      "heatIndex",
      currentweather.heatIndex
    );
    const windWarning = getWarningInfo("windSpeed", currentweather.windSpeed);
    const uvWarning = getWarningInfo("uvIndex", currentweather.uvIndex);
    const hourRainWarning = getWarningInfo("precipitation", pastHourPrecip);

    // Wind Speed Warning
    if (
      currentweather.windSpeed >= WARNING_THRESHOLDS.windSpeed.high &&
      shouldShowWarning("windSpeed", windWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                ${windWarning.color === "red" ? "Typhoon Force" : ""}
                ${windWarning.color === "orange" ? "Storm Force" : ""}
                ${windWarning.color === "amber" ? "Gale Force" : ""}
                ${windWarning.color === "yellow" ? "Strong" : ""}
              `}{" "}
            Winds Alert at {stationName}
          </span>
          <span
            className={`
                ${
                  windWarning.color === "red"
                    ? "text-[#FE0000] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "orange"
                    ? "text-[#FFC000] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "amber"
                    ? "text-[#FFFF00] font-bold text-2xl"
                    : ""
                }
                ${
                  windWarning.color === "yellow"
                    ? "text-[#00CCFF] font-bold text-2xl"
                    : ""
                }
              `}
          >
            {currentweather.windSpeed}
            {weatherUnit("windSpeed")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() => toast.dismiss(`windSpeed-${stationName}`)}
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `windSpeed-${stationName}`,
        }
      );
    }

    // UV Index Warning
    if (
      currentweather.uvIndex >= WARNING_THRESHOLDS.uvIndex.high &&
      shouldShowWarning("uvIndex", uvWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                        ${uvWarning.color === "red" ? "Extreme" : ""}
                        ${uvWarning.color === "orange" ? "Very High" : ""}
                        ${uvWarning.color === "amber" ? "High" : ""}
                        ${uvWarning.color === "yellow" ? "Moderate" : ""}
                      `}{" "}
            UV Index Alert at {stationName}
          </span>
          <span
            className={`
                        ${
                          uvWarning.color === "red"
                            ? "text-[#9E47CC] font-bold text-2xl"
                            : ""
                        }
                        ${
                          uvWarning.color === "orange"
                            ? "text-[#F55023] font-bold text-2xl"
                            : ""
                        }
                        ${
                          uvWarning.color === "amber"
                            ? "text-[#FF9000] font-bold text-2xl"
                            : ""
                        }
                        ${
                          uvWarning.color === "yellow"
                            ? "text-[#FFBC01] font-bold text-2xl"
                            : ""
                        }
                      `}
          >
            {currentweather.uvIndex}
            {weatherUnit("uvIndex")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() => toast.dismiss(`uvIndex-${stationName}`)}
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `uvIndex-${stationName}`,
        }
      );
    }

    // Heat Index Warning
    if (
      currentweather.heatIndex >= WARNING_THRESHOLDS.heatIndex.high &&
      shouldShowWarning("heatIndex", heatIndexWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {heatIndexWarning.color === "red"
              ? "Extreme Danger"
              : heatIndexWarning.color === "orange"
              ? "Danger"
              : heatIndexWarning.color === "amber"
              ? "Extreme Caution"
              : heatIndexWarning.color === "yellow"
              ? "Caution"
              : ""}{" "}
            Heat Index at {stationName}
          </span>
          <span
            className={`
                        ${
                          heatIndexWarning.color === "red"
                            ? "text-[#CC0001] font-bold text-2xl"
                            : ""
                        }
                        ${
                          heatIndexWarning.color === "orange"
                            ? "text-[#FF6600] font-bold text-2xl"
                            : ""
                        }
                        ${
                          heatIndexWarning.color === "amber"
                            ? "text-[#FFCC00] font-bold text-2xl"
                            : ""
                        }
                        ${
                          heatIndexWarning.color === "yellow"
                            ? "text-[#FFFF00] font-bold text-2xl"
                            : ""
                        }
                      `}
          >
            {currentweather.heatIndex}
            {weatherUnit("heatIndex")}
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() => toast.dismiss(`heatIndex-${stationName}`)}
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `heatIndex-${stationName}`,
        }
      );
    }

    // Precipitation Warning
    if (
      pastHourPrecip >= WARNING_THRESHOLDS.precipitation.high &&
      shouldShowWarning("precipitation", hourRainWarning.color)
    ) {
      toast(
        <div className="flex flex-col">
          <span>
            {`
                        ${hourRainWarning.color === "red" ? "Torrential" : ""}
                        ${hourRainWarning.color === "orange" ? "Intense" : ""}
                        ${hourRainWarning.color === "amber" ? "Heavy" : ""}
                      `}{" "}
            Rainfall Warning at {stationName}
          </span>
          <span
            className={`
                        ${
                          hourRainWarning.color === "red"
                            ? "text-red-500 font-bold text-2xl"
                            : ""
                        }
                        ${
                          hourRainWarning.color === "orange"
                            ? "text-orange-500 font-bold text-2xl"
                            : ""
                        }
                        ${
                          hourRainWarning.color === "yellow"
                            ? "text-yellow-500 font-bold text-2xl"
                            : ""
                        }
                      `}
          >
            {pastHourPrecip}
            {weatherUnit("precipitation")}/hr
          </span>
          <X
            className="absolute top-2 right-2 size-4 hover:cursor-pointer"
            onClick={() => toast.dismiss(`precipitation-${stationName}`)}
          />
        </div>,
        {
          position: "bottom-right",
          duration: 5000,
          id: `precipitation-${stationName}`,
        }
      );
    }
  }, [currentweather, pastHourPrecip, stationName]);

  if (!currentweather) {
    return <div>No Data Found</div>;
  }

  const heatIndexWarning = getWarningInfo(
    "heatIndex",
    currentweather.heatIndex
  );
  const windWarning = getWarningInfo("windSpeed", currentweather.windSpeed);
  const uvWarning = getWarningInfo("uvIndex", currentweather.uvIndex);
  const rainWarning = getWarningInfo(
    "precipitation",
    currentweather.precipitation
  );
  const hourRainWarning = getWarningInfo(
    "precipitation",
    currentweather.pastHourPrecip
  );

  if (type === "DATADASHBOARD") {
    return (
      <div className="flex flex-col gap-2 pb-2 ">
        <Card className={`cardDashboard weatherDataText`}>
          <CardContent className="px-0 p-0 h-full">
            <div className="text-center w-full flex flex-col h-full">
              <div className="cardTitleDiv">
                <span className="weatherDataTitle">Heat Index</span>
              </div>
              {currentweather.heatIndex > 0 ? (
                <div className="cardDataDiv">
                  {heatIndexWarning &&
                  heatIndexWarning.color &&
                  ["red", "amber", "orange", "yellow"].includes(
                    heatIndexWarning.color
                  ) ? (
                    <div className="cardDataDiv flex gap-2">
                      <span className="weatherDataText">
                        {currentweather.heatIndex > 0
                          ? `${currentweather.heatIndex} ${weatherUnit(
                              "heatIndex"
                            )}`
                          : "--"}
                      </span>
                      {heatIndexWarning && (
                        <IoWarning
                          className={`size-9 ${
                            heatIndexWarning.color === "red"
                              ? "text-[#CC0001] font-bold hover:text-[#FE0000]/80"
                              : heatIndexWarning.color === "orange"
                              ? "text-[#FF6600] font-bold hover:text-[#FF6600]/80"
                              : heatIndexWarning.color === "amber"
                              ? "text-[#FFCC00] font-bold hover:text-[#FFCC00]/80"
                              : heatIndexWarning.color === "yellow"
                              ? "text-[#FFFF00] font-bold hover:text-[#FFFF00]/80"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="weatherDataText">{`${
                      currentweather.heatIndex
                    } ${weatherUnit("heatIndex")}`}</div>
                  )}
                </div>
              ) : (
                "--"
              )}
            </div>
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
                {currentweather.windSpeed >= 0 &&
                currentweather.windSpeed !== null ? (
                  <div className="cardDataDiv">
                    {windWarning &&
                    windWarning.color &&
                    ["red", "amber", "orange", "yellow"].includes(
                      windWarning.color
                    ) ? (
                      <div className="flex h-full items-center justify-center gap-1">
                        <span className="weatherDataText">
                          {currentweather.windSpeed >= 0 &&
                          currentweather.windSpeed !== null
                            ? `${currentweather.windSpeed} ${weatherUnit(
                                "windSpeed"
                              )}`
                            : "--"}
                        </span>
                        {windWarning && (
                          <IoWarning
                            className={`size-9 ${
                              windWarning.color === "red"
                                ? "text-[#FE0000] font-bold hover:text-[#FE0000]/80"
                                : windWarning.color === "orange"
                                ? "text-[#FFC000] font-bold hover:text-[#FF6600]/80"
                                : windWarning.color === "amber"
                                ? "text-[#FFFF00] font-bold hover:text-[#FFCC00]/80"
                                : windWarning.color === "yellow"
                                ? "text-[#00CCFF] font-bold hover:text-[#FFFF00]/80"
                                : ""
                            }`}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="weatherDataText">{`${
                        currentweather.windSpeed
                      } ${weatherUnit("windSpeed")}`}</div>
                    )}
                  </div>
                ) : (
                  <div className="weatherDataText cardDataDiv">--</div>
                )}
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
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">UV Index</span>
                </div>
                <div className="cardDataDiv">
                  <span className="weatherDataText">
                    {currentweather.uvIndex}
                  </span>
                </div>
              </div>
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
              <div className="text-center w-full flex flex-col h-full">
                <div className="cardTitleDiv">
                  <span className="weatherDataTitle">Precipitation</span>
                </div>

                <div className="text-xl flex h-full items-center justify-center">
                  <div className="font-medium text-xl flex h-full items-center flex-row justify-center gap-2">
                    <div className="flex flex-col w-full">
                      <span className="weatherDataText">
                        {currentweather.precipitation === null
                          ? "--"
                          : `${currentweather.precipitation} ${weatherUnit(
                              "precipitation"
                            )}`}
                      </span>
                      {pastHourPrecip >= 0 && pastHourPrecip !== null ? (
                        <div className="flex items-center gap-1">
                          {hourRainWarning &&
                          hourRainWarning.color &&
                          ["red", "amber", "orange", "yellow"].includes(
                            hourRainWarning.color
                          ) ? (
                            <div className="flex gap-1">
                              <span className={`font-bold text-3xl`}>
                                {(
                                  Math.round(pastHourPrecip * 100) / 100
                                ).toFixed(1)}{" "}
                                mm/hr
                              </span>
                              <IoWarning
                                className={`size-9 ${
                                  hourRainWarning.color === "red"
                                    ? "text-[#9E47CC] font-bold hover:text-[#FE0000]/80"
                                    : hourRainWarning.color === "orange"
                                    ? "text-[#F55023] font-bold hover:text-[#FF6600]/80"
                                    : hourRainWarning.color === "amber"
                                    ? "text-[#FF9000] font-bold hover:text-[#FFCC00]/80"
                                    : hourRainWarning.color === "yellow"
                                    ? "text-[#FFBC01] font-bold hover:text-[#FFFF00]/80"
                                    : ""
                                }`}
                              />
                            </div>
                          ) : (
                            <div className="w-full px-2.5 py-0.5 font-bold text-3xl">
                              {pastHourPrecip} {weatherUnit("precipitation")}/hr
                            </div>
                          )}
                        </div>
                      ) : (
                        "--"
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Heat Index</span>
            </div>
            {currentweather.heatIndex > 0 ? (
              <div className="cardDataDiv">
                {heatIndexWarning &&
                heatIndexWarning.color &&
                ["red", "amber", "orange", "yellow"].includes(
                  heatIndexWarning.color
                ) ? (
                  <div className="cardDataDiv flex gap-2">
                    <span className="weatherDataText">
                      {currentweather.heatIndex > 0
                        ? `${currentweather.heatIndex} ${weatherUnit(
                            "heatIndex"
                          )}`
                        : "--"}
                    </span>
                    {heatIndexWarning && (
                      <IoWarning
                        className={`size-9 ${
                          heatIndexWarning.color === "red"
                            ? "text-[#CC0001] font-bold hover:text-[#FE0000]/80"
                            : heatIndexWarning.color === "orange"
                            ? "text-[#FF6600] font-bold hover:text-[#FF6600]/80"
                            : heatIndexWarning.color === "amber"
                            ? "text-[#FFCC00] font-bold hover:text-[#FFCC00]/80"
                            : heatIndexWarning.color === "yellow"
                            ? "text-[#FFFF00] font-bold hover:text-[#FFFF00]/80"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <div className="weatherDataText">{`${
                    currentweather.heatIndex
                  } ${weatherUnit("heatIndex")}`}</div>
                )}
              </div>
            ) : (
              <div className="weatherDataText cardDataDiv">--</div>
            )}
          </div>
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
            {currentweather.windSpeed >= 0 &&
            currentweather.windSpeed !== null ? (
              <div className="cardDataDiv">
                {windWarning &&
                windWarning.color &&
                ["red", "amber", "orange", "yellow"].includes(
                  windWarning.color
                ) ? (
                  <div className="flex h-full items-center justify-center gap-1">
                    <span className="weatherDataText">
                      {currentweather.windSpeed >= 0 &&
                      currentweather.windSpeed !== null
                        ? `${currentweather.windSpeed} ${weatherUnit(
                            "windSpeed"
                          )}`
                        : "--"}
                    </span>
                    {windWarning && (
                      <IoWarning
                        className={`size-9 ${
                          windWarning.color === "red"
                            ? "text-[#FE0000] font-bold hover:text-[#FE0000]/80"
                            : windWarning.color === "orange"
                            ? "text-[#FFC000] font-bold hover:text-[#FF6600]/80"
                            : windWarning.color === "amber"
                            ? "text-[#FFFF00] font-bold hover:text-[#FFCC00]/80"
                            : windWarning.color === "yellow"
                            ? "text-[#00CCFF] font-bold hover:text-[#FFFF00]/80"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <div className="weatherDataText">{`${
                    currentweather.windSpeed
                  } ${weatherUnit("windSpeed")}`}</div>
                )}
              </div>
            ) : (
              <div className="weatherDataText cardDataDiv">--</div>
            )}
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
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">UV Index</span>
            </div>
            {currentweather.uvIndex >= 0 && currentweather.uvIndex !== null ? (
              <div className="cardDataDiv">
                {uvWarning &&
                uvWarning.color &&
                ["red", "amber", "orange", "yellow"].includes(
                  uvWarning.color
                ) ? (
                  <div className="cardDataDiv flex gap-1">
                    <span className="weatherDataText">
                      {currentweather.uvIndex}
                    </span>
                    {uvWarning && (
                      <IoWarning
                        className={`size-9 ${
                          uvWarning.color === "red"
                            ? "text-[#9E47CC] font-bold hover:text-[#FE0000]/80"
                            : uvWarning.color === "orange"
                            ? "text-[#F55023] font-bold hover:text-[#FF6600]/80"
                            : uvWarning.color === "amber"
                            ? "text-[#FF9000] font-bold hover:text-[#FFCC00]/80"
                            : uvWarning.color === "yellow"
                            ? "text-[#FFBC01] font-bold hover:text-[#FFFF00]/80"
                            : ""
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  <div className="weatherDataText">{`${currentweather.uvIndex}`}</div>
                )}
              </div>
            ) : (
              "--"
            )}
          </div>
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
          <div className="text-center w-full flex flex-col h-full">
            <div className="cardTitleDiv">
              <span className="weatherDataTitle">Precipitation</span>
            </div>

            <div className="text-xl flex h-full items-center justify-center">
              <div className="font-medium text-xl flex h-full items-center flex-row justify-center gap-2">
                <div className="flex flex-col w-full">
                  <span className="weatherDataText">
                    {currentweather.precipitation === null
                      ? "--"
                      : `${currentweather.precipitation} ${weatherUnit(
                          "precipitation"
                        )}`}
                  </span>

                  {pastHourPrecip >= 0 && pastHourPrecip !== null ? (
                    <div className="flex items-center gap-1">
                      {hourRainWarning &&
                      hourRainWarning.color &&
                      ["red", "amber", "orange", "yellow"].includes(
                        hourRainWarning.color
                      ) ? (
                        <div className="flex gap-1">
                          <span className={`font-bold text-3xl`}>
                            {(Math.round(pastHourPrecip * 100) / 100).toFixed(
                              1
                            )}{" "}
                            mm/hr
                          </span>
                          <IoWarning
                            className={`size-9 ${
                              hourRainWarning.color === "red"
                                ? "text-[#9E47CC] font-bold hover:text-[#FE0000]/80"
                                : hourRainWarning.color === "orange"
                                ? "text-[#F55023] font-bold hover:text-[#FF6600]/80"
                                : hourRainWarning.color === "amber"
                                ? "text-[#FF9000] font-bold hover:text-[#FFCC00]/80"
                                : hourRainWarning.color === "yellow"
                                ? "text-[#FFBC01] font-bold hover:text-[#FFFF00]/80"
                                : ""
                            }`}
                          />
                        </div>
                      ) : (
                        <div className="w-full px-2.5 py-0.5 font-bold text-3xl">
                          {pastHourPrecip} {weatherUnit("precipitation")}/hr
                        </div>
                      )}
                    </div>
                  ) : (
                    "--"
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCards;
