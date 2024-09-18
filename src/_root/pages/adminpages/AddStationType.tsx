import { Button } from "@/components/ui/button";
import { stationTypeSchema } from "@/lib/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const server = import.meta.env.VITE_SERVER_LOCAL || "http://localhost:8000";

const AddStationType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof stationTypeSchema>>({
    resolver: zodResolver(stationTypeSchema),
    defaultValues: {
      typeName: "AWS",
    },
  });

  // BACKEND SERVER SUBMISSION
  const onSubmit = async (values: z.infer<typeof stationTypeSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${server}/admin/add-station-type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        toast.success("Successfully added stationType!");
      } else {
        setIsLoading(false);
        toast.error(`${data.error}`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add station Type");
    }
  };

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        <span className="flex py-5 font-bold text-lg">
          Add a type of station
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <>
            <FormField
              control={form.control}
              name="typeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AWS">
                        Automated Weather Station
                      </SelectItem>
                      <SelectItem value="ARG">Automated Rain Gauge</SelectItem>
                      <SelectItem value="CLMS">
                        Coastal Level Monitoring Station
                      </SelectItem>
                      <SelectItem value="TC">Tomato Company</SelectItem>
                      <SelectItem value="RLMS">
                        River Level Monitoring Station
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Adding type of station will be needed to register a station.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
          <div className="w-full flex justify-end">
            <Button type="submit" className={`my-5 dark:bg-blue-200`}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddStationType;
