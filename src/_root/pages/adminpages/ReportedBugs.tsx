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
import { Button } from "@/components/ui/button";
import { updateBugReport } from "@/api/put";
import { useUpdateBug } from "@/hooks/react-query/mutations";

const ReportedBugs = () => {
  const {
    data: getBugReports,
    isLoading,
    isError,
    refetch,
  } = useGetBugReports();
  const { mutateAsync: updateBugReport, isPending } = useUpdateBug(refetch);
  if (isLoading) {
    return <div>...loading</div>;
  }

  if (isError || !getBugReports) {
    return <div>...Error</div>;
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
                          ? `bg-red-300 px-2`
                          : `bg-green-300 px-2`
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                  <span className="text-sm text-start">
                    submitted by {!item.user ? "Anonymous" : item.user.username}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col w-full gap-2">
                <span className="text-xs">
                  {formatDateString(item.createdAt, "long")} using{" "}
                  {item.metadata}
                </span>
                <span className="min-h-36">{item.description}</span>
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <span className="hover:underline hover:cursor-pointer">
                        {item.status === "RESOLVED"
                          ? "Open this issue again?"
                          : "Mark as resolved?"}
                      </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Did you resolve this issue?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This means the issue has been fixed by the developer.
                          Be grateful.
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
