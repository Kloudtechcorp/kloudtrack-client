import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetRlmsData } from "../../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
import { useUserContext } from "@/hooks/context/authContext";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";
import VariableGraph from "../VariableGraph";
import NavigateIcon from "@/components/shared/NavigateIcon";
import AdminControls from "@/components/shared/AdminControls";
import MeasurementCard from "@/components/shared/MeasurementCard";

const RlmsCard: React.FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useUserContext();
  const { data: stationData, isLoading, isError } = useGetRlmsData(id);
  const isAdmin = user.role === "ADMIN";

  if (isLoading || !stationData) {
    return (
      <Card className="cardContainer flex flex-row">
        <CardContent className="flex flex-row w-full p-0 gap-2">
          <div className="flex flex-col gap-3 justify-center items-center w-full">
            <PuffLoader color="#545454" size={500} />
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

  // const { station, data } = stationData;
  const { station } = stationData;

  return (
    <Card className="cardContainer flex flex-row">
      <CardContent className="flex flex-col lg:flex-row w-full p-0 gap-2">
        <div className="flex flex-col gap-3 justify-between w-full">
          <div className="flex flex-col justify-between px-2 gap-3">
            <CardTitle className="py-2">{station.name}</CardTitle>
            <hr className="h-[0.25rem] bg-black" />
            <div className="flex flex-col">
              <span className="text-base md:text-lg xl:text-xl font-semibold">
                {stationType(station.type)}
              </span>
              <span>{`${station.barangay}, ${station.municipality}, ${station.province}`}</span>
              <span className="text-sm">
                {station.latitude}, {station.longitude}
              </span>
            </div>
          </div>
          <div className="h-full px-2 pb-3 hidden lg:block">
            <img
              src={station.image}
              className="rounded-md object-cover h-full flex self-center"
              alt="Station"
            />
          </div>
        </div>

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

          <div className="flex flex-col pb-3 gap-1">
            <MeasurementCard
              label="Distance"
              value={stationData.data.distance}
              unit="mm"
            />

            <Card className="w-full h-full">
              <CardContent className="px-0 p-0 h-full flex justify-center items-center">
                <div className="text-center w-full flex flex-col h-full">
                  <div className="border border-transparent border-b-gray-200 w-full dark:bg-slate-800 py-1">
                    <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                      Distance from water level
                    </span>
                  </div>
                  <div className="text-xl flex h-full items-center justify-center pr-5 py-5 pl-0">
                    <VariableGraph
                      stationId={id}
                      weatherData="distance"
                      repeat="minute"
                      range={15}
                      key={1}
                      type={"rlms"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RlmsCard;
