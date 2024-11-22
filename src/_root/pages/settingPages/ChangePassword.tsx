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
import {
  useHandleLogout,
  useUpdateUserPassword,
} from "@/hooks/react-query/mutations";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { INITIAL_USER, useUserContext } from "@/hooks/context/authContext";
import { Card } from "@/components/ui/card";

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
    setPasswordCriteria({
      length: false,
      uppercase: false,
      lowercase: false,
      digit: false,
      specialChar: false,
    });
  };

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    updateUserPassword(values, {
      onSuccess: () => {
        clearForms();
        handleLogout();
        toast.success("Please login again!");
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/signin");
      },
      onError: () => {
        clearForms();
      },
    });
  };

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const checkPasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordCriteria(criteria);
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  return (
    <Form {...form}>
      <Card className="px-5 w-full h-full">
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
                      onChange={(e) => {
                        field.onChange(e);
                        checkPasswordStrength(e.target.value); // Check password as the user types
                      }}
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

            <div className="mt-2 text-sm">
              <ul>
                <li
                  className={
                    passwordCriteria.length ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordCriteria.length ? "✔" : "✘"} Must be a minimum of 8
                  characters.
                </li>
                <li
                  className={
                    passwordCriteria.uppercase
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {passwordCriteria.uppercase ? "✔" : "✘"} Must contain at least
                  one uppercase letter.
                </li>
                <li
                  className={
                    passwordCriteria.lowercase
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {passwordCriteria.lowercase ? "✔" : "✘"} Must contain at least
                  one lowercase letter.
                </li>
                <li
                  className={
                    passwordCriteria.digit ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordCriteria.digit ? "✔" : "✘"} Must contain at least one
                  digit.
                </li>
                <li
                  className={
                    passwordCriteria.specialChar
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {passwordCriteria.specialChar ? "✔" : "✘"} Must contain at
                  least one special character.
                </li>
              </ul>
            </div>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className={`my-5 dark:bg-blue-200`}
                disabled={!isPasswordValid}
              >
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </Form>
  );
};

export default ChangePassword;
