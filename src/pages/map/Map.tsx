import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import { useTheme } from "@/components/theme-provider";
import { useUserContext } from "@/hooks/custom-hooks/authContext";
import {
  CoastalMapCard,
  MapImage,
  MapLegend,
  RainMapCard,
  RiverMapCard,
  WeatherMapCard,
} from "./components";
import {
  CoastalDashboard,
  RainDashboard,
  RiverDashboard,
  WeatherDashboard,
} from "@/types/station.type";
import {
  getCoastalData,
  getRainData,
  getRiverData,
  getWeatherData,
} from "@/services/stationService";
import { getStationData } from "@/services/userService";
import { StationDetails } from "@/types/user.type";
import { MAPBOX_STYLES } from "@/constants";

const Map = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [awsData, setAwsData] = useState<WeatherDashboard | null>(null);
  const [argData, setArgData] = useState<RainDashboard | null>(null);
  const [rlmsData, setRlmsData] = useState<RiverDashboard | null>(null);
  const [clmsData, setClmsData] = useState<CoastalDashboard | null>(null);
  const { theme } = useTheme();
  const [stationDetails, setStationDetails] = useState<StationDetails | null>(
    null
  );
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxStyle, setMapboxStyle] = useState(
    theme === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11"
  );

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
        zoom: 10,
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
        user.stations.length > 0 &&
          user.stations.forEach(async (item) => {
            const stationInfo = await getStationData(item.id);
            const el = document.createElement("div");
            if (item.type === "ARG") {
              el.className = "marker-arg";
            } else if (item.type === "RLMS") {
              el.className = "marker-rlms";
            } else if (item.type === "CLMS") {
              el.className = "marker-clms";
            } else el.className = "marker-aws";
            if (!stationInfo) {
              return console.log(stationInfo);
            }
            const lat = +stationInfo.latitude;
            const lng = +stationInfo.longitude;

            const marker = new mapboxgl.Marker(el)
              .setLngLat([lng, lat])
              .addTo(map);

            const popup = new mapboxgl.Popup({
              offset: 25,
              closeButton: false,
            }).setHTML(`
              <div class="${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              } p-4 rounded-md ">
                <p class="font-semibold text-sm">${stationInfo.name}</p>
                <p class="text-sm text-gray-500">${stationInfo.barangay}</p>
              </div>
            `);

            marker.getElement().addEventListener("click", async () => {
              setIsLoading(true);
              setStationDetails(null);
              setArgData(null);
              setAwsData(null);
              setRlmsData(null);
              try {
                if (item.type === "AWS") {
                  const stationData = await getWeatherData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setAwsData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "ARG") {
                  const stationData = await getRainData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setArgData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "RLMS") {
                  const stationData = await getRiverData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setRlmsData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "CLMS") {
                  const stationData = await getCoastalData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setClmsData(stationData);
                  setStationDetails(stationInfo);
                }
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            });

            el.addEventListener("mouseenter", () => {
              marker.setPopup(popup).togglePopup();
              el.style.width = "75px";
              el.style.height = "75px";
              el.style;
            });

            el.addEventListener("mouseleave", () => {
              marker.togglePopup();
              el.style.width = "50px";
              el.style.height = "50px";
            });

            markerList.push(marker);
          });
      });

      return () => map.remove();
    }
  }, [mapboxStyle, user]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <div ref={mapContainer} className="h-full w-full rounded-l-2xl">
          <MapLegend />
          <Select
            onValueChange={(value) => {
              setMapboxStyle(value);
              setStationDetails(null);
              setAwsData(null);
              setArgData(null);
              setRlmsData(null);
            }}
            defaultValue={mapboxStyle}
          >
            <SelectTrigger className="w-[180px] relative top-5 left-5 z-50">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {MAPBOX_STYLES.map((style, key) => (
                <SelectItem value={style.uri} key={key}>
                  {style.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isLoading && (
          <div className="bg-white dark:bg-secondary shadow-lg rounded-lg lg:top-0 lg:right-0 xs:bottom-0 xs:top-48 w-1/2 xs:max-w-screen-sm flex justify-center items-center">
            <PuffLoader color={"#545454"} size={500} />
          </div>
        )}
        {stationDetails && (
          <div
            className={`bg-white dark:bg-secondary shadow-lg rounded-lg lg:top-0 lg:right-0 xs:bottom-0 xs:top-48 w-full h-1/2 md:w-1/2 md:h-full overflow-auto`}
          >
            <div className=" flex flex-col sm:flex-row md:flex-col">
              <MapImage stationDetails={stationDetails} />
              <div className="absolute right-5 py-2">
                <Button
                  variant="default"
                  onClick={() => {
                    setStationDetails(null);
                    setAwsData(null);
                    setArgData(null);
                    setRlmsData(null);
                  }}
                >
                  <img
                    src={"/assets/icons/close.svg"}
                    className="invert dark:invert-0"
                  />
                </Button>
              </div>

              {(stationDetails.type === "AWS" && (
                <WeatherMapCard data={awsData} />
              )) ||
                (stationDetails.type === "ARG" && (
                  <RainMapCard data={argData} id={stationDetails.id} />
                )) ||
                (stationDetails.type === "RLMS" && (
                  <RiverMapCard data={rlmsData} id={stationDetails.id} />
                )) ||
                (stationDetails.type === "CLMS" && (
                  <CoastalMapCard data={clmsData} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
