import { useGetBugReports } from "@/hooks/react-query/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDateString } from "@/lib/utils";
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
import { useUpdateBug } from "@/hooks/react-query/mutations";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataOptions from "@/components/shared/NoDataOptions";
import { Button } from "@/components/ui/button";

const ReportedBugs = () => {
  const {
    data: getBugReports,
    isLoading,
    isError,
    refetch,
  } = useGetBugReports();
  const { mutateAsync: updateBugReport, isPending } = useUpdateBug(refetch);
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 py-4">
        <Skeleton className="w-full !h-6 cardContainer dark:bg-secondary" />
        <Skeleton className="w-full !h-64 cardContainer dark:bg-secondary" />
      </div>
    );
  }

  if (isError || !getBugReports) {
    return (
      <div className="py-4">
        <NoDataOptions />
      </div>
    );
  }

  return (
    <div className="px-5 w-full">
      <span className="flex pt-5 font-bold text-lg">Bug Reports</span>
      <span className="flex pb-5 text-sm">
        This page will show the list of bugs reported by the users.
      </span>
      {getBugReports.map((item) => (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:none">
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="text-start font-bold">
                      [#{item.id}] - {item.title}{" "}
                    </span>
                    <span
                      className={
                        item.status === "RESOLVED"
                          ? ` bg-green-500 px-3 py-1 rounded-full text-sm self-center text-white `
                          : ` bg-red-500 px-3 py-1 rounded-full text-sm self-center text-white `
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                  <span className="text-sm text-start">
                    Submitted by{" "}
                    <span className="underline">
                      {!item.user ? "Anonymous" : item.user.username}
                    </span>{" "}
                    at{" "}
                    <span className="">
                      {formatDateString(item.createdAt, "long")}
                    </span>
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col w-full gap-2">
                <span className="text-xs">Browser: {item.metadata}</span>
                <span className="min-h-36 text-base">{item.description}</span>
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        {item.status === "RESOLVED"
                          ? "😭 Open this issue again"
                          : "✔ Mark as resolved"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Did you resolve this issue?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {item.status === "RESOLVED"
                            ? "This means the issue has not been resolved, or it emerge again. Devs please do your thing!"
                            : "This means the issue has been fixed by the developer. Be grateful."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            const data = {
                              id: item.id,
                              status:
                                item.status === "RESOLVED"
                                  ? "OPEN"
                                  : "RESOLVED",
                            };
                            updateBugReport(data);
                          }}
                        >
                          {isPending ? "loading..." : "Continue"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default ReportedBugs;
