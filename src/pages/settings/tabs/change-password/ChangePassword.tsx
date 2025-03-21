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
import { passwordSchema } from "@/types/validation";
import { checkPasswordStrength } from "@/lib/utils";
import {
  useHandleLogout,
  useUpdateUserPassword,
} from "@/hooks/react-query/mutations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_USER, useUserContext } from "@/hooks/context/authContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const defaultValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { mutateAsync: updateUserPassword, isPending } =
    useUpdateUserPassword();
  const { mutate: handleLogout } = useHandleLogout();
  const { setUser, setIsAuthenticated } = useUserContext();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues,
  });

  const clearForms = () => {
    form.reset(defaultValues);
  };

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    console.log(values);
    updateUserPassword(values, {
      onSuccess: () => {
        clearForms();
        handleLogout();
        toast({
          title: "Password changed!",
          description: "Login again to access the dashboard.",
        });
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/signin");
      },
      onError: () => {
        clearForms();
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <Card className="px-5 w-full h-full">
          <span className="flex py-5 font-bold text-base md:text-lg">
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
                        placeholder="Enter your current password."
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

              <div className="w-full flex justify-end">
                <Button type="submit" className={`my-5 dark:bg-blue-200`}>
                  {isPending ? "Loading..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </Form>
    </div>
  );
};

export default ChangePassword;
