"use client";

import { useState } from "react";
import { downloadCsv, CsvColumn } from "../../lib/objects/csv";

import * as React from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const columns: CsvColumn[] = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "species",
    title: "Animal Species",
  },
  {
    key: "num_of_paws",
    title: "Paws",
  },
  {
    key: "willing_to_run",
    title: "Willing to Run",
    formatValue: (value: boolean) => {
      return value ? "Yes" : "No";
    },
  },
];

export function TestCsv({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), -20),
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const onClickDownload = async () => {
    setIsProcessing(true);

    console.log("before response fetch");
    // const response = await fetch("../data/animals.json");
    console.log("after response fetch");

    const data = [
      {
        id: 1,
        name: "Balto",
        species: "Dog",
        num_of_paws: 4,
        willing_to_run: true,
      },
      {
        id: 2,
        name: "The Road Runner",
        species: "Bird",
        num_of_paws: 2,
        willing_to_run: true,
      },
      {
        id: 3,
        name: "Garfield",
        species: "Cat",
        num_of_paws: 4,
        willing_to_run: false,
      },
    ];
    console.log("after data fetch");

    // Simulates a delay on fetching the data.
    await new Promise((resolve) => setTimeout(resolve, 3000));

    downloadCsv(data, columns, "Fictional Animals");

    setIsProcessing(false);
  };

  return (
    <>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <button type="button" onClick={onClickDownload} disabled={isProcessing}>
        {isProcessing ? "Please wait..." : "Download data as CSV"}
      </button>
    </>
  );
}

export default TestCsv;
