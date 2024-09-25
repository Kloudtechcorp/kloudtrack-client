import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { styles } from "@/lib/objects/arrays";
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
import { useStationContext } from "@/hooks/context/stationContext";
import { stationStaticType } from "@/types";
import { stationDashboardType } from "@/types/queryTypes";
import { getStationData } from "@/api/get";
import toast from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import {
  batteryPercentage,
  formatDateString,
  getBatteryImg,
  getWindDirectionLabel,
} from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const { stationNames } = useStationContext();
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<stationDashboardType | null>(null);
  const [stationDetails, setStationDetails] =
    useState<stationStaticType | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxStyle, setMapboxStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v11"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapboxStyle,
        center: [120.4818, 14.6417],
        zoom: 10,
        maxZoom: 15,
        minZoom: 8,
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        maxBounds: [117.27427453, 5.68100332277, 126.557423944, 18.5552273625],
      });

      mapRef.current = map;

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

      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }
  }, [mapboxStyle]);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapboxStyle,
        center: [120.4818, 14.6417],
        zoom: 11,
        maxZoom: 15,
        minZoom: 8,
        accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
        maxBounds: [117.27427453, 5.68100332277, 126.557423944, 18.5552273625],
      });

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
        stationNames.length > 0 &&
          stationNames.forEach((item) => {
            const el = document.createElement("div");
            el.className = "marker";

            const marker = new mapboxgl.Marker(el)
              .setLngLat([+item.longitude, +item.latitude])
              .addTo(map);

            marker.getElement().addEventListener("click", async () => {
              setIsLoading(true);
              setData(null);
              try {
                const stationData = await getStationData(item.stationName);
                if (!stationData) {
                  toast.error("Error fetching station data");
                  throw new Error("Error fetching data");
                }
                setData(stationData);
                setStationDetails(item);
                map.setCenter([+item.longitude, +item.latitude]);
                map.setZoom(13);
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
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
  }, [mapboxStyle, stationNames]);

  return (
    <>
      <div ref={mapContainer} className="w-full rounded-l-2xl">
        <Select
          onValueChange={(value) => {
            setMapboxStyle(value);
          }}
          defaultValue={mapboxStyle}
        >
          <SelectTrigger className="w-[180px] relative top-5 left-5 z-50">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {styles.map((style, key) => (
              <SelectItem value={style.uri} key={key}>
                {style.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading && (
        <div className="bg-white dark:bg-gray-950 xs:py-5 shadow-lg rounded-lg lg:top-0 lg:right-0 xs:bottom-0 xs:top-48 w-1/2 xs:max-w-screen-sm flex justify-center items-center">
          <PuffLoader color={"#545454"} size={500} />
        </div>
      )}
      {data && stationDetails && (
        <div
          className={`bg-white dark:bg-gray-950 xs:py-5 shadow-lg rounded-lg lg:top-0 lg:right-0 xs:bottom-0 xs:top-48 w-1/2 xs:max-w-screen-sm`}
        >
          <div className="absolute right-2 py-2">
            <button onClick={() => setData(null)} className="">
              <img src={"/assets/icons/close.svg"} className="dark:invert" />
            </button>
          </div>
          <img
            src={stationDetails.imageLink}
            className="h-1/3 w-full object-cover"
          />
          <div className="flex flex-col">
            <div className="w-full px-2 flex justify-between items-center">
              <div className="flex gap-2">
                <h2 className="font-bold my-2 text-2xl capitalize">
                  {stationDetails.stationName}
                </h2>
                <img
                  src={getBatteryImg(
                    batteryPercentage(data.currentweather.batteryVoltage)
                  )}
                />
              </div>
              <h3>{stationDetails.stationType.typeName}</h3>
            </div>
            <hr className="bg-black dark:bg-white h-[0.1rem] mx-2" />
            <div className="flex flex-row p-2">
              <span className="flex flex-col w-2/3">
                <h3 className="font-medium">
                  {stationDetails.barangay.barangay},{" "}
                  {stationDetails.municipality.municipality},{" "}
                  {stationDetails.province.province}
                </h3>
                <p>
                  {stationDetails.latitude} , {stationDetails.longitude}
                </p>
              </span>
              <Button
                className="w-1/3 dark:bg-secondary dark:text-gray-200"
                onClick={() =>
                  navigate(`/dashboard/${stationDetails.stationName}`)
                }
              >
                Monitoring Page
              </Button>
            </div>
            <div className="p-2 ">
              <Card>
                <CardDescription className="p-2">
                  Current Weather data recorded as of{" "}
                  {formatDateString(data.currentweather.recordedAt)}
                </CardDescription>
                <CardContent>
                  <div className="">
                    <div className="flex justify-center flex-col">
                      <div className="flex justify-center">
                        <span className="font-medium text-2xl">
                          Temperature
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <img
                                src="/assets/icons/help.svg"
                                width={15}
                                className="dark:invert hidden md:block"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Temperature is ...</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <span className="font-medium text-7xl text-center">
                        {Math.round(data.currentweather.heatIndex * 100) / 100}{" "}
                        <span className="text-5xl text-">°C</span>
                      </span>
                    </div>
                    <div className="mt-4 p-2 flex border ">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="assets/icons/heatIndex.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Heat Index</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Heat Index is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold  ">
                              {Math.round(data.currentweather.heatIndex * 100) /
                                100}{" "}
                              °C
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="assets/icons/humidity.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Humidity</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Humidity is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold  ">
                              {Math.round(data.currentweather.humidity * 100) /
                                100}{" "}
                              %
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="assets/icons/precip.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Precipitation</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Precipitation is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold text-sm ">
                              {Math.round(
                                data.currentweather.precipitation * 100
                              ) / 100}{" "}
                              mm/hr
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="assets/icons/airPressure.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Air Pressure</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Air Pressure is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold  ">
                              {data.currentweather.pressure} mb
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="/assets/icons/light.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Light Intensity</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Light Intensity is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold text-sm ">
                              {Math.round(data.currentweather.light * 100) /
                                100}{" "}
                              lux
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="/assets/icons/windDirection.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Wind Direction</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Wind Direction is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold text-sm ">
                              {Math.round(
                                data.currentweather.windDirection * 100
                              ) / 100}{" "}
                              {getWindDirectionLabel(
                                data.currentweather.windDirection
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium w-[12.5%]">
                              <img
                                src="/assets/icons/windSpeed.svg"
                                width={25}
                                className="dark:invert hidden md:block"
                              />
                            </TableCell>
                            <TableCell className="font-medium flex gap-1 items-center">
                              <span>Wind Speed</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <img
                                      src="/assets/icons/help.svg"
                                      width={15}
                                      className="dark:invert hidden md:block"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Wind Speed is ...</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                            <TableCell className="font-bold text-sm ">
                              {Math.round(data.currentweather.windSpeed * 100) /
                                100}{" "}
                              km/h
                            </TableCell>
                          </TableRow>
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
