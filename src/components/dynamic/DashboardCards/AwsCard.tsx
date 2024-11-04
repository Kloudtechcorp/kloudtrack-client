import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
// import { useGetAwsData } from "../../../hooks/react-query/queries";
import { useGetAwsData2 } from "../../../hooks/react-query/queries";

import { formatDateString, stationType } from "@/lib/utils";
import DataCards from "../../shared/DataCards";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUserContext } from "@/hooks/context/authContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { useTheme } from "../../theme-provider";
import NoData from "@/components/shared/NoData";

const AwsCard: React.FC<{ id: number }> = ({ id }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  // const { data: stationData, isLoading, isError } = useGetAwsData(id);
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

  if (isError) {
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
        <div className="flex flex-col gap-3 justify-between w-full">
          <div className="flex flex-col justify-between px-2 gap-3">
            <div className="flex flex-col">
              <CardTitle className="py-2">{stationData.station.name}</CardTitle>
              <hr className="h-[0.25rem] bg-black" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg xl:text-xl font-semibold">
                  {stationType(stationData.station.type)}
                </span>
                <span>{`${stationData.station.barangay}, ${stationData.station.municipality}, ${stationData.station.province}`}</span>
                <span className="text-sm">
                  {stationData.station.latitude},{" "}
                  {stationData.station.longitude}
                </span>
              </div>
            </div>
          </div>
          <div className="h-full px-2 pb-3 hidden lg:block">
            <img
              src={stationData.station.image}
              className="rounded-md object-cover h-full flex self-center"
              alt="Station"
            />
          </div>
        </div>
        {!stationData.data ? (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col pb-3 gap-1 relative h-full items-center justify-center">
              <NoData />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="px-2 py-1 flex items-center gap-2">
              <span className="w-full font-normal text-lg">
                Current Weather Conditions as of{" "}
                {formatDateString(stationData.data.recordedAt, "long")}
              </span>
              <Button
                className="button-icon"
                onClick={() => {
                  navigate(`/${stationData.station.name}`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill={theme === "dark" ? "#FFFFFF" : " #000000"}
                >
                  <path d="M280-160v-360q0-33 23.5-56.5T360-600h328l-64-64 56-56 160 160-160 160-56-56 64-64H360v360h-80Z" />
                </svg>
              </Button>

              {user.role === "ADMIN" && (
                <div className="lg:flex gap-2 justify-end items-end hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="button-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill={theme === "dark" ? "#FFFFFF" : " #000000"}
                        >
                          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-[720px]">
                      {/* <StationRegistration action="UPDATE" station={station} /> */}
                    </SheetContent>
                  </Sheet>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="button-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill={theme === "dark" ? "#FFFFFF" : " #000000"}
                        >
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          this station.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 active:bg-red-700"
                          onClick={() => {
                            console.log("delete");
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
            <div className="flex flex-col pb-3 gap-1">
              <DataCards
                currentweather={stationData.data}
                type={"DASHBOARD"}
                stationName={stationData.station.name}
                pastHourPrecip={stationData.pastHourPrecip}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AwsCard;
