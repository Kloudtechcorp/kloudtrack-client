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
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { stationSchema } from "@/types/validation";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  useGetStationTypes,
  useGetStationRegions,
  useGetStationProvinces,
  useGetStationMunicipalities,
  useGetStationBarangays,
} from "@/hooks/react-query/queries";
import { useCreateStation } from "@/hooks/react-query/mutations";
import { stationStaticType } from "@/types";

type StationRegistrationProps = {
  action: "CREATE" | "UPDATE";
  station?: stationStaticType;
};

const StationRegistration = ({ action, station }: StationRegistrationProps) => {
  const { data: stationTypes } = useGetStationTypes();
  const { data: regions } = useGetStationRegions();

  const [regionId, setRegionId] = useState<number | null>(null);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [municipalityId, setMunicipalityId] = useState<number | null>(null);

  const { data: provinces } = useGetStationProvinces(regionId || 0);
  const { data: municipalities } = useGetStationMunicipalities(provinceId || 0);
  const { data: barangays } = useGetStationBarangays(municipalityId || 0);

  const { mutateAsync: createStation, isPending } = useCreateStation();
  console.log(station);
  const defaultValues = {
    stationName: station?.stationName || "",
    latitude: station?.latitude || "",
    stationtype: station?.stationType.typeName || "AWS",
    longitude: station?.latitude || "",
    psgc: station?.barangay.psgc || "",
    municipality: station?.municipality.municipality || "",
    province: station?.province.province || "",
    region: station?.region.region || "",
    imageLink: station?.imageLink || "",
  };

  const form = useForm<z.infer<typeof stationSchema>>({
    resolver: zodResolver(stationSchema),
    defaultValues,
  });

  const clearForm = () => {
    form.reset(defaultValues);
  };

  const onSubmit = async (values: z.infer<typeof stationSchema>) => {
    const updatedValues = {
      ...values,
      municipality: parseInt(values.municipality),
      province: parseInt(values.province),
      region: parseInt(values.region),
    };
    createStation(updatedValues, {
      onError: () => {
        clearForm();
      },
    });
  };

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isPending && <div className="w-full">Loading...</div>}
        {action === "CREATE" ? (
          <span className="flex py-5 font-bold text-lg">
            Register a station
          </span>
        ) : (
          <span className="flex py-5 text-2xl gap-2 items-center">
            Update station
            <span className="font-bold"> {station?.stationName}</span>
          </span>
        )}
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
            <FormField
              control={form.control}
              name="stationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a station type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stationTypes?.length ? (
                        stationTypes.map((type) => (
                          <SelectItem value={type.typeName} key={type.id}>
                            {type.typeName}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none">
                          No Station Type Found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
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
                      setRegionId(parseInt(value));
                      setProvinceId(null);
                      setMunicipalityId(null);
                      field.onChange(value);
                    }}
                    value={field.value}
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

export default StationRegistration;
