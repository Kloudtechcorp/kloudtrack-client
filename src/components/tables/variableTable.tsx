"use client";

import React, { useEffect, useState } from "react";
import { useStationData } from "@/lib/context/stationContext";
import { useUserContext } from "@/lib/context/userContext"; // Ensure this is the correct path to your UserContext

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VariableTableProps {
  containerId: string;
  stationIndex: number;
}

const VariableTable: React.FC<VariableTableProps> = ({
  containerId,
  stationIndex,
}) => {
  const { stationData } = useStationData();
  const { selectedDataType } = useUserContext(); // Access the selected data type from UserContext
  const [dataKey, setDataKey] = useState<string>("temperature"); // Default to 'temperature'

  useEffect(() => {
    // Update the dataKey based on the selectedDataType
    setDataKey(selectedDataType);
    console.log("selectedDataType in table is ", selectedDataType);
  }, [selectedDataType]);

  if (!stationData || stationIndex >= stationData.length) {
    return <div>Loading...</div>;
  }

  const station = stationData[stationIndex];

  return (
    <div id={containerId} className="h-[32.5%] flex flex-col w-full">
      <span className="flex flex-col items-center">
        <h2 className="text-lg font-bold ">{station.stationName}</h2>
        <h3 className="text-xs ">{station.location}</h3>
      </span>
      {station.details && station.details[dataKey] && (
        <div className="flex flex-col w-full bg-white dark:bg-gray-500">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center border bg-yellow-200 text-lg font-bold dark:bg-slate-800 dark:text-white">
                  Information
                </TableHead>
                <TableHead className="text-center border bg-yellow-200 text-lg font-bold dark:bg-slate-800 dark:text-white">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {station.details[dataKey].map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="border text-center">
                    {row.label || "No label available"}
                  </TableCell>
                  <TableCell className="border text-center">
                    {row.value || "No value available"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default VariableTable;
