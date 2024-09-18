import { stationDashboardType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import HashLoader from "react-spinners/HashLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";
const server = import.meta.env.VITE_SERVER_LOCAL;

type stationNamesType = {
  name: string;
};

const DashboardCard = ({ name }: stationNamesType) => {
  const [stationData, setStationData] = useState<stationDashboardType>();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      const getCurrentData = async () => {
        try {
          const response = await fetch(`${server}/weather/${name}`, {
            credentials: "include",
          });
          const data = await response.json();
          if (data) {
            setStationData(data.data);
          } else console.log("error fetching data");
        } catch (error) {
          console.log(error);
        }
      };
      getCurrentData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stationType = (type: string) => {
    if (type === "TC") {
      return "Tomato Company";
    } else if (type === "AWS") {
      return "Automated Weather Station";
    } else if (type === "RLMS") {
      return "River Level Monitoring System";
    } else if (type === "ARG") {
      return "Automated Rain Gauge";
    } else return "Not Defined";
  };

  return (
    <>
      {stationData ? (
        <Card
          key={stationData.stationName}
          className="cardContainer flex flex-row"
        >
          <CardContent className="flex flex-row w-full p-0 gap-2">
            <div className="flex flex-col gap-3 justify-between w-full">
              <div className="flex flex-col justify-between px-2 gap-3">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <Button
                      variant="link"
                      className="dark:invert text-lg md:text-xl xl:text-2xl font-bold self-start p-0 hover:text-[#fbd008] ease-in-out duration-300 hover:scale-110"
                      onClick={() => {
                        navigate(`/dashboard/${stationData.stationName}`);
                      }}
                    >
                      {stationData.stationName}
                    </Button>
                  </div>
                  <hr className="h-[0.25rem] bg-black"></hr>
                  <div className="flex flex-col">
                    <span className="text-base md:text-lg xl:text-xl font-semibold">
                      {stationType(stationData.stationType.typeName)}
                    </span>
                    <span>{`${stationData.barangay.barangay}, ${stationData.municipality.municipality}, ${stationData.province.province}`}</span>
                    <span className="text-sm">
                      {stationData.latitude},{stationData.longitude}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-full px-2 pb-3">
                <img
                  src={stationData.imageLink}
                  className="rounded-md object-cover h-full flex self-center"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full px-2 py-1 font-bold text-xl">
                Current Weather Conditions
              </div>
              <div className="flex flex-col pb-3 gap-1 ">
                <div className="grid grid-cols-3 w-full gap-3 px-2 justify-center">
                  {stationData.currentweather ? (
                    <>
                      {stationData.currentweather.map((data, key) => (
                        <>
                          <Card className="h-48 w-56" key={key}>
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Heat Index
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.heatIndex * 100) / 100}{" "}
                                    C&deg;
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Temperature
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.temperature * 100) / 100}
                                    C&deg;
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Humidity
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.humidity * 100) / 100} %
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Pressure
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.pressure * 100) / 100} mb
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Wind Speed
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.windSpeed * 100) / 100}kph
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Wind Direction
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.windDirection * 100) / 100}
                                    &deg;
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Gust
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.gust * 100) / 100}kph
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Light
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.light * 100) / 100}kph
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="h-48 w-56">
                            <CardContent className="px-0 p-0 h-full">
                              <div className="text-center w-full flex flex-col h-full">
                                <div className="border w-full bg-yellow-200 dark:bg-slate-800">
                                  <span className="font-bold xl:text-xl lg:text-lg md:text-base sm:text-xs">
                                    Precipitation
                                  </span>
                                </div>
                                <div className="text-xl flex h-full items-center justify-center">
                                  <span className="xl:text-4xl lg:text-3xl md:text-xl sm: text-sm">
                                    {Math.round(data.precipitation * 100) / 100}
                                    mm
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      ))}
                    </>
                  ) : (
                    <div>Loading</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full h-full flex justify-center items-center relative">
          <HashLoader
            color={"#fbd008"}
            size={250}
            className="absolute top-0 left-[17.5rem] z-50"
          />
          <PuffLoader
            color={"#545454"}
            size={500}
            className="absolute top-0 left-[-6rem]"
          />
        </div>
      )}
    </>
  );
};

export default DashboardCard;

// {key !== 8 ? (

// ) : (
//   <div className="flex py-10 justify-center items-center overflow-hidden">
//     <div
//       className="compass"
//       style={
//         {
//           "--compass-size": "7rem",
//         } as React.CSSProperties
//       }
//     >
//       <div className="direction">
//         <p>
//           {getWindDirectionLabel(data.value2)}
//           <span>{data.value} kph</span>
//         </p>
//       </div>
//       <div
//         className={`arrow ${getWindDirectionLabel(
//           data.value2
//         )}`}
//       ></div>
//     </div>
//   </div>
// )}
