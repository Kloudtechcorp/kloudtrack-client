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
import { useState } from "react";
import { psgcValidation } from "@/types/validation";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { barangays, municipalities, provinces, regions } from "@/lib/psgc";
import { useAddPsgc } from "@/hooks/react-query/mutations";

const defaultValues = {
  psgc: "",
  region: "",
  province: "",
  municipality: "",
  barangay: "",
};

const AddPsgc = () => {
  const [region, setRegion] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [psgc, setPsgc] = useState<string>("");
  const { mutateAsync: addPsgc, isPending } = useAddPsgc();

  const form = useForm<z.infer<typeof psgcValidation>>({
    resolver: zodResolver(psgcValidation),
    defaultValues,
  });

  const clearForms = () => {
    form.reset(defaultValues);
  };

  const onSubmit = async (values: z.infer<typeof psgcValidation>) => {
    const updatedValues = { ...values, psgc: psgc };
    addPsgc(updatedValues, {
      onError: () => {
        clearForms();
      },
    });
  };

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isPending && <div className="w-full "></div>}
        <span className="flex py-5 font-bold text-lg">
          Add information for Philippine Standard Geographic Code (PSGC)
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <>
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
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.all().map((region, key) => (
                        <SelectItem value={region.designation} key={key}>
                          {region.designation} - {region.name}
                        </SelectItem>
                      ))}
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
                      setProvince(value);
                      setMunicipality("");
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    disabled={region ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.region(region).map((province, key) => (
                        <SelectItem value={province.name} key={key}>
                          {province.name}
                        </SelectItem>
                      ))}
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
                      setMunicipality(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    disabled={province ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {municipalities
                        .province(province)
                        .map((municipality, key) => (
                          <SelectItem value={municipality.name} key={key}>
                            {municipality.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="barangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setPsgc(barangays.find(value));
                    }}
                    defaultValue={field.value}
                    disabled={municipality ? false : true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a barangay" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {barangays
                        .municipality(municipality)
                        .map((barangay, key) => (
                          <SelectItem value={barangay.name} key={key}>
                            {barangay.name}
                          </SelectItem>
                        ))}
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
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Select a barangay first"
                      value={psgc}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </>
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

export default AddPsgc;
