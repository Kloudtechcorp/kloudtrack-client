import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../../ui/calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { downloadSchema } from "@/types/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { weatherDataSensors, weatherDataTypes } from "@/types/queryTypes";
import { formatDateString, getDateRange } from "@/lib/utils";
import toast from "react-hot-toast";
import { useWeatherDownloadSensorsData } from "@/hooks/react-query/mutations";

type WeatherDialog2Props = {
  id: string;
  name: string;
};

const WeatherDialog2 = ({ id, name }: WeatherDialog2Props) => {
  const [selected, setSelected] = useState("7days");
  const { mutateAsync: downloadData, isPending } =
    useWeatherDownloadSensorsData();
  const now = new Date();

  const [date, setDate] = useState<DateRange | undefined>(
    getDateRange(selected, now)
  );

  const generateCSVData = (data: weatherDataSensors[]): string => {
    if (!data || data.length === 0) return "";
    const headers = [
      "Date Recorded",
      "T1",
      "T2",
      "T3",
      "H1",
      "H2",
      "H3",
      "P1",
      "P2",
      "P3",
    ];

    const rows = data.map((item) => [
      formatDateString(item.recordedAt, "numeric"),
      item.T1,
      item.T2,
      item.T3,
      item.H1,
      item.H2,
      item.H3,
      item.P1,
      item.P2,
      item.P3,
    ]);
    // const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  };

  const form = useForm<z.infer<typeof downloadSchema>>({
    resolver: zodResolver(downloadSchema),
    defaultValues: { type: "7days" },
  });

  const onSubmit = (data: z.infer<typeof downloadSchema>) => {
    const updatedData = { ...data, name, id, from: date?.from, to: date?.to };
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
      onError: () => toast.error("Error downloading data"),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs md:text-sm lg:text-base " variant="default">
          Download Data
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[720px] gap-2 p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-2 py-2 flex flex-col justify-center"
          >
            <DialogTitle className="px-2 m-0">Please Select date</DialogTitle>
            <DialogDescription className="px-2 m-0">
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
                            const newRange = getDateRange(value, now);
                            setDate(newRange);
                          }}
                          value={field.value}
                          className="py-2 px-1 flex flex-col space-y-1 w-full gap-2 item-center h-full justify-center"
                        >
                          {[
                            "7days",
                            "28days",
                            "90days",
                            "week",
                            "month",
                            "year",
                            "last-week",
                            "last-month",
                            "custom",
                          ].map((val) => (
                            <FormItem
                              key={val}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={val}
                                  className="size-6"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {val.replace(/-/, " ")}
                              </FormLabel>
                            </FormItem>
                          ))}
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
            <Button type="submit" variant="default">
              {isPending ? "Loading..." : "Download CSV"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherDialog2;
