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
import { useState } from "react";
import { passwordSchema, userValidation } from "@/lib/types/validation";
import { useUserContext } from "@/lib/context/authContext";
const server = import.meta.env.VITE_SERVER_LOCAL || "http://localhost:8000";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const clearForms = () => {
    form.setValue("password", "");
    form.setValue("currentPassword", "");
    form.setValue("confirmPassword", "");
  };

  // BACKEND SERVER SUBMISSION
  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${server}/user/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        toast.success(data.message);
        clearForms();
      } else {
        setIsLoading(false);
        toast.error(`${data.error}`);
        clearForms();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(String(error));
      clearForms();
    }
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
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default ChangePassword;
