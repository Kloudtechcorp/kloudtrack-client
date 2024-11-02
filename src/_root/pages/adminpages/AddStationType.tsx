import { Button } from "@/components/ui/button";
import { stationTypeSchema } from "@/types/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAddStationType } from "@/hooks/react-query/mutations";
import { useNavigate } from "react-router-dom";
const defaultValues = {
  typeName: "AWS",
};
const AddStationType = () => {
  const navigate = useNavigate();
  const { mutateAsync: addStationType, isPending } = useAddStationType();
  const form = useForm<z.infer<typeof stationTypeSchema>>({
    resolver: zodResolver(stationTypeSchema),
    defaultValues: {
      typeName: "AWS",
    },
  });

  const clearForms = () => {
    form.reset({
      typeName: "AWS",
    });
  };

  // BACKEND SERVER SUBMISSION
  const onSubmit = async (values: z.infer<typeof stationTypeSchema>) => {
    addStationType(values, {
      onSuccess: () => {
        clearForms();
      },
      onError: () => {
        clearForms();
      },
    });
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
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddStationType;
