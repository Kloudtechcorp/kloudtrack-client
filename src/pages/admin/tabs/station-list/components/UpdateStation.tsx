import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateStationSchema } from "@/types/validation";
import { toast } from "@/hooks/use-toast";
import { useUpdateStation } from "@/hooks/react-query/mutations";
import {
  useGetStationBarangays,
  useGetStationDetailed,
  useGetStationMunicipalities,
  useGetStationProvinces,
  useGetStationRegions,
} from "@/hooks/react-query/queries";

type UpdateStationProps = {
  id: string;
};

export const UpdateStation = ({ id }: UpdateStationProps) => {
  const navigate = useNavigate();

  const { data: stationData, isLoading, isError } = useGetStationDetailed(id);
  const { data: regions } = useGetStationRegions();

  const { mutateAsync: updateStation, isPending } = useUpdateStation();

  const [regionId, setRegionId] = useState<number | null>(null);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [municipalityId, setMunicipalityId] = useState<number | null>(null);
  const { data: provinces } = useGetStationProvinces(regionId || 0);
  const { data: municipalities } = useGetStationMunicipalities(provinceId || 0);
  const { data: barangays } = useGetStationBarangays(municipalityId || 0);
  const defaultValues = {
    stationName: stationData?.stationName || "",
    latitude: stationData?.latitude?.toString() || "",
    longitude: stationData?.longitude?.toString() || "",
    imageLink: stationData?.imageLink || "",
    region: stationData?.regionId?.toString() || "",
    province: stationData?.provinceId?.toString() || "",
    municipality: stationData?.municipalityId?.toString() || "",
    psgc: stationData?.psgc?.toString() || "",
  };

  const form = useForm<z.infer<typeof updateStationSchema>>({
    resolver: zodResolver(updateStationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (stationData) {
      setRegionId(stationData.regionId);
      setProvinceId(stationData.provinceId);
      setMunicipalityId(stationData.municipalityId);

      form.reset(defaultValues);
    }
  }, [stationData]);

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
      province: parseInt(values.province),
      region: parseInt(values.region),
      psgc: values.psgc,
      municipality: parseInt(values.municipality),
    };

    console.log(updatedValues);
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

  if (isLoading || !stationData || !regionId) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading station data.</div>;
  }

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isPending && <div className="w-full">Loading...</div>}

        <h2 className="flex py-5 text-2xl gap-2 items-center">
          Update Station{" "}
          <span className="font-bold">{stationData.stationName}</span>
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="stationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Station Name</FormLabel>
                <FormControl>
                  <Input placeholder="Station1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Longitude" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    {regions?.map((region) => (
                      <SelectItem key={region.id} value={String(region.id)}>
                        {region.region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
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
                    {provinces?.map((province) => (
                      <SelectItem key={province.id} value={String(province.id)}>
                        {province.province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
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
                    {municipalities?.map((municipality) => (
                      <SelectItem
                        key={municipality.id}
                        value={String(municipality.id)}
                      >
                        {municipality.municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
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
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={!municipalityId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a barangay" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {barangays?.map((barangay) => (
                      <SelectItem
                        key={barangay.psgc}
                        value={String(barangay.psgc)}
                      >
                        {barangay.barangay}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};
