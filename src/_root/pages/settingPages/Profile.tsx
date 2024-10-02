import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateString } from "@/lib/utils";
import { useGetUserProfile } from "@/hooks/react-query/queries";
import {
  useDeleteApiKey,
  useGenerateApi,
  useUpdateApiKey,
} from "@/hooks/react-query/mutations";

const Profile = () => {
  const { data: profile, refetch } = useGetUserProfile();
  const { mutate: generateApi, isPending: isGeneratingApi } =
    useGenerateApi(refetch);
  const { mutate: refreshApiKey } = useUpdateApiKey(refetch);
  const { mutate: deleteApiKey } = useDeleteApiKey(refetch);

  return (
    <div className="px-5 w-full h-full flex flex-col gap-3">
      <Card x-chunk="dashboard-05-chunk-3">
        {!profile ? (
          <div className="p-5">
            <CardHeader className="px-2 flex flex-row justify-between">
              <div>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  This section contains your username and api key.
                </CardDescription>
              </div>
            </CardHeader>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <CardHeader className="px-7 flex flex-row justify-between">
              <div>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  This section contains your username and api key.
                </CardDescription>
              </div>
              {!profile.apiKeys && (
                <Button
                  className="dark:text-white"
                  onClick={() => generateApi()}
                >
                  {isGeneratingApi ? "Loading" : "Generate Api Key"}
                </Button>
              )}
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col w-full items-start">
                    <span className="text-md font-bold">Username</span>
                    <div
                      className="capitalize text-lg
                        border border-transparent rounded-none py-0 "
                    >
                      {profile.username}
                    </div>
                    <span className="text-xs">
                      Your profile was created on{" "}
                      {formatDateString(profile.createdAt)}
                    </span>
                  </div>
                </div>
                {profile.apiKeys ? (
                  <div className="flex gap-2">
                    <div className="flex flex-col w-full">
                      <span className="text-nowrap text-md font-bold ">
                        Api key:
                      </span>
                      <div className="flex flex-row gap-2 justify-between items-center text-center">
                        <div
                          className="capitalize text-lg
                        border border-transparent rounded-none"
                        >
                          {profile.apiKeys.apiKey}
                        </div>
                        <div className="flex gap-2 justify-end items-end">
                          <Button
                            className="bg-gray-500 hover:bg-gray-700"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                profile.apiKeys.apiKey
                              );
                              toast.success("API key copied to clipboard");
                            }}
                          >
                            <img src="/assets/icons/copy.svg" width={30} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-blue-500 hover:bg-blue-700">
                                <img
                                  src="/assets/icons/refresh.svg"
                                  width={30}
                                />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your current api key and
                                  will create a new one.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    refreshApiKey();
                                    refetch();
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-red-500 hover:bg-red-700">
                                <img
                                  src="/assets/icons/delete.svg"
                                  width={30}
                                />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your api key.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    deleteApiKey();
                                    refetch();
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                      <span className="text-xs">
                        The API key was generated on{" "}
                        {formatDateString(profile.apiKeys.createdAt)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>No api key generated</div>
                )}
              </div>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
