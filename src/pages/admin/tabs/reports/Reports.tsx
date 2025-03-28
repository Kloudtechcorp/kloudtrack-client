import React, { useState } from "react";
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
import NoDataOptions from "@/pages/error/NoDataOptions";
import { Input } from "@/components/ui/input";
import NoBugsOptions from "@/pages/error/NoBugsFound";

const Reports = () => {
  const {
    data: getBugReports,
    isLoading,
    isError,
    refetch,
  } = useGetBugReports();
  const { mutateAsync: updateBugReport, isPending } = useUpdateBug(refetch);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "RESOLVED">("ALL");

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

  const filteredBugReports = getBugReports.filter((item) => {
    const matchesStatus =
      filter === "ALL" || item.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-5 w-full">
      <div className="flex justify-between items-center pt-5">
        <span className="font-bold text-lg">Bug Reports</span>
        <div>
          <button
            onClick={() => setFilter("ALL")}
            className={`mr-4 ${filter === "ALL" ? "font-bold" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("OPEN")}
            className={`mr-4 ${filter === "OPEN" ? "font-bold" : ""}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilter("RESOLVED")}
            className={`${filter === "RESOLVED" ? "font-bold" : ""}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <span className="flex pb-5 text-sm">
        This page will show the list of bugs reported by the users.
      </span>

      <Input
        type="text"
        placeholder="Search Bugs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex p-2 border rounded-md w-full mb-2"
      />

      {filteredBugReports.length === 0 ? (
        <div className="py-4">
          <NoBugsOptions />
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[67vh] custom-scrollbar">
          {filteredBugReports.map((item) => (
            <Accordion className="mr-2" type="single" collapsible key={item.id}>
              <AccordionItem value={`item-${item.id}`}>
                <AccordionTrigger className="hover:none">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <span className="text-start font-bold">
                          [#{item.id}] - {item.title}
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
                    <span className="min-h-36 text-base">
                      {item.description}
                    </span>
                    <div className="flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <span className="hover:underline hover:cursor-pointer flex items-center space-x-2">
                            {item.status === "RESOLVED" ? (
                              <>
                                <img
                                  src="https://cdn.discordapp.com/emojis/817726838419882004.webp?size=128"
                                  alt="Open Issue Icon"
                                  className="w-[4rem] h-[4rem]"
                                />
                                <span>Open this issue again?</span>
                              </>
                            ) : (
                              <>
                                <img
                                  src="https://cdn.discordapp.com/emojis/598893895820115973.webp?size=256&animated=true"
                                  alt="Resolved Icon"
                                  className="w-[6rem] h-[6rem]"
                                />
                                <span>Mark as resolved?</span>
                              </>
                            )}
                          </span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Did you resolve this issue?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {item.status === "RESOLVED"
                                ? "This means the issue has not been resolved, or it emerged again. Devs, please do your thing!"
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
      )}
    </div>
  );
};

export default Reports;
