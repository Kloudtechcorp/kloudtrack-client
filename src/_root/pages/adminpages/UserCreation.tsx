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
import { userValidation } from "@/types/validation";
import { useCreateUser } from "@/hooks/react-query/mutations";

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
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </>
          <div className="w-full flex justify-end">
            <Button type="submit" className={`my-5 dark:bg-blue-200`}>
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserCreation;
