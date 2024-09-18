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
import { userValidation } from "@/lib/types/validation";
const server = import.meta.env.VITE_SERVER_LOCAL || "http://localhost:8000";

const UserCreation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      username: "",
      role: "USER",
      password: "",
    },
  });

  const clearForms = () => {
    form.setValue("username", "");
    form.setValue("password", "");
    form.setValue("role", "USER");
  };

  // BACKEND SERVER SUBMISSION
  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${server}/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        toast.success("Successfully created user!");
        clearForms();
      } else {
        setIsLoading(false);
        toast.error(`${data.error}`);
        clearForms();
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to create a user");
      clearForms();
    }
  };

  return (
    <Form {...form}>
      <div className="px-5 w-full">
        {isLoading && <div className="w-full "></div>}
        <span className="flex py-5 font-bold text-lg">
          Add information for new user
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="juandelacruz1" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" readOnly />
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
                  <FormLabel>Password</FormLabel>
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
          </>
          <div className="w-full flex justify-end">
            <Button type="submit" className={`my-5 dark:bg-blue-200`}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserCreation;
