import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface RangeRepeatSelectorProps {
  repeatData: string;
  setRepeatData: React.Dispatch<React.SetStateAction<string>>;
  rangeData: string;
  setRangeData: React.Dispatch<React.SetStateAction<string>>;
}

const RangeRepeatSelector: React.FC<RangeRepeatSelectorProps> = ({
  repeatData,
  setRepeatData,
  rangeData,
  setRangeData,
}) => {
  return (
    <>
      {" "}
      <div className="flex flex-col justify-center px-1">
        <span className="parameterOption">Repeat Value</span>
        <span className="text-3xl font-bold">
          <Select
            value={repeatData}
            onValueChange={(value) => setRepeatData(value)}
          >
            <SelectTrigger className="selectTrigger">
              <SelectValue placeholder="Repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minute">Minute</SelectItem>
              <SelectItem value="halfhour">30 Minutes</SelectItem>
              <SelectItem value="hour">Hour</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
      <div className="flex flex-col justify-center px-1">
        <span className="parameterOption">Data Range</span>
        <span className="text-3xl font-bold">
          <Select
            value={rangeData}
            onValueChange={(value) => setRangeData(value)}
          >
            <SelectTrigger className="selectTrigger">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24">A Day</SelectItem>
              <SelectItem value="72">3 Days</SelectItem>
              <SelectItem value="168">A Week</SelectItem>
              <SelectItem value="336">2 Weeks</SelectItem>
              <SelectItem value="672">A Month</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
    </>
  );
};

export default RangeRepeatSelector;
