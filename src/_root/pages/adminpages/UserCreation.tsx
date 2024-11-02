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
import { userValidation } from "@/types/validation";
import { useCreateUser } from "@/hooks/react-query/mutations";
import { useState } from "react";

const defaultValues = {
  username: "",
  role: "USER",
  password: "",
};

const UserCreation = () => {
  const { mutate: createUser, isPending } = useCreateUser();
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
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

  const onSubmit = (values: z.infer<typeof userValidation>) => {
    createUser(values, {
      onSuccess: () => {
        clearForms();
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
      <div className="px-5 w-full">
        {isPending && <div className="w-full "></div>}
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
                      onChange={(e) => {
                        field.onChange(e);
                        checkPasswordStrength(e.target.value); // Check password as the user types
                      }}
                    />
                  </FormControl>
                  {/* <FormMessage className="shad-form_message" /> */}

                  {/* Password Checklist */}
                  <div className="mt-2 text-sm">
                    <ul>
                      <li
                        className={
                          passwordCriteria.length
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordCriteria.length ? "✔" : "✘"} Must be a minimum
                        of 8 characters.
                      </li>
                      <li
                        className={
                          passwordCriteria.uppercase
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordCriteria.uppercase ? "✔" : "✘"} Must contain at
                        least one uppercase letter.
                      </li>
                      <li
                        className={
                          passwordCriteria.lowercase
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordCriteria.lowercase ? "✔" : "✘"} Must contain at
                        least one lowercase letter.
                      </li>
                      <li
                        className={
                          passwordCriteria.digit
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordCriteria.digit ? "✔" : "✘"} Must contain at
                        least one digit.
                      </li>
                      <li
                        className={
                          passwordCriteria.specialChar
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {passwordCriteria.specialChar ? "✔" : "✘"} Must contain
                        at least one special character.
                      </li>
                    </ul>
                  </div>
                </FormItem>
              )}
            />
          </>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className={`my-5 dark:bg-blue-200`}
              disabled={!isPasswordValid}
            >
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserCreation;
