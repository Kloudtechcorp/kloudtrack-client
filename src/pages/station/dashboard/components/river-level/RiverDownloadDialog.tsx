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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatDateString, getDateRange } from "@/lib/utils";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Separator } from "@/components/ui/separator";
import { useRiverLevelDownloadData } from "@/hooks/mutations/useUserMutations";
import { RiverLevelData } from "@/types/user.type";

type RiverLevelDialogProps = {
  id: string;
  name: string;
};

const updatedDownloadSchema = downloadSchema.extend({
  format: z.enum(["csv", "json", "pdf"], {
    message: "Please select a download format.",
  }),
});

const RiverLevelDialog = ({ id, name }: RiverLevelDialogProps) => {
  const [selected, setSelected] = useState("today");
  const [format, setFormat] = useState<"csv" | "json" | "pdf">("csv");
  const { mutateAsync: downloadData, isPending } = useRiverLevelDownloadData();
  const now = new Date();

  const [date, setDate] = useState<DateRange | undefined>(
    getDateRange(selected, now)
  );

  const generateCSVData = (data: RiverLevelData[]): string => {
    if (!data || data.length === 0) return "";
    const headers = ["Date Recorded", "Height (cm)"];
    const rows = data.map((item) => [
      formatDateString(item.recordedAt, "numeric"),
      item.distance,
    ]);
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  };

  const generateJSONData = (data: RiverLevelData[]): string => {
    return JSON.stringify(data, null, 2);
  };

  const form = useForm<z.infer<typeof updatedDownloadSchema>>({
    resolver: zodResolver(updatedDownloadSchema),
    defaultValues: { type: "today", format: "csv" },
  });

  const onSubmit = (data: z.infer<typeof updatedDownloadSchema>) => {
    const updatedData = { ...data, name, id, from: date?.from, to: date?.to };
    downloadData(updatedData, {
      onSuccess: (data) => {
        let blob;
        let fileName = `${updatedData.name}: from ${updatedData.from} ${
          !updatedData.to ? `to ${updatedData.to}` : ""
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
            doc.text(`River Level Data Report for ${name}`, 14, 10);

            doc.setFontSize(10);
            const wrappedText = doc.splitTextToSize(
              `from ${updatedData.from} ${
                updatedData.to ? `to ${updatedData.to}` : ""
              }`,
              180
            );
            doc.text(wrappedText, 14, 20);

            doc.setFontSize(12);
            autoTable(doc, {
              startY: 30,
              head: [["Date Recorded", "Height (cm)"]],
              body: data.map((item) => [
                formatDateString(item.recordedAt, "2-digit"),
                item.distance,
              ]),
              theme: "grid",
              styles: {
                font: "Inter",
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
    <Dialog>
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
                  disabled={selected !== "custom"}
                />
              </div>
            </div>
            {/* Format Selection */}
            <Separator />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 mt-2 px-2">
                  <FormLabel>Download Format</FormLabel>
                  <FormMessage />
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
            <Button type="submit" variant="default" className="mt-4">
              {isPending ? "Loading..." : `Download ${format.toUpperCase()}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RiverLevelDialog;
