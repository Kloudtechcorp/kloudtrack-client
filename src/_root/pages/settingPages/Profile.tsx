import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { checkStationType, formatDateString } from "@/lib/utils";
import { useGetUserProfile } from "@/hooks/react-query/queries";
import { useDeleteApiKey } from "@/hooks/react-query/mutations";
import { useUserContext } from "@/hooks/context/authContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

const Profile = () => {
  const { theme } = useTheme();
  const { user } = useUserContext();
  const { data: profile, refetch } = useGetUserProfile(user.id);
  const { mutateAsync: deleteApiKey } = useDeleteApiKey(refetch);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStationNames = user.stations.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
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
                <Skeleton className="h-4 w-full dark:bg-secondary" />
                <Skeleton className="h-4 w-full dark:bg-secondary" />
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
                    <DialogHeader>Add New API Key</DialogHeader>
                    <DialogDescription>
                      Provide the necessary details to create a new API key for
                      your application.
                    </DialogDescription>
                    <AddApiKey onSuccess={refetch} />
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <div className="w-[96%] h-px bg-black dark:bg-white mx-auto"></div>

            <CardContent>
              <div className="flex flex-col gap-2 py-2">
                {/* Profile Section */}
                <div className="flex flex-col">
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

                {/* API Keys Section */}
                {profile.apiKeys?.length > 0 ? (
                  <>
                    <span className="text-nowrap text-md font-bold">
                      Authentication Keys:
                    </span>
                    {profile.apiKeys.map((item) => (
                      <Card className="flex gap-2 p-5" key={item.id}>
                        <div className="flex flex-row w-full">
                          <div className="w-20 flex justify-center">
                            <div className="flex flex-col gap-2 justify-center">
                              <img
                                src="/assets/icons/key.svg"
                                width={50}
                                className="dark:invert hidden md:block"
                                alt="API Key Icon"
                              />
                              <Card className="flex justify-center bg-transparent shadow-none rounded-md">
                                API
                              </Card>
                            </div>
                          </div>
                          <div className="w-full flex flex-col">
                            <h2 className="capitalize font-medium text-lg flex gap-2 items-center">
                              <span>{item.title}</span>
                              <span className="flex">
                                {item.expiresAt &&
                                new Date(item.expiresAt) <= new Date() ? (
                                  <Badge>Expired</Badge>
                                ) : null}
                              </span>
                            </h2>
                            <span className="text-base">
                              Token: {item.apiKey}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              Expires on{" "}
                              {item.expiresAt && item.expiresAt !== "Never"
                                ? formatDateString(item.expiresAt, "long")
                                : item.expiresAt}
                            </span>
                            <span className="text-muted-foreground text-sm">
                              Generated on{" "}
                              {formatDateString(item.createdAt, "long")}
                            </span>
                          </div>
                          <div className="flex gap-2 flex-col">
                            <Button
                              aria-label="Copy API Key"
                              className="bg-inherit hover:bg-inherit border border-transparent hover:border-black dark:hover:border-white transition-all ease-in-out duration-300"
                              onClick={() => {
                                navigator.clipboard.writeText(item.apiKey);
                                toast({
                                  title: "API key successfully copied.",
                                });
                              }}
                            >
                              <CopyIcon theme={theme} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  aria-label="Delete API Key"
                                  className="bg-inherit hover:bg-inherit border border-transparent hover:border-black dark:hover:border-white transition-all ease-in-out duration-300"
                                >
                                  <Trash2 className="invert" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your API key.
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
                    ))}
                  </>
                ) : (
                  <div>No API key generated</div>
                )}
              </div>
            </CardContent>

            <div className="px-7 pb-5 flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Search station name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex p-2 border rounded-md w-fit"
              />
              {filteredStationNames.length === 0 ? (
                <div>No station names to filter.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-12">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableCaption>
                    Reference the station ID to integrate with the API.
                  </TableCaption>
                  <TableBody>
                    {filteredStationNames.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="h-10">{item.name}</TableCell>
                        <TableCell>{checkStationType(item.type)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
