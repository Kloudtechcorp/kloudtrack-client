import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetClmsData } from "../../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
import { useUserContext } from "@/hooks/context/authContext";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavigateIcon from "@/components/shared/icons/NavigateIcon";
import AdminControls from "@/components/shared/AdminControls";
import MeasurementCard from "@/components/shared/MeasurementCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ClmsCard: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetClmsData(id);
  const { theme } = useTheme();
  const { user } = useUserContext();

  if (isLoading || !stationData) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-col gap-3 justify-center items-center w-full">
          <PuffLoader color="#545454" size={500} />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-col justify-center items-center w-full">
          <NoData />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cardContainer flex flex-row">
      <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
        <div className="stationDetailsDiv">
          <div className="flex flex-col px-2 ">
            <div className="flex items-center">
              <CardTitle className="w-full">
                {stationData.station.name}
              </CardTitle>
            </div>
            <hr className="h-[0.25rem] bg-black" />
            <div className="flex flex-col">
              <span className="text-base md:text-lg xl:text-xl font-semibold">
                {stationType(stationData.station.type)}
              </span>
              <span className="text-base">{`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}</span>
              <span className="text-sm">
                {stationData.station.latitude}, {stationData.station.longitude}
              </span>
            </div>
          </div>
          {stationData.station.image && (
            <div className="h-full px-2 pb-3 hidden lg:block">
              <img
                src={stationData.station.image}
                className="rounded-md object-cover aspect-square h-full w-full"
                alt="Station"
              />
            </div>
          )}
        </div>

        {!stationData.data ? (
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <NoData />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="stationDataDiv">
              <span className="w-full font-normal text-lg">
                Current Weather Conditions as of{" "}
                {formatDateString(stationData.data.recordedAt, "long")}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="button-icon"
                      onClick={() => navigate(`/${stationData.station.name}`)}
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
            <div className="flex flex-col pb-3 gap-2 h-full w-full">
              <div className="flex h-full w-full gap-2">
                <MeasurementCard
                  label="Distance"
                  value={stationData.data.distance}
                  unit="cm"
                />
                <MeasurementCard
                  label="Temperature"
                  value={stationData.data.temperature}
                  unit="C°"
                />
              </div>
              <div className="flex h-full w-full gap-2">
                <MeasurementCard
                  label="Air Pressure"
                  value={stationData.data.pressure}
                  unit="mb"
                />
                <MeasurementCard
                  label="Humidity"
                  value={stationData.data.humidity}
                  unit="%"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClmsCard;
