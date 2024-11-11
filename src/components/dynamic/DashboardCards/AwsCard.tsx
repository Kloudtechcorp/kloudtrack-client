import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetAwsData2 } from "../../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
import DataCards from "../../shared/DataCards";
import { useUserContext } from "@/hooks/context/authContext";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";
import NavigateIcon from "@/components/shared/NavigateIcon";
import AdminControls from "@/components/shared/AdminControls";

interface AwsCardProps {
  id: number;
}

const AwsCard: React.FC<AwsCardProps> = ({ id }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetAwsData2(id);
  const { theme } = useTheme();

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
        <div className="flex flex-col gap-3 justify-between w-1/2">
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
        {stationData.data ? (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <span className="w-full font-medium text-lg ">
                Current Weather Conditions as of{" "}
                {formatDateString(stationData.data.recordedAt, "long")}
              </span>
              <Button
                className="button-icon"
                onClick={() => navigate(`/${stationData.station.name}`)}
                variant="ghost"
              >
                <NavigateIcon theme={theme} />
              </Button>
            </div>
            <div className="flex flex-col pb-3 gap-1">
              <DataCards
                currentweather={stationData.data}
                type="DASHBOARD"
                stationName={stationData.station.name}
                pastHourPrecip={stationData.pastHourPrecip}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-3 gap-1 items-center justify-center">
              <NoData />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AwsCard;
