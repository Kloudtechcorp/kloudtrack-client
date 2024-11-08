import React from "react";
import { stationStaticType } from "@/types";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

interface MapImageProps {
  // batteryVoltage: number;
  stationDetails: stationStaticType;
}

const MapImage: React.FC<MapImageProps> = ({
  // batteryVoltage,
  stationDetails,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full sm:w-1/2 md:w-full ">
      <img
        src={stationDetails.image}
        alt={stationDetails.name}
        className="h-72 w-full object-cover"
      />

      <div className="w-full px-2 flex justify-between items-center mt-2">
        <div className="flex gap-1">
          <h2 className="font-bold text-xl md:text-2xl capitalize">
            {stationDetails.name}
          </h2>
        </div>
        <h3>{stationDetails.type}</h3>
      </div>

      <hr className="bg-black dark:bg-white h-[0.1rem] mx-2" />

      <div className="flex flex-row p-2">
        <span className="flex flex-col w-2/3">
          <h3 className="font-medium text-xs md:text-sm lg:text-base">
            {stationDetails.barangay}, {stationDetails.municipality},{" "}
            {stationDetails.province}
          </h3>
          <p className="font-medium text-xs md:text-sm lg:text-base">
            {stationDetails.latitude} , {stationDetails.longitude}
          </p>
        </span>
        <Button
          className="w-1/3 text-white dark:text-gray-200 text-xs md:text-sm lg:text-base"
          onClick={() => navigate(`/${stationDetails.name}`)}
        >
          Monitoring Page
        </Button>
      </div>
    </div>
  );
};

export default MapImage;
