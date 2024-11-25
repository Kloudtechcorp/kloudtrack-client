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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/hooks/context/authContext";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const defaultValues = {
  username: "",
  role: "USER",
  password: "",
  grantedStations: [],
};

const UserCreation = () => {
  const { user } = useUserContext();
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectContent>
                    </Select>
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
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="my-4">
              {form.watch("role") === "USER" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Granted Stations</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[460px] pt-3">
                    <DialogTitle className="font-medium">
                      Station Access
                    </DialogTitle>
                    <DialogDescription>
                      Select stations in which this user should have access.
                    </DialogDescription>
                    <Separator />
                    <ScrollArea className="h-[250px] w-full rounded-sm border p-1">
                      <FormField
                        control={form.control}
                        name="grantedStations"
                        render={() => (
                          <FormItem>
                            {user.stations.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="grantedStations"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row space-x-2 space-y-0 justify-items-center">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.name}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </>
          <div className="w-full flex justify-end">
            <Button type="submit" className="my-5" variant="default">
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserCreation;
