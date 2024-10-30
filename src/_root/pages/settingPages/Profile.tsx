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
import { useUserContext } from "@/hooks/context/authContext";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "@/components/shared/Columns";

const Profile = () => {
  const { user } = useUserContext();
  const { data: profile, refetch } = useGetUserProfile(user.id);
  const { mutate: generateApi, isPending: isGeneratingApi } =
    useGenerateApi(refetch);

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
              {profile.apiKeys.length <= 3 && profile.apiKeys.length! > 3 && (
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
                <div className="flex flex-col gap-4">
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
                      {formatDateString(profile.createdAt, "long")}
                    </span>
                  </div>
                  <div className="flex flex-col w-full items-start">
                    <span className="text-md font-bold">ROLE</span>
                    <div
                      className="capitalize text-lg
                        border border-transparent rounded-none py-0 "
                    >
                      {profile.role}
                    </div>
                  </div>
                </div>
                {profile.apiKeys ? (
                  <DataTable columns={columns} data={profile.apiKeys} />
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
