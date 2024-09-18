import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export type stationType = {
  name: string;
  type: string;
  location: string;
  status: string;
  battery: string;
}[];

const Stations = () => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<stationType>([]);

  const stations: stationType = [
    {
      name: "Alpha",
      type: "Automated Weather Station",
      location: "Orion, Bataan",
      status: "Active",
      battery: "100%",
    },
    {
      name: "Bravo",
      type: "Automated Weather Station",
      location: "Pilar, Bataan",
      status: "Active",
      battery: "40%",
    },
    {
      name: "Charlie",
      type: "Automated Weather Station",
      location: "Limay, Bataan",
      status: "Active",
      battery: "70%",
    },
    {
      name: "Delta",
      type: "Automated Weather Station",
      location: "Balanga, Bataan",
      status: "Active",
      battery: "85%",
    },
    {
      name: "Echo",
      type: "Automated Weather Station",
      location: "Mariveles, Bataan",
      status: "Active",
      battery: "90%",
    },
  ];

  useEffect(() => {
    const filtered = stations.filter((station) =>
      Object.values(station).some((value) =>
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  }, [query]);

  return (
    <div className="flex flex-col w-full">
      <div className="px-28 p-4">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="px-28">
        <Table>
          <TableCaption className="text-left">
            Note: Click the station to go to a corresponding page.
          </TableCaption>
          <TableHeader className="w-full border p-0 dark:text-white">
            <TableRow className="w-full">
              <TableHead className="text-center dark:text-white">
                Station Name
              </TableHead>
              <TableHead className="text-center dark:text-white">
                Station Type
              </TableHead>
              <TableHead className="text-center dark:text-white">
                Location
              </TableHead>
              <TableHead className="text-center dark:text-white">
                Status
              </TableHead>
              <TableHead className="text-center dark:text-white">
                Battery Percent
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((station, index) => (
              <TableRow key={index} className="hover-row">
                <TableCell className="font-medium text-center">
                  {station.name}
                </TableCell>
                <TableCell className="text-center">{station.type}</TableCell>
                <TableCell className="text-center">
                  {station.location}
                </TableCell>
                <TableCell className="text-center">{station.status}</TableCell>
                <TableCell className="text-center">{station.battery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Stations;
