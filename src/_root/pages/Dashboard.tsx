import { Card, CardContent } from "@/components/ui/card";
import { locationArray } from "@/lib/objects/arrays";
import { cardsData } from "@/lib/objects/dummy";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { stationDashboardType } from "@/lib/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardCard from "@/components/dynamic/DashboardCard";
const server = import.meta.env.VITE_SERVER_LOCAL;

const getWindDirectionLabel = (value: number) => {
  if (value === 0 || value === 360) {
    return "N";
  } else if (value > 0 && value < 90) {
    return "NE";
  } else if (value === 90) {
    return "E";
  } else if (value > 90 && value < 180) {
    return "SE";
  } else if (value === 180) {
    return "S";
  } else if (value > 180 && value < 270) {
    return "SW";
  } else if (value === 270) {
    return "W";
  } else if (value > 270 && value < 360) {
    return "NW";
  } else {
    return `${value}`;
  }
};
const getBatteryImg = (level: number) => {
  if (level == 100) {
    return "assets/img/batteryFull.svg";
  } else if (level >= 80) {
    return "assets/img/battery6Bar.svg";
  } else if (level >= 50) {
    return "assets/img/battery5Bar.svg";
  } else if (level >= 30) {
    return "assets/img/battery4Bar.svg";
  } else if (level > 0) {
    return "assets/img/battery2Bar.svg";
  } else if (level == 0) {
    return "assets/img/battery0Bar.svg";
  }
};

type stationNamesType = {
  stationName: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stationNames, setStationNames] = useState<stationNamesType[] | []>([]);

  useEffect(() => {
    const fetchStationNames = async () => {
      try {
        const response = await fetch(`${server}/weather/station-names`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setStationNames(data.data);
        } else {
          toast.error(`${data.error}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStationNames();
  }, []);

  return (
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem]">
      <div className="flex flex-col gap-3 md:gap-5 w-full container p-2">
        {stationNames.map((station) => (
          <DashboardCard name={station.stationName} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
