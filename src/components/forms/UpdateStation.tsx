import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStationSchema } from "@/types/validation";
import { toast } from "@/hooks/use-toast";
import { UpdateStationProps } from "@/types/mutationTypes";
import { useUpdateStation } from "@/hooks/react-query/mutations";

const UpdateStation = ({
  name,
  latitude,
  longitude,
  image,
  id,
}: UpdateStationProps) => {
  const { mutateAsync: updateStation, isPending } = useUpdateStation();
  const defaultValues = {
    stationName: name || "",
    latitude: latitude.toString() || "",
    longitude: longitude.toString() || "",
    imageLink: image || "",
  };
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof updateStationSchema>>({
    resolver: zodResolver(updateStationSchema),
    defaultValues,
  });
  const clearForms = () => {
    form.reset(defaultValues);
  };
  const onSubmit = async (values: z.infer<typeof updateStationSchema>) => {
    const updatedValues = {
      name: values.stationName,
      longitude: values.longitude,
      latitude: values.latitude,
      image: values.imageLink,
      id: id,
    };
    updateStation(updatedValues, {
      onSuccess: () => {
        toast({
          title: "Update Successful!",
        });
        navigate("/");
      },
      onError: () => {
        clearForms();
      },
    });
  };

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isPending && <div className="w-full">Loading...</div>}

        <span className="flex py-5 text-2xl gap-2 items-center">
          Update station
          <span className="font-bold"> {name}</span>
        </span>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="stationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Station1" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-2 w-full">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Latitude" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Longitude" {...field} />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link an Image</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://example.com/your-image-link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" className={`my-5 dark:bg-white`}>
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UpdateStation;
