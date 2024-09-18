import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { WeatherDataProps } from "@/lib/types";
import { locationArray, styles } from "@/lib/objects/arrays";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

import {
  mergeStationData,
  chartData,
  stationInfo,
} from "@/_root/data/variableData";
import { useStationData } from "@/lib/context/stationContext";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<WeatherDataProps | null>(null);
  const [time, setTime] = useState("");
  const [dataStation, setDataStation] = useState<DataStationType[]>([]);
  const navigate = useNavigate();

  type DataStationType = {
    dataName: string;
    iconSrc: string;
    toolTip: string;
    dataValue: number;
    dataLabel: string;
  };

  const getWindDirectionLabel = (value: number) => {
    if (value === 0 || value === 360) {
      return "°N";
    } else if (value > 0 && value < 90) {
      return "°NE";
    } else if (value === 90) {
      return "°E";
    } else if (value > 90 && value < 180) {
      return "°SE";
    } else if (value === 180) {
      return "°S";
    } else if (value > 180 && value < 270) {
      return "°SW";
    } else if (value === 270) {
      return "°W";
    } else if (value > 270 && value < 360) {
      return "°NW";
    } else {
      return `${value}°`;
    }
  };

  const getBatteryImg = (level: number) => {
    if (level == 100) {
      return "assets/img/batteryFull.svg";
    } else if (level >= 80) {
      return "assets/img/battery6Bar.svg";
    } else if (level >= 50) {
      return "assets/img/battery5Bar.svg";
    } else if (level >= 30) {
      return "assets/img/battery4Bar.svg";
    } else if (level > 0) {
      return "assets/img/battery2Bar.svg";
    } else if (level == 0) {
      return "assets/img/battery0Bar.svg";
    }
  };

  const updateDataStation = (weatherData: WeatherDataProps) => {
    const newDataStation: DataStationType[] = [
      {
        dataName: "Temperature",
        iconSrc: "assets/icons/temp.svg",
        toolTip: "This is a tip for temperature....",
        dataValue: weatherData.temperature,
        dataLabel: "°C",
      },
      {
        dataName: "Heat Index",
        iconSrc: "assets/icons/heatIndex.svg",
        toolTip: "This is a tip for humidity....",
        dataValue: weatherData.heatIndex,
        dataLabel: "°C",
      },
      {
        dataName: "Humidity",
        iconSrc: "assets/icons/humidity.svg",
        toolTip: "This is a tip for humidity....",
        dataValue: weatherData.humidity,
        dataLabel: "%",
      },
      {
        dataName: "Precipitation",
        iconSrc: "assets/icons/precip.svg",
        toolTip: "This is a tip for precipitation....",
        dataValue: weatherData.precipitation,
        dataLabel: "mm/hr",
      },
      {
        dataName: "Air Pressure",
        iconSrc: "assets/icons/airPressure.svg",
        toolTip: "This is a tip for air pressure....",
        dataValue: weatherData.airPressure,
        dataLabel: "mb",
      },
      {
        dataName: "Wind Speed",
        iconSrc: "assets/icons/windSpeed.svg",
        toolTip: "This is a tip for temperature....",
        dataValue: weatherData.windSpeed,
        dataLabel: "kph",
      },
      {
        dataName: "Wind Direction",
        iconSrc: "assets/icons/windDirection.svg",
        toolTip: "This is a tip for temperature....",
        dataValue: weatherData.windDirection,
        dataLabel: getWindDirectionLabel(weatherData.windDirection),
      },
      {
        dataName: "Irradiance",
        iconSrc: "assets/icons/windDirection.svg",
        toolTip: "This is a tip for irradiance....",
        dataValue: weatherData.windDirection,
        dataLabel: getWindDirectionLabel(weatherData.irradiance),
      },
      {
        dataName: "Light Intensity",
        iconSrc: "assets/icons/windDirection.svg",
        toolTip: "This is a tip for light intensity....",
        dataValue: weatherData.windDirection,
        dataLabel: getWindDirectionLabel(weatherData.lux),
      },
      {
        dataName: "Battery Level",
        iconSrc: "assets/icons/windDirection.svg",
        toolTip: "This is a tip for battery level....",
        dataValue: weatherData.windDirection,
        dataLabel: getWindDirectionLabel(weatherData.batteryLevel),
      },
    ];
    setDataStation(newDataStation);
  };

  const [mapboxStyle, setMapboxStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v11"
  );

  const monitoringClick = async (
    stationName: string,
    currentData: WeatherDataProps
  ) => {
    navigate(`/dashboard/${stationName}`, { state: { currentData } });
  };

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v11",

        center: [120.4818, 14.6417],
        zoom: 11,
        maxZoom: 15,
        minZoom: 8,
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        maxBounds: [117.27427453, 5.68100332277, 126.557423944, 18.5552273625],
      });

      map.setStyle(mapboxStyle);
      map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-left"
      );

      map.on("load", () => {
        const markerList: mapboxgl.Marker[] = [];
        locationArray.length > 0 &&
          locationArray.forEach((item) => {
            const el = document.createElement("div");
            el.className = "marker";

            const marker = new mapboxgl.Marker(el)
              .setLngLat(item.coordinates)
              .addTo(map);

            marker.getElement().addEventListener("click", () => {
              setData(item);
              updateDataStation(item); // Update dataStation with the current marker's data
              // map.setCenter(item.coordinates);
              // map.setZoom(13);
            });

            el.addEventListener("mouseenter", () => {
              el.style.width = "75px";
              el.style.height = "75px";
              el.style;
            });

            el.addEventListener("mouseleave", () => {
              el.style.width = "50px";
              el.style.height = "50px";
            });
            markerList.push(marker);
          });
      });

      return () => map.remove();
    }
  }, [mapboxStyle]);

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();
      const currentDate = dateObject.toDateString();
      const currentTime = dateObject.toLocaleTimeString();
      setTime(currentTime + ", " + currentDate);
    }, 1000);
  }, []);

  const mergedData = mergeStationData(stationInfo, chartData);
  console.log("merged values is ", mergedData);

  return (
    <>
      <div ref={mapContainer} className="w-full rounded-l-2xl">
        <Select
          onValueChange={(value) => {
            setMapboxStyle(value);
            setData(null);
          }}
          defaultValue={mapboxStyle}
        >
          <SelectTrigger className="w-[180px] relative top-5 left-5 z-50">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {styles.map((style) => (
              <SelectItem value={style.uri} key={style.uri}>
                {style.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {data && (
        <div
          className={`bg-white dark:bg-gray-950 xs:py-5 shadow-lg rounded-lg lg:top-0 lg:right-0 xs:bottom-0 xs:top-48 w-1/2 xs:max-w-screen-sm`}
        >
          <div className="absolute right-2 py-2">
            <button onClick={() => setData(null)} className="">
              <img src={"/assets/icons/close.svg"} className="dark:invert" />
            </button>
          </div>
          <img src={data.imgStation} className="h-1/3 w-full object-fill" />
          <div className="flex flex-col">
            <span className="w-full px-2 flex justify-between items-center">
              <span className="h-full flex flex-row my-2  items-center ">
                <h2 className="font-bold text-2xl capitalize">{data.name}</h2>
                <span className="px-1 flex items-center">
                  <img
                    src={getBatteryImg(data.battery)}
                    alt="battery level"
                    className="size-6 dark:invert"
                  />
                  <h3 className="text-sm">({data.battery}%)</h3>
                </span>
              </span>
              <h3>{data.type}</h3>
            </span>
            <hr className="bg-black dark:bg-white h-[0.1rem] mx-2" />
            <div className="flex flex-row p-2">
              <span className="flex flex-col w-2/3">
                <h3 className="font-medium">{data.location}</h3>
                <p>
                  {data.coordinates[0]} , {data.coordinates[1]}
                </p>
              </span>
              <Button
                className="w-1/3 text-white dark:invert"
                onClick={() => monitoringClick(data.name, data)}
              >
                Monitoring Page
              </Button>
            </div>

            <div className="pt-2 px-14">
              <Card>
                <CardDescription className="px-4 py-2">
                  Current Weather Data recorded as of {time}
                </CardDescription>
                <CardContent>
                  <div className="">
                    <span className="font-medium text-3xl flex justify-center">
                      Weather Data
                    </span>

                    <div className="p-2 pb-0">
                      <Table>
                        <TableBody>
                          {dataStation.map((data, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium w-[12.5%]">
                                <img
                                  src={data.iconSrc}
                                  width={25}
                                  className="dark:invert hidden md:block"
                                />
                              </TableCell>
                              <TableCell className="font-medium text-lg w-[60%]">
                                <span>{data.dataName}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <img
                                        src="assets/icons/help.svg"
                                        width={15}
                                        className="dark:invert hidden md:block"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{data.toolTip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              <TableCell className="font-bold text-lg">
                                {data.dataValue}
                                {data.dataLabel}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
