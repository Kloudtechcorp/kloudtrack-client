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
import PuffLoader from "react-spinners/PuffLoader";
import { useSignInAccount } from "@/hooks/react-query/mutations";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Enhanced login schema with device info
const enhancedLoginSchema = login.extend({
  deviceInfo: z
    .object({
      device: z.string(),
      browser: z.string(),
      os: z.string(),
      location: z.string().optional(),
    })
    .optional(),
});

type EnhancedLoginType = z.infer<typeof enhancedLoginSchema>;

const Signin = () => {
  const navigate = useNavigate();
  // const { theme } = useTheme();
  const { isAuthenticated, checkAuthUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState<string | null>(null);
  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<EnhancedLoginType>({
    resolver: zodResolver(enhancedLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Fetch location data on component mount
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "https://ipinfo.io/json?token=d4f581d268b14e"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.city && data.country) {
            setLocationData(
              `${data.city}, ${data.region} ${data.country} ${data.postal}, coordinates: ${data.loc}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  // Get device information
  const getDeviceInfo = () => {
    const userAgent = window.navigator.userAgent;
    let deviceType = "Unknown";
    let browserName = "Unknown";
    let osName = "Unknown";

    // Detect device type
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      deviceType = /iPad/i.test(userAgent) ? "iPad" : "iPhone";
    } else if (/Android/i.test(userAgent)) {
      deviceType = /Tablet/i.test(userAgent)
        ? "Android Tablet"
        : "Android Phone";
    } else if (/Windows Phone/i.test(userAgent)) {
      deviceType = "Windows Phone";
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
      deviceType = "Mac";
    } else if (/Windows|Win32|Win64|Windows NT/i.test(userAgent)) {
      deviceType = "Windows PC";
    } else if (/Linux/i.test(userAgent)) {
      deviceType = "Linux";
    }

    // Detect browser
    if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
      browserName = "Chrome";
    } else if (/firefox/i.test(userAgent)) {
      browserName = "Firefox";
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browserName = "Safari";
    } else if (/edg/i.test(userAgent)) {
      browserName = "Edge";
    } else if (/opera|opr/i.test(userAgent)) {
      browserName = "Opera";
    } else if (/msie|trident/i.test(userAgent)) {
      browserName = "Internet Explorer";
    }

    // Detect OS
    if (/Windows NT 10.0/i.test(userAgent)) {
      osName = "Windows 10";
    } else if (/Windows NT 6.3/i.test(userAgent)) {
      osName = "Windows 8.1";
    } else if (/Windows NT 6.2/i.test(userAgent)) {
      osName = "Windows 8";
    } else if (/Windows NT 6.1/i.test(userAgent)) {
      osName = "Windows 7";
    } else if (/Mac OS X/i.test(userAgent)) {
      osName = "macOS";
    } else if (/Android/i.test(userAgent)) {
      osName = "Android";
    } else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) {
      osName = "iOS";
    } else if (/Linux/i.test(userAgent)) {
      osName = "Linux";
    }

    return {
      device: deviceType,
      browser: browserName,
      os: osName,
      location: locationData || "Unknown location",
    };
  };

  const onSubmit = async (values: EnhancedLoginType) => {
    setIsLoading(true);
    try {
      // Add device info to login data
      const deviceInfo = getDeviceInfo();
      const loginData = {
        ...values,
        deviceInfo,
      };
      console.log(loginData);
      const session = await signInAccount(loginData);

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
            <div className="w-full h-full flex justify-center items-center bgColor">
              <PuffLoader color={"#545454"} size={500} />
            </div>
          ) : (
            <Form {...form}>
              <div className=" w-full h-full items-center flex flex-col justify-center gap-5 bg-secondary p-4">
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
