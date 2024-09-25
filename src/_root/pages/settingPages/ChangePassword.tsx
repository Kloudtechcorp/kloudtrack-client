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
import { passwordSchema, userValidation } from "@/types/validation";
import { useUpdateUserPassword } from "@/hooks/react-query/mutations";

const defaultValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const { mutateAsync: updateUserPassword, isPending } =
    useUpdateUserPassword();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  const clearForms = () => {
    form.reset(defaultValues);
  };

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    updateUserPassword(values, {
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
      <div className="px-5 w-full h-full">
        <span className="flex py-5 font-bold text-lg">
          Add information for new user
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your desired password."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="w-full h-full flex justify-end">
              <Button type="submit" className={`my-5 dark:bg-blue-200`}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default ChangePassword;
