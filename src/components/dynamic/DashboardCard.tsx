import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import HashLoader from "react-spinners/HashLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
import { useGetStationData } from "../../hooks/react-query/queries";
import { formatDateString, stationType } from "@/lib/utils";
import DataCards from "../shared/DataCards";
import { stationStaticType } from "@/types";

const DashboardCard: React.FC<{ station: stationStaticType }> = ({
  station,
}) => {
  const navigate = useNavigate();
  const {
    data: stationData,
    isLoading,
    isError,
  } = useGetStationData(station.stationName);

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

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card className="cardContainer flex flex-row">
      <CardContent className="flex flex-row w-full p-0 gap-2">
        <div className="flex flex-col gap-3 justify-between w-full">
          <div className="flex flex-col justify-between px-2 gap-3">
            <div className="flex flex-col">
              <Button
                variant="link"
                className="dark:invert text-lg md:text-xl xl:text-2xl font-bold self-start p-0 hover:text-[#fbd008] ease-in-out duration-300 hover:scale-110"
                onClick={() => {
                  navigate(`/${station.stationName}`);
                }}
              >
                {station.stationName}
              </Button>
              <hr className="h-[0.25rem] bg-black" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg xl:text-xl font-semibold">
                  {stationType(station.stationType.typeName)}
                </span>
                <span>{`${station.barangay.barangay}, ${station.municipality.municipality}, ${station.province.province}`}</span>
                <span className="text-sm">
                  {station.latitude}, {station.longitude}
                </span>
              </div>
            </div>
          </div>
          <div className="h-full px-2 pb-3">
            <img
              src={station.imageLink}
              className="rounded-md object-cover h-full flex self-center"
              alt="Station"
            />
          </div>
        </div>
        {!stationData.currentweather ? (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-3 gap-1">
              <div>No weather data found</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full px-2 py-1 font-normal text-lg">
              Current Weather Conditions as of{" "}
              {formatDateString(stationData.currentweather.recordedAt)}
            </div>
            <div className="flex flex-col pb-3 gap-1">
              <DataCards currentweather={stationData.currentweather} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
