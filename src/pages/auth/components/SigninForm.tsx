import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/types/validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const enhancedLoginSchema = login.extend({
  deviceInfo: z
    .object({
      device: z.string(),
      browser: z.string(),
      os: z.string(),
      location: z.string().nullable(),
    })
    .optional(),
});

type EnhancedLoginType = z.infer<typeof enhancedLoginSchema>;

interface SigninFormProps {
  onSubmit: (values: EnhancedLoginType) => Promise<void>;
  deviceInfo: {
    device: string;
    browser: string;
    os: string;
    location: string | null;
  };
}

const SigninForm = ({ onSubmit, deviceInfo }: SigninFormProps) => {
  const form = useForm<EnhancedLoginType>({
    resolver: zodResolver(enhancedLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: EnhancedLoginType) => {
    const loginData = {
      ...values,
      deviceInfo,
    };
    await onSubmit(loginData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div className="gap-1 flex flex-col">
          <span className="text-blue-500">Username</span>
          <div className="w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="username"
                      className="border-r-2 rounded-lg py-1 px-2 grow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="gap-1 flex flex-col">
          <span className="text-blue-500">Password</span>
          <div className="w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      className="border-r-2 rounded-lg py-1 px-2 grow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button variant="default">Continue</Button>
      </form>
    </Form>
  );
};
export default SigninForm;
