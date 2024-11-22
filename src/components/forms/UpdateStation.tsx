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
import { useUpdateStation } from "@/hooks/react-query/mutations";
import {
  useGetStationBarangays,
  useGetStationDetailed,
  useGetStationMunicipalities,
  useGetStationProvinces,
  useGetStationRegions,
  useGetStationTypes,
} from "@/hooks/react-query/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

export type UpdateStationProps = {
  id: string;
};

const UpdateStation = ({ id }: UpdateStationProps) => {
  const navigate = useNavigate();
  const { data: stationData, isLoading, isError } = useGetStationDetailed(id);

  const { data: regions } = useGetStationRegions();
  const { data: provinces } = useGetStationProvinces(
    stationData?.regionId || 0
  );
  const { data: municipalities } = useGetStationMunicipalities(
    stationData?.provinceId || 0
  );
  const { data: barangays } = useGetStationBarangays(
    stationData?.municipalityId || 0
  );

  const { mutateAsync: updateStation, isPending } = useUpdateStation();

  const [regionId, setRegionId] = useState<number | null>(null);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [municipalityId, setMunicipalityId] = useState<number | null>(null);
  useEffect(() => {
    if (stationData) {
      setRegionId(stationData.regionId);
      setProvinceId(stationData.provinceId);
      setMunicipalityId(stationData.municipalityId);
    }

    form.setValue(
      "region",
      !stationData ? "" : stationData.regionId.toString()
    );

    form.setValue(
      "province",
      !stationData ? "" : stationData.provinceId.toString()
    );
    form.setValue(
      "municipality",
      !stationData ? "" : stationData.municipalityId.toString()
    );
  }, [stationData]);

  const defaultValues = {
    stationName: stationData?.stationName || "",
    latitude: stationData?.latitude?.toString() || "",
    longitude: stationData?.longitude?.toString() || "",
    imageLink: stationData?.imageLink || "",
    regionId: stationData?.regionId.toString() || "",
    provinceId: stationData?.provinceId.toString() || "",
    municipalityId: stationData?.municipalityId.toString() || "",
    psgc: stationData?.psgc.toString() || "",
  };
  const form = useForm<z.infer<typeof updateStationSchema>>({
    resolver: zodResolver(updateStationSchema),
    defaultValues,
  });

  const clearForms = () => {
    form.reset(defaultValues);
  };
  console.log(form.getValues("region"));
  const onSubmit = async (values: z.infer<typeof updateStationSchema>) => {
    // const updatedValues = {
    //   name: values.stationName,
    //   longitude: values.longitude,
    //   latitude: values.latitude,
    //   image: values.imageLink,
    //   id: id,
    // };
    // updateStation(updatedValues, {
    //   onSuccess: () => {
    //     toast({
    //       title: "Update Successful!",
    //     });
    //     navigate("/");
    //   },
    //   onError: () => {
    //     clearForms();
    //   },
    // });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };
  if (isLoading || !stationData) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error ...</div>;
  }
  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isPending && <div className="w-full">Loading...</div>}

        <span className="flex py-5 text-2xl gap-2 items-center">
          Update station
          <span className="font-bold"> {stationData.stationName}</span>
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
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setRegionId(parseInt(value, 10));
                      setProvinceId(null);
                      setMunicipalityId(null);
                      field.onChange(value);
                    }}
                    value={field.value ? String(field.value) : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions?.length ? (
                        regions.map((region) => (
                          <SelectItem value={String(region.id)} key={region.id}>
                            {region.region}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">No Regions Found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setProvinceId(parseInt(value));
                      setMunicipalityId(null);
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!regionId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces?.length ? (
                        provinces.map((province) => (
                          <SelectItem
                            value={String(province.id)}
                            key={province.id}
                          >
                            {province.province}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">No Provinces Found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setMunicipalityId(parseInt(value));
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!provinceId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {municipalities?.length ? (
                        municipalities.map((municipality) => (
                          <SelectItem
                            value={String(municipality.id)}
                            key={municipality.id}
                          >
                            {municipality.municipality}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">
                          No Municipalities Found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="psgc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!municipalityId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a barangay" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {barangays?.length ? (
                        barangays.map((barangay) => (
                          <SelectItem
                            value={String(barangay.psgc)}
                            key={barangay.psgc}
                          >
                            {barangay.barangay}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">No Barangays Found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
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
