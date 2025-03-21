"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "../../../../../components/forms/datePicker";
import { Input } from "../../../../../components/ui/input";
import { useGenerateApi } from "@/hooks/react-query/mutations";

const FormSchema = z.object({
  expiresAt: z.date().nullable(),
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

type refetchProps = {
  onSuccess: () => void;
};

const AddApiKey = ({ onSuccess }: refetchProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      expiresAt: null,
    },
  });

  const [hasExpiration, setHasExpiration] = useState(true);
  const { mutateAsync: addApiKey, isPending } = useGenerateApi(onSuccess);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!hasExpiration) {
      toast({
        title: "Please set an expiration date.",
      });
    }
    addApiKey(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Input {...field} placeholder="development" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration</FormLabel>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasExpiration"
                  checked={hasExpiration}
                  onCheckedChange={(checked) => {
                    setHasExpiration(checked === true);
                    field.onChange(checked ? null : field.value);
                  }}
                />
                <label
                  htmlFor="hasExpiration"
                  className="text-sm font-medium leading-none"
                >
                  Never
                </label>
              </div>
              {!hasExpiration && (
                <DatePicker
                  selected={field.value as Date | undefined}
                  onSelect={(date) => field.onChange(date || null)}
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default AddApiKey;
