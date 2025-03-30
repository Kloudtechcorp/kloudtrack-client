import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { downloadSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  formatDateString,
  getDateRange,
  getWindDirectionLabel,
} from "@/lib/utils";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useWeatherDownloadData } from "@/hooks/mutations/useUserMutations";
import { WeatherData } from "@/types/user.type";

const updatedDownloadSchema = downloadSchema.extend({
  format: z.enum(["csv", "json", "pdf"]),
  interval: z.enum(["minute", "halfhour", "hour"]),
  parameter: z.array(z.string()).default([]),
});

type WeatherDialogProps = {
  id: string;
  name: string;
};

type itemsType = {
  label: string;
  title: string;
};

const WeatherDialog = ({ id, name }: WeatherDialogProps) => {
  const [selected, setSelected] = useState("today");
  const [format, setFormat] = useState<"csv" | "json" | "pdf">("csv");
  const { mutateAsync: downloadData, isPending } = useWeatherDownloadData();
  const [isOpen, setIsOpen] = useState(false);
  const now = new Date();

  const items: itemsType[] = [
    { label: "recordedAt", title: "Date Recorded" },
    { label: "temperature", title: "Temperature (°C)" },
    { label: "heatIndex", title: "Heat Index (°C)" },
    { label: "humidity", title: "Humidity (%)" },
    { label: "airPressure", title: "Air Pressure (mb)" },
    { label: "precipitation", title: "Precipitation (mm)" },
    { label: "light", title: "Light (lux)" },
    { label: "uvIndex", title: "UV Index" },
    { label: "windDirection", title: "Wind Direction" },
    { label: "windSpeed", title: "Wind Speed (kph)" },
  ];

  const [date, setDate] = useState<DateRange | undefined>(
    getDateRange(selected, now)
  );

  const FullscreenLoader = () => {
    if (!isPending) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#fbd008] mb-4" />
          <p className="text-lg font-medium">Downloading your data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  };

  const form = useForm<z.infer<typeof updatedDownloadSchema>>({
    resolver: zodResolver(updatedDownloadSchema),
    defaultValues: {
      type: "today",
      format: "csv",
      interval: "hour",
      parameter: items.map((item) => item.label),
    },
  });

  const selectedParameters = form.watch("parameter");

  const allSelected = selectedParameters?.length === items.length;

  const toggleAll = (checked: boolean) => {
    if (checked) {
      form.setValue(
        "parameter",
        items.map((item) => item.label)
      );
    } else {
      form.setValue("parameter", []);
    }
  };

  const generateCSVData = (data: WeatherData[]): string => {
    if (!data || data.length === 0) return "";

    const selectedItems = items.filter((item) =>
      selectedParameters.includes(item.label)
    );
    const headers = selectedItems.map((item) => item.label);
    const rows = data.map((item) => {
      return selectedItems.map((param) => {
        switch (param.label) {
          case "recordedAt":
            return formatDateString(item.recordedAt, "numeric");
          case "windDirection":
            return getWindDirectionLabel(item.windDirection);
          case "airPressure":
            return item.pressure;
          default:
            return item[param.label as keyof typeof item];
        }
      });
    });
    console.log(rows);
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  };

  const generateJSONData = (data: WeatherData[]): string => {
    if (selectedParameters.length === items.length) {
      return JSON.stringify(data, null, 2);
    }

    // Filter data to only include selected parameters
    const filteredData = data.map((item) => {
      const result: Record<string, any> = {};
      selectedParameters.forEach((param) => {
        if (param === "airPressure") {
          result[param] = item.pressure;
        } else {
          result[param] = item[param as keyof typeof item];
        }
      });
      return result;
    });

    return JSON.stringify(filteredData, null, 2);
  };

  const onSubmit = (data: z.infer<typeof updatedDownloadSchema>) => {
    if (data.parameter.length === 0) {
      toast.error("Please select at least one parameter");
      return;
    }

    const updatedData = { ...data, name, id, from: date?.from, to: date?.to };
    setIsOpen(false);
    downloadData(updatedData, {
      onSuccess: (data) => {
        let blob;
        let fileName = `${updatedData.name}: from ${formatDateString(
          updatedData.from?.toISOString()!,
          "numeric"
        )}${
          updatedData.to
            ? ` to ${formatDateString(updatedData.to.toISOString(), "numeric")}`
            : ""
        }`;

        // Handle different format types
        switch (updatedData.format) {
          case "csv":
            const csvData = generateCSVData(data);
            blob = new Blob([csvData], { type: "text/csv" });
            fileName += ".csv";
            break;
          case "json":
            const jsonData = generateJSONData(data);
            blob = new Blob([jsonData], { type: "application/json" });
            fileName += ".json";
            break;
          case "pdf":
            const doc = new jsPDF();
            doc.text(`Weather Data Report for ${name}`, 14, 10);
            doc.setFontSize(10);
            const wrappedText = doc.splitTextToSize(
              `from ${formatDateString(
                updatedData.from?.toISOString()!,
                "numeric"
              )}${
                updatedData.to
                  ? ` to ${formatDateString(
                      updatedData.to.toISOString(),
                      "numeric"
                    )}`
                  : ""
              }`,
              180
            );
            doc.text(wrappedText, 14, 20);

            doc.setFontSize(12);

            // Filter columns based on selected parameters
            const selectedItems = items.filter((item) =>
              selectedParameters.includes(item.label)
            );

            const headers = selectedItems.map((item) => item.title);

            autoTable(doc, {
              startY: 30,
              head: [headers],
              headStyles: { fillColor: "#fbd008", textColor: "black" },
              body: data.map((item) => {
                return selectedItems.map((param) => {
                  switch (param.label) {
                    case "recordedAt":
                      return formatDateString(item.recordedAt, "2-digit");
                    case "windDirection":
                      return getWindDirectionLabel(item.windDirection);
                    case "airPressure":
                      return item.pressure;
                    default:
                      return item[param.label as keyof typeof item];
                  }
                });
              }),
              theme: "grid",
              styles: {
                font: "helvetica",
              },
            });

            doc.save(`${fileName}.pdf`);
            toast.success("PDF downloaded successfully");
            return;
          default:
            const defaultData = generateCSVData(data);
            blob = new Blob([defaultData], { type: "text/csv" });
            fileName += ".csv";
        }

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.success(
          `Downloaded ${updatedData.format.toUpperCase()} successfully`
        );
      },
      onError: () => toast.error("Error downloading data"),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isPending && <FullscreenLoader />}
      <DialogTrigger asChild>
        <Button
          className="text-xs md:text-sm lg:text-base bg-transparent hover:bg-transparent text-black dark:text-white border border-black hover:border-white hover:text-white hover:bg-slate-800 dark:border-white dark:hover:border-black dark:hover:text-black dark:hover:bg-slate-100  transition-all duration-300 ease-in-out"
          variant="default"
        >
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
              Select range and format for downloading data
            </DialogDescription>
            <div className="w-full flex flex-row items-start justify-start pt-4 pb-2 gap-2">
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
                            { value: "today", label: "Today" },
                            { value: "7days", label: "7 Days" },
                            { value: "28days", label: "28 Days" },
                            { value: "90days", label: "90 Days" },
                            { value: "week", label: "This Week" },
                            { value: "month", label: "This Month" },
                            { value: "year", label: "Year" },
                            { value: "last-week", label: "Last Week" },
                            { value: "last-month", label: "Last Month" },
                            { value: "custom", label: "Custom" },
                          ].map(({ value, label }) => (
                            <FormItem
                              key={value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={value}
                                  className="size-6"
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {label}
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
                  disabled={
                    selected !== "custom"
                      ? { from: new Date(0), to: new Date(2100, 0, 1) }
                      : {
                          from: new Date(
                            new Date().setDate(new Date().getDate() + 1)
                          ),
                          to: new Date(2100, 0, 1),
                        }
                  }
                />
              </div>
            </div>
            <Separator />
            {/* Format Selection */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 my-2 px-2 w-full">
                    <FormLabel>Download Format</FormLabel>

                    <RadioGroup
                      onValueChange={(value: "csv" | "json" | "pdf") => {
                        setFormat(value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-row gap-5"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="csv"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">CSV</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="json"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">JSON </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="pdf"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">PDF</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <Separator orientation="vertical" />
              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 my-2 px-2 w-full">
                    <FormLabel>Data Interval</FormLabel>

                    <RadioGroup
                      onValueChange={(
                        value: "minute" | "halfhour" | "hour"
                      ) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-row gap-5"
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="minute"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Minute</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="halfhour"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          30 Minutes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="hour"
                            className="flex items-center justify-center size-6"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Hour</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </div>
            {/* Parameters Selection with Select All option */}
            <Separator />
            <div className="px-2 pt-4">
              <div className="mb-4">
                <FormLabel className="text-base">Parameters</FormLabel>
                <FormDescription>
                  Select the data parameters you want to include
                </FormDescription>
              </div>

              {/* Select All Checkbox */}
              <div className="flex flex-row items-center space-x-3 mb-2">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                />
                <label
                  htmlFor="select-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  Select All
                </label>
              </div>

              {/* Individual Parameters */}
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <FormField
                    key={item.label}
                    control={form.control}
                    name="parameter"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.label}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      item.label,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.label
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.title}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </div>
            </div>
            <Button type="submit" variant="default" className="mt-4">
              {isPending ? "Loading..." : `Download ${format.toUpperCase()}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WeatherDialog;
