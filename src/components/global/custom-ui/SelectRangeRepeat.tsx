import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const RangeRepeatSelector: React.FC<RangeRepeatSelectorProps> = ({
  repeatData,
  setRepeatData,
  rangeData,
  setRangeData,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-1">
        <span className="text-sm px-1">Interval</span>
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
            </SelectContent>
          </Select>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center px-1">
        <span className="selectTitle">Data Range</span>
        <span className="text-3xl font-bold">
          <Select
            value={rangeData}
            onValueChange={(value) => setRangeData(value)}
          >
            <SelectTrigger className="selectTrigger">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24">1 Day</SelectItem>
              <SelectItem value="72">3 Days</SelectItem>
              <SelectItem value="168">1 Week</SelectItem>
              <SelectItem value="336">2 Weeks</SelectItem>
              <SelectItem value="672">1 Month</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
    </>
  );
};

export default RangeRepeatSelector;
