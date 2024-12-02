import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetRlmsData } from "../../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
// import { useUserContext } from "@/hooks/context/authContext";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";
import VariableGraph from "../VariableGraph";
import NavigateIcon from "@/components/shared/icons/NavigateIcon";
// import AdminControls from "@/components/shared/AdminControls";
import MeasurementCard2 from "@/components/shared/MeasurementCard2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RlmsCard: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const { user } = useUserContext();
  const { data: stationData, isLoading, isError } = useGetRlmsData(id);

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
              <span className="currentWeather">
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
            <Card className="flex flex-col h-full mb-3">
              <MeasurementCard2
                label="Distance"
                value={stationData.data.distance}
                unit="mm"
              />
              <VariableGraph
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

export default RlmsCard;
