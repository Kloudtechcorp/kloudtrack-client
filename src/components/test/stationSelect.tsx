// src/components/StationSelect.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locationArray } from "@/lib/objects/arrays";
import { WeatherDataProps } from "@/lib/types";

type StationSelectProps = {
  currentData?: WeatherDataProps;
  onValueChange: (stationName: string) => void;
};

const StationSelect: React.FC<StationSelectProps> = ({
  currentData,
  onValueChange,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-40 dark:bg-slate-950 border-0 text-3xl font-bold p-0">
        <SelectValue placeholder={currentData?.name || "Select Station"} />
      </SelectTrigger>
      <SelectContent>
        {locationArray.map((station) => (
          <SelectItem key={station.stationId} value={station.name}>
            {station.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StationSelect;
