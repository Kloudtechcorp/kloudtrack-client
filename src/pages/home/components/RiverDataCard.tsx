import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { formatDateString, stationType } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import NoData from "@/pages/error/NoData";
import NavigateIcon from "@/components/global/icons/NavigateIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Map, { Marker } from "react-map-gl";
import { useGetRiverData } from "@/hooks/queries/useStations";
import MeasurementCard from "@/components/global/custom-ui/MeasurementCard";
import CustomChart from "@/components/global/custom-ui/CustomChart";

const RiverDataCard: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetRiverData(id);
  const [clicked, setClicked] = useState(false);
  const { theme } = useTheme();
  const [mapboxStyle] = useState(
    theme === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11"
  );

  if (isLoading || !stationData) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="puffLoaderCardContent">
          <div className="puffLoaderDiv ">
            <PuffLoader color={"#545454"} size={"100%"} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !stationData?.data || !stationData?.station) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-2 w-full">
            <NoData />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cardContainer flex flex-row">
      <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
        <div className="stationDetailsDiv">
          <div className="flex flex-col px-2 ">
            <div className="stationNameDiv">
              <CardTitle className="stationName">
                {stationData.station.name}
              </CardTitle>
            </div>
            <hr className="h-[0.25rem] bg-black" />
            <div className="flex flex-col">
              <span className="stationType">
                {stationType(stationData.station.type)}
              </span>
              <span className="stationLocation">{`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}</span>
              <span className="stationLocation">
                {stationData.station.latitude}, {stationData.station.longitude}
              </span>
            </div>
          </div>
          <div
            className="h-full px-2 pb-3 hidden lg:block"
            onClick={() => setClicked(!clicked)}
          >
            <div className="max-w-[30rem] w-full aspect-square">
              {!clicked ? (
                <img
                  src={stationData.station.image}
                  className="inset-0 rounded-md object-cover w-full h-full"
                  alt="Station"
                />
              ) : (
                <Map
                  mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                  initialViewState={{
                    longitude: +stationData.station.longitude,
                    latitude: +stationData.station.latitude,
                    zoom: 9,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "calc(var(--radius) - 2px)",
                  }}
                  mapStyle={mapboxStyle}
                >
                  <Marker
                    latitude={+stationData.station.latitude}
                    longitude={+stationData.station.longitude}
                    anchor="bottom"
                  >
                    <img
                      src="/assets/icons/pointer-rlms.svg"
                      alt="ARG Marker"
                      className="size-12"
                    />
                  </Marker>
                </Map>
              )}
            </div>
          </div>
        </div>

        {!stationData.data ? (
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <NoData />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="stationDataDiv">
              <span className="currentWeather">
                Current Weather Conditions as of{" "}
                {formatDateString(stationData.data.recordedAt, "long")}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="button-icon"
                      onClick={() => navigate(`/${stationData.station.id}`)}
                      variant="ghost"
                    >
                      <NavigateIcon theme={theme} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Move to station</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Card className="flex flex-col h-full mb-3">
              <MeasurementCard
                label="Distance"
                value={stationData.data.distance}
                unit="mm"
              />
              <CustomChart
                stationId={id}
                weatherData="distance"
                repeat="minute"
                range={15}
                key={1}
                type={"rlms"}
              />
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiverDataCard;
