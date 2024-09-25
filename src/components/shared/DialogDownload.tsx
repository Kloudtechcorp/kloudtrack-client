import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { downloadSchema } from "@/types/validation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDownloadData } from "@/hooks/react-query/mutations";
import { weatherDataTypes } from "@/types/queryTypes";

type DialogDownload = {
  name: string;
};

const DialogDownload = ({ name }: DialogDownload) => {
  const [selected, setSelected] = useState("7days");
  const { mutateAsync: downloadData, isPending } = useDownloadData();
  const now = new Date();

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(now, 7),
    to: now,
  });

  const generateCSVData = (data: weatherDataTypes[]): string => {
    console.log(data);
    if (!data || data.length === 0) return "";

    const headers = [
      "Date Recorded",
      "Temperature",
      "Heat Index",
      "Humidity",
      "Air Pressure",
      "Precipitation",
      "Light",
      "UV Intensity",
      "Wind Direction",
      "Wind Speed",
      "Gust",
    ];

    const rows = data.map((item) => [
      item.recordedAt,
      item.temperature,
      item.heatIndex,
      item.humidity,
      item.pressure,
      item.precipitation,
      item.light,
      item.uvIntensity,
      item.windDirection,
      item.windSpeed,
      item.gust,
    ]);
    const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
    return csvRows.join("\n");
  };

  const form = useForm<z.infer<typeof downloadSchema>>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      type: "7days",
    },
  });

  const onSubmit = (data: z.infer<typeof downloadSchema>) => {
    const updatedData = {
      ...data,
      name: name,
      from: date?.from,
      to: date?.to,
    };
    downloadData(updatedData, {
      onSuccess: (data) => {
        const csvData = generateCSVData(data);

        const blob = new Blob([csvData], { type: "text/csv" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${updatedData.name}: from ${updatedData.from} to ${updatedData.to}`;
        link.click();

        URL.revokeObjectURL(link.href);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-2 h-6 border border-transparent hover:bg-gray-200 rounded-none"
        >
          Download Data
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[720px] gap-2 p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogTitle>Please Select date</DialogTitle>
            <DialogDescription>
              Select range for downloading data
            </DialogDescription>
            <div className="w-full flex flex-row items-start justify-start py-4 gap-2">
              <div className="w-full border border-transparent border-r-gray-300">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            setSelected(value);
                            field.onChange(value);
                            const now = new Date(); // Ensure 'now' is available here
                            let day: number = 0;

                            // Determine the number of days based on the selected value
                            if (value === "7days") {
                              day = 7;
                            } else if (value === "28days") {
                              day = 28;
                            } else if (value === "90days") {
                              day = 90;
                            } else if (value === "week") {
                              // Calculate the range for the current week
                              const startOfWeek = now.getDate() - now.getDay(); // Sunday
                              day = now.getDate() - startOfWeek + 1; // From Monday
                              setDate({
                                from: new Date(now.setDate(startOfWeek)),
                                to: new Date(),
                              });
                              return;
                            } else if (value === "month") {
                              // Set date range for the current month
                              setDate({
                                from: new Date(
                                  now.getFullYear(),
                                  now.getMonth(),
                                  1
                                ),
                                to: new Date(
                                  now.getFullYear(),
                                  now.getMonth() + 1,
                                  0
                                ),
                              });
                              return;
                            } else if (value === "year") {
                              // Set date range for the current year
                              setDate({
                                from: new Date(now.getFullYear(), 0, 1),
                                to: new Date(now.getFullYear(), 11, 31),
                              });
                              return;
                            } else if (value === "last-week") {
                              // Set date range for the previous week
                              const lastWeekStart =
                                now.getDate() - now.getDay() - 7; // Start of last week
                              setDate({
                                from: new Date(now.setDate(lastWeekStart)),
                                to: new Date(now.setDate(lastWeekStart + 6)),
                              });
                              return;
                            } else if (value === "last-month") {
                              // Set date range for the previous month
                              const lastMonth = now.getMonth() - 1;
                              const lastMonthYear =
                                lastMonth < 0
                                  ? now.getFullYear() - 1
                                  : now.getFullYear();
                              const lastMonthEnd = new Date(
                                lastMonthYear,
                                lastMonth + 1,
                                0
                              ).getDate();
                              setDate({
                                from: new Date(lastMonthYear, lastMonth, 1),
                                to: new Date(
                                  lastMonthYear,
                                  lastMonth,
                                  lastMonthEnd
                                ),
                              });
                              return;
                            } else if (value === "custom") {
                              // Do not automatically set the date for custom
                              setDate(undefined);
                              return;
                            }

                            // Default to a fixed range if none of the above matches
                            setDate({
                              from: subDays(now, day),
                              to: now,
                            });
                          }}
                          value={field.value}
                          className="py-2 px-1 flex flex-col space-y-1 w-full gap-2 item-center h-full justify-center"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="7days"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Last 7 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="28days"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Last 28 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="90days"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Last 90 days
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="week" className="size-6" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              This week
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="month"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              This Month
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="year" className="size-6" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              This Year
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="last-week"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Last Week
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="last-month"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Last Month
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                value="custom"
                                className="size-6"
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Custom
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full h-full">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="block"
                  disabled={selected !== "custom"}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="cursor-pointer text-gray-950 hover:text-gray-200 bg-gray-200 w-1/3 dark:bg-gray-500 dark:hover:bg-gray-700"
            >
              Download CSV
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDownload;
