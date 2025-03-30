"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import { bugSchema } from "@/lib/validation";
import { useReport } from "@/hooks/mutations/useUserMutations";

export default function SubmitReport({ onClose }: { onClose: () => void }) {
  const { mutateAsync: reportBug } = useReport();
  const form = useForm<z.infer<typeof bugSchema>>({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof bugSchema>) {
    const updatedData = { ...data, metadata: navigator.userAgent };
    await reportBug(updatedData);
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full py-5 flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Error on ..." {...field} />
              </FormControl>
              <FormDescription>
                Give a brief title about this bug.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Please describe your bug. Avoid using non-descriptive words like
                "it glitches" or "its broken"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-sm text-muted-foreground">
          Browsing on {navigator.userAgent}
        </span>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
