import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import TableGraphCard from "@/components/dynamic/TableGraphCard";
import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwsVariableCard from "@/components/dynamic/VariableCards/AwsVariableCard";

const Variable = () => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="mainContainer bg-[#F6F8FC] dark:bg-slate-950">
        <div className=" flex flex-col gap-2 container ">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </div>
    );
  }

  const awsIds = user.stations
    .filter((item) => item.type === "AWS")
    .map((item) => item.id);

  return (
    <>
      <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-[1rem] custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 h-full">
            <Skeleton className="w-full cardContainer dark:bg-primary" />
            <Skeleton className="w-full cardContainer dark:bg-primary" />
          </div>
        ) : (
          <Tabs defaultValue="aws" className="w-full flex flex-col">
            <TabsList className="flex justify-start">
              <TabsTrigger value="aws">Weather Stations</TabsTrigger>
              <TabsTrigger value="arg">Rain Gauges</TabsTrigger>
              <TabsTrigger value="rlms">River Level</TabsTrigger>
              <TabsTrigger value="clms">Coastal Level</TabsTrigger>
            </TabsList>
            <TabsContent value="aws">
              <AwsVariableCard id={awsIds} />
            </TabsContent>
            <TabsContent value="arg"></TabsContent>
            <TabsContent value="rlms"></TabsContent>
            <TabsContent value="clms"></TabsContent>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default Variable;
