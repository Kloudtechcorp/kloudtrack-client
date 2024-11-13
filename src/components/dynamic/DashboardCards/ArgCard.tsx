import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetArgData } from "../../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
import { useUserContext } from "@/hooks/context/authContext";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";
import VariableGraph from "../VariableGraph";
import NavigateIcon from "@/components/shared/NavigateIcon";
import AdminControls from "@/components/shared/AdminControls";
import MeasurementCard2 from "@/components/shared/MeasurementCard2";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ArgCard: React.FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetArgData(id);
  const { theme } = useTheme();
  const { user } = useUserContext();

  if (isLoading || !stationData) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <PuffLoader color={"#545454"} size={500} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !stationData.data || !stationData.station) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-3 gap-1 relative h-full items-center justify-center">
              <NoData />
            </div>
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
            <div className="flex items-center">
              <CardTitle className="w-full">
                {stationData.station.name}
              </CardTitle>
              {user.role === "ADMIN" && (
                <AdminControls
                  theme={theme}
                  station={stationData.station}
                  id={id}
                />
              )}
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
                className="rounded-md object-cover h-full"
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
            <Card className="flex flex-col h-full mb-3">
              <MeasurementCard2
                label="Precipitation"
                value={stationData.data.precipitation}
                unit="mm"
              />
              <VariableGraph
                stationId={id}
                weatherData="precipitation"
                repeat="minute"
                range={15}
                key={1}
                type={"arg"}
              />
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArgCard;
