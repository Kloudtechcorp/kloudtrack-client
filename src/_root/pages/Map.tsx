import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { styles } from "@/lib/objects/arrays";
import MapImage from "@/components/dynamic/MapImage";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stationStaticType } from "@/types";
import {
  argDashboardType,
  awsDashboardType,
  clmsDashboardType,
  rlmsDashboardType,
} from "@/types/queryTypes";
import {
  getArgData,
  getAwsData,
  getClmsData,
  getRlmsData,
  getStationData,
} from "@/api/get";
import toast from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import AwsMapCard from "@/components/shared/MapCards/AwsMapCard";
import ArgMapCard from "@/components/shared/MapCards/ArgMapCard";
import ClmsMapCard from "@/components/shared/MapCards/ClmsMapCard";
import RlmsMapCard from "@/components/shared/MapCards/RlmsMapCard";
import { useTheme } from "@/components/theme-provider";
import { useUserContext } from "@/hooks/context/authContext";
import MapLegend from "@/components/shared/MapCards/MapLegend";

const Map = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [awsData, setAwsData] = useState<awsDashboardType | null>(null);
  const [argData, setArgData] = useState<argDashboardType | null>(null);
  const [rlmsData, setRlmsData] = useState<rlmsDashboardType | null>(null);
  const [clmsData, setClmsData] = useState<clmsDashboardType | null>(null);
  const { theme } = useTheme();
  const [stationDetails, setStationDetails] =
    useState<stationStaticType | null>(null);
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
        user.stations.length > 0 &&
          user.stations.forEach(async (item) => {
            const stationInfo = await getStationData(item.name);
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

            const popup = new mapboxgl.Popup({ offset: 25, closeButton: false})
              .setHTML(`<p>${stationInfo.name} at ${stationInfo.barangay}</p>`);

            marker.getElement().addEventListener("click", async () => {
              setIsLoading(true);
              setStationDetails(null);
              setArgData(null);
              setAwsData(null);
              setRlmsData(null);
              try {
                if (item.type === "AWS") {
                  const stationData = await getAwsData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setAwsData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "ARG") {
                  const stationData = await getArgData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setArgData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "RLMS") {
                  const stationData = await getRlmsData(item.id);
                  if (!stationData) {
                    toast.error("Error fetching station data");
                    throw new Error("Error fetching data");
                  }
                  setRlmsData(stationData);
                  setStationDetails(stationInfo);
                } else if (item.type === "CLMS") {
                  const stationData = await getClmsData(item.id);
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
                <AwsMapCard data={awsData} />
              )) ||
                (stationDetails.type === "ARG" && (
                  <ArgMapCard data={argData} id={stationDetails.id} />
                )) ||
                (stationDetails.type === "RLMS" && (
                  <RlmsMapCard data={rlmsData} id={stationDetails.id} />
                )) ||
                (stationDetails.type === "CLMS" && (
                  <ClmsMapCard data={clmsData} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
