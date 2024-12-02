import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateUser,
  useUpdateUserGrants,
} from "@/hooks/react-query/mutations";
import { useUserContext } from "@/hooks/context/authContext";
import { Checkbox } from "@/components/ui/checkbox";

export const userStationValidation = z.object({
  grantedStations: z.array(z.string()),
});

type updateUsersProps = {
  id: number;
  stationIds: string[];
};

const UpdateUser = ({ id, stationIds }: updateUsersProps) => {
  const { user } = useUserContext();
  const { mutate: updateUser, isPending } = useUpdateUserGrants();
  const form = useForm<z.infer<typeof userStationValidation>>({
    resolver: zodResolver(userStationValidation),
    defaultValues: {
      grantedStations: stationIds || [],
    },
  });

  const onSubmit = (values: z.infer<typeof userStationValidation>) => {
    const updatedValues = { ...values, id: id };
    updateUser(updatedValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <>
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
                <FormMessage />
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
    </Form>
  );
};

export default UpdateUser;
