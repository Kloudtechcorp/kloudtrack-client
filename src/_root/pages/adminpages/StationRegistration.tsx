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
import { stationSchema } from "@/lib/types/validation";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Barangay,
  barangaySchemaType,
  municipalitySchemaType,
  provinceSchemaType,
  regionSchemaType,
  stationSchemaType,
} from "@/lib/types";
import { barangays } from "@/lib/psgc";
const server = import.meta.env.VITE_SERVER_LOCAL || "http://localhost:8000";

const StationRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [region, setRegion] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [barangay, setBarangay] = useState<string>("");
  const [regions, setRegions] = useState<regionSchemaType[] | []>([]);
  const [provinces, setProvinces] = useState<provinceSchemaType[] | []>([]);
  const [municipalities, setMunicipalities] = useState<
    municipalitySchemaType[] | []
  >();
  const [baranggays, setBarangays] = useState<barangaySchemaType[] | []>([]);
  const [psgc, setPsgc] = useState<string>("");
  const [stationTypes, setStationTypes] = useState<stationSchemaType[] | []>(
    []
  );

  const getStationTypes = async () => {
    try {
      const response = await fetch(`${server}/admin/get-station-types`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const stationTypes: stationSchemaType[] = data.types;
      setStationTypes(stationTypes);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getRegion = async () => {
    try {
      const response = await fetch(`${server}/admin/get-region`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const regions: regionSchemaType[] = data.region;
      setRegions(regions);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getProvince = async (regionId: number) => {
    try {
      const response = await fetch(`${server}/admin/get-province/${regionId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const provinces: provinceSchemaType[] = data.province;
      setProvinces(provinces);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getMunicipality = async (provinceId: number) => {
    try {
      const response = await fetch(
        `${server}/admin/get-municipality/${provinceId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const municipalities: municipalitySchemaType[] = data.municipality;
      setMunicipalities(municipalities);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const getBarangay = async (municipalityId: number) => {
    try {
      const response = await fetch(
        `${server}/admin/get-barangay/${municipalityId}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const barangays: barangaySchemaType[] = data.barangay;
      setBarangays(barangays);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getStationTypes();
    getRegion();
  }, []);

  const form = useForm<z.infer<typeof stationSchema>>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      stationName: "",
      stationType: "AWS",
      latitude: "",
      longitude: "",
      psgc: "",
      municipality: "",
      province: "",
      region: "",
    },
  });

  // BACKEND SERVER SUBMISSION
  const onSubmit = async (values: z.infer<typeof stationSchema>) => {
    setIsLoading(true);
    console.log(values);
    const updatedValues = {
      ...values,
      municipality: parseInt(values.municipality),
      province: parseInt(values.province),
      region: parseInt(values.region),
    };
    console.log(updatedValues);
    try {
      const response = await fetch(`${server}/admin/add-station`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        toast.success("Successfully added PSGC!");
      } else {
        setIsLoading(false);
        toast.error(`${data.error}`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add PSGC");
    }
  };
  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isLoading && <div className="w-full "></div>}
        <span className="flex py-5 font-bold text-lg">Register a station</span>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    {stationTypes ? (
                      <SelectContent>
                        {stationTypes.map((type) => (
                          <SelectItem value={type.typeName} key={type.id}>
                            {type.typeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        <SelectItem value="none">
                          No Station Type Found
                        </SelectItem>
                      </SelectContent>
                    )}
                  </Select>

                  <FormMessage />
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
                      <Input type="text" placeholder="Station1" {...field} />
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
                      <Input type="text" placeholder="Station1" {...field} />
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
                      setRegion(value);
                      setProvince("");
                      setMunicipality("");
                      setBarangay("");
                      field.onChange(value);
                      getProvince(parseInt(value));
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    {!regions ? (
                      <SelectContent>
                        <span>No Regions Found</span>
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem value={String(region.id)} key={region.id}>
                            {region.region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
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
                      setProvince(value);
                      setMunicipality("");
                      setBarangay("");
                      field.onChange(value);
                      getMunicipality(parseInt(value));
                    }}
                    defaultValue={field.value}
                    disabled={region ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    {!provinces ? (
                      <SelectContent>
                        <span>No Provinces Found</span>
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem
                            value={String(province.id)}
                            key={province.id}
                          >
                            {province.province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
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
                      setMunicipality(value);
                      setBarangay("");
                      field.onChange(value);
                      getBarangay(parseInt(value));
                    }}
                    defaultValue={field.value}
                    disabled={province ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                    </FormControl>
                    {!municipalities ? (
                      <SelectContent>
                        <span>No Provinces Found</span>
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {municipalities.map((municipality) => (
                          <SelectItem
                            value={String(municipality.id)}
                            key={municipality.id}
                          >
                            {municipality.municipality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
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
                      setBarangay(value);
                      field.onChange(value);
                      setPsgc(value);
                    }}
                    defaultValue={field.value}
                    disabled={municipality ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a barangay" />
                      </SelectTrigger>
                    </FormControl>
                    {!baranggays ? (
                      <SelectContent>
                        <span>No Barangays Found</span>
                      </SelectContent>
                    ) : (
                      <SelectContent>
                        {baranggays.map((barangay) => (
                          <SelectItem
                            value={String(barangay.psgc)}
                            key={barangay.psgc}
                          >
                            {barangay.barangay}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
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
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default StationRegistration;
