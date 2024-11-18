import { Button } from "@/components/ui/button";

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
import { useDeleteApiKey } from "@/hooks/react-query/mutations";
import { useUserContext } from "@/hooks/context/authContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddApiKey from "@/components/forms/AddApiKey";
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
import { useTheme } from "@/components/theme-provider";
import CopyIcon from "@/components/shared/icons/CopyIcon";
import DeleteIconProfile from "@/components/shared/icons/DeleteIconProfile";

const Profile = () => {
  const { theme } = useTheme();
  const { user } = useUserContext();
  const { data: profile, refetch } = useGetUserProfile(user.id);
  const { mutateAsync: deleteApiKey } = useDeleteApiKey(refetch);

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
            <CardHeader className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  This section contains your username and api key.
                </CardDescription>
              </div>
              {profile.apiKeys.length < 3 && profile.apiKeys.length > -1 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">Add api key</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <AddApiKey onSuccess={refetch} />
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <div className="w-[96%] h-px bg-black mx-auto"></div>

            <CardContent>
              <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-col ">
                  <div className="flex flex-col w-full items-start">
                    <span className="text-md font-bold">Username</span>
                    <span className="capitalize text-lg">
                      {profile.username}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Your profile was created on{" "}
                      {formatDateString(profile.createdAt, "long")}
                    </span>
                  </div>
                </div>
                <span className="text-nowrap text-md font-bold">
                  Authentication keys:
                </span>
                {profile.apiKeys ? (
                  profile.apiKeys.map((item) => (
                    <Card className="flex gap-2 p-5">
                      <div className="flex flex-row w-full ">
                        <div className="w-20 flex justify-center">
                          <div className="flex flex-col gap-2 justify-center">
                            <div>
                              <img
                                src="/assets/icons/key.svg"
                                width={50}
                                className="dark:invert hidden md:block"
                              />
                            </div>
                            <Card className="flex justify-center bg-transparent shadow-none rounded-md">
                              API
                            </Card>
                          </div>
                        </div>
                        <div className="w-full flex flex-col">
                          <span className="capitalize font-medium text-lg">
                            {item.title}
                          </span>
                          <span className="text-base">
                            Token: {item.apiKey}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            Expires on {item.expiresAt}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            Generated on{" "}
                            {formatDateString(item.createdAt, "long")}
                          </span>
                        </div>
                        <div className="flex gap-2 flex-col">
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(item.apiKey);
                            }}
                          >
                            <CopyIcon theme={theme} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button>
                                <DeleteIconProfile theme={theme} />
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
                                    deleteApiKey(item.id);
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
                    </Card>
                  ))
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
