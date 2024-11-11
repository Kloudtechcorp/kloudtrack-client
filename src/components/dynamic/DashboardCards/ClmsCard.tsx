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
import NavigateIcon from "@/components/shared/NavigateIcon";
import AdminControls from "@/components/shared/AdminControls";
import MeasurementCard from "@/components/shared/MeasurementCard";

const ClmsCard: React.FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetClmsData(id);
  const { theme } = useTheme();
  const { user } = useUserContext();

  const isAdmin = user.role === "ADMIN";

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
        <div className="flex flex-col justify-between w-full gap-3 px-2">
          <div>
            <CardTitle className="py-2">{stationData.station.name}</CardTitle>
            <hr className="h-[0.25rem] bg-black" />
            <div className="text-base md:text-lg xl:text-xl font-semibold">
              {stationType(stationData.station.type)}
            </div>
            <div>{`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}</div>
            <div className="text-sm">
              {stationData.station.latitude}, {stationData.station.longitude}
            </div>
          </div>
          <div className="hidden lg:block h-full pb-3">
            <img
              src={stationData.station.image}
              alt="Station"
              className="rounded-md object-cover h-full flex self-center"
            />
          </div>
        </div>

        {!stationData.data ? (
          <NoData />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="px-2 py-1 flex items-center gap-2">
              <span className="w-full font-normal text-lg">
                Current Weather Conditions as of{" "}
                {formatDateString(stationData.data.recordedAt, "long")}
              </span>
              <Button
                className="button-icon"
                onClick={() => navigate(`/${stationData.station.name}`)}
              >
                <NavigateIcon theme={theme} />
              </Button>
              {isAdmin && (
                <AdminControls
                  theme={theme}
                  station={stationData.station}
                  id={id}
                />
              )}
            </div>
            <div className="flex flex-col pb-3 gap-1 h-full">
              <MeasurementCard
                label="Distance"
                value={stationData.data.distance}
                unit="cm"
              />
              <div className="flex gap-2 w-full">
                <MeasurementCard
                  label="Temperature"
                  value={stationData.data.temperature}
                  unit="C°"
                />
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
