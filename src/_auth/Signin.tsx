// import { useTheme } from "@/components/theme-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/types/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "@/hooks/context/authContext";
import HashLoader from "react-spinners/PacmanLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { useSignInAccount } from "@/hooks/react-query/mutations";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Signin = () => {
  const navigate = useNavigate();
  // const { theme } = useTheme();
  const { isAuthenticated, checkAuthUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof login>) => {
    setIsLoading(true);
    try {
      const session = await signInAccount(values);

      if (!session) {
        toast({ title: "Login failed. Please try again." });
      }
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });
      }
    } catch (error: unknown) {
      toast({ title: "Username or password not found" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center relative bgColor">
              <HashLoader
                color={"#fbd008"}
                size={150}
                className="absolute top-0 left-[15.5rem] z-50"
              />
              <PuffLoader
                color={"#545454"}
                size={500}
                className="absolute top-0 left-[-10rem]"
              />
            </div>
          ) : (
            <Form {...form}>
              <div className=" w-full h-full items-center flex flex-col justify-center gap-5 bg-secondary">
                <svg
                  className="h-14 absolute top-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 1000"
                >
                  <path
                    className="fill-[#545454] dark:fill-white"
                    d="M143.74,240.62l108.36-62.6v504.11l-88.65,88.65-19.72-11.39c-28.79-16.6-46.51-47.3-46.51-80.55v-357.65c0-33.25,17.72-63.95,46.51-80.55Z"
                  />
                  <path
                    className="fill-[#545454] dark:fill-white"
                    d="M753.15,181.09l-408.02,408.02V124.35l108.36-62.6c28.79-16.6,64.23-16.6,93.02,0l206.64,119.34Z"
                  />
                  <path
                    className="fill-[#545454] dark:fill-white"
                    d="M902.76,321.17v357.65c0,33.25-17.72,63.95-46.51,80.55l-19.72,11.39-270.77-270.77,270.77-270.77,19.72,11.39c28.79,16.6,46.51,47.3,46.51,80.55Z"
                  />
                  <path
                    className="fill-[#FBD008]"
                    d="M753.15,818.91l-206.64,119.34c-28.79,16.6-64.23,16.6-93.02,0l-206.64-119.34,253.15-253.15,253.15,253.15Z"
                  />
                </svg>

                <div className="font-Courier py-4 px-6 pb-6 rounded-md w-[40rem] max-w-full bgColor border">
                  <div className="pb-6">
                    <p className="leading-7 ">
                      Welcome to Kloudtrack by Kloudtech, your official weather
                      monitoring hub! 🌤️ <br></br>
                      If you landed here by mistake, head over to our{" "}
                      <a
                        className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 "
                        href="http://kloudtrack.kloudtechsea.com"
                      >
                        public website
                      </a>
                      . <br></br>
                      Otherwise, let's dive into some weather tracking fun!
                    </p>
                  </div>

                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 w-full "
                  >
                    <div className="gap-1 flex flex-col">
                      <span className="text-blue-500">Username </span>
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
                    <Button
                      // onClick={() => navigate("/dashboard")}
                      variant="default"
                    >
                      Continue
                    </Button>
                  </form>
                </div>
              </div>
            </Form>
          )}
        </>
      )}
    </>
  );
};

export default Signin;
