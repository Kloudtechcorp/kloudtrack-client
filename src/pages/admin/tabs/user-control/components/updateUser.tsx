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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserGrants } from "@/hooks/react-query/mutations";
import { useUserContext } from "@/hooks/context/authContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../../../../../components/ui/input";
import { Separator } from "../../../../../components/ui/separator";

import { CircleHelpIcon } from "lucide-react";
import Tooltip from "../../../../../components/_root/ManualTooltip";

export const userStationValidation = z.object({
  grantedStations: z.array(z.string()),
  username: z.string().optional(),
  password: z.string().optional(),
});

type updateUsersProps = {
  id: number;
  stationIds: string[];
  username?: string;
};

const UpdateUser = ({ id, stationIds, username }: updateUsersProps) => {
  const { user } = useUserContext();
  const { mutate: updateUser, isPending } = useUpdateUserGrants();
  const form = useForm<z.infer<typeof userStationValidation>>({
    resolver: zodResolver(userStationValidation),
    defaultValues: {
      grantedStations: stationIds || [],
      username: username || undefined,
      password: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof userStationValidation>) => {
    const updatedValues = { ...values, id: id };
    console.log(updatedValues);
    updateUser(updatedValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>

                  <FormControl>
                    <Input placeholder="kloudtech" {...field} />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex gap-2 pt-2 py-0.5">
                    <FormLabel>Password</FormLabel>
                    <Tooltip
                      text="Please remember your password, as we cannot retrieve it. Passwords are hashed, not encrypted."
                      position="top"
                    >
                      <CircleHelpIcon size={14} />
                    </Tooltip>
                  </div>{" "}
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    Make sure this field is empty if you are not changing
                    password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="grantedStations"
            render={() => (
              <FormItem>
                <FormLabel>Stations</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {user.stations.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="grantedStations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(item.id)}
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value.filter(
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit" className={`my-5 dark:bg-blue-200`}>
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUser;
