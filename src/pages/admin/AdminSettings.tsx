import { useUserContext } from "@/hooks/custom-hooks/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotFound from "@/pages/error/NotFound";
import { Card } from "@/components/ui/card";
import {
  AddStation,
  AddPsgc,
  Reports,
  StationList,
  StationType,
  UserControl,
  CreateUser,
} from "./tabs";

const AdminSettings = () => {
  const { user } = useUserContext();

  return user.role === "ADMIN" ? (
    <div className="flex w-full h-full dark:bg-secondary bg-[#F6F8FC] p-2">
      <Tabs
        defaultValue="account"
        className="w-full flex flex-col p-3 rounded-2xl gap-5 "
      >
        <TabsList className="flex flex-row justify-start gap-3 w-full p-5 container">
          <TabsTrigger value="account" className="w-full">
            Account Creation
          </TabsTrigger>
          <TabsTrigger value="psgc" className="w-full">
            Add PSGC
          </TabsTrigger>
          <TabsTrigger value="stationType" className="w-full">
            Add Station Type
          </TabsTrigger>
          <TabsTrigger value="station" className="w-full">
            Station Registration
          </TabsTrigger>
          <TabsTrigger value="list" className="w-full">
            Station List
          </TabsTrigger>
          <TabsTrigger value="users" className="w-full">
            User Control
          </TabsTrigger>
          <TabsTrigger value="bugs" className="w-full">
            Bug Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="container px-0">
          <Card>
            <CreateUser />
          </Card>
        </TabsContent>
        <TabsContent value="psgc" className="container px-0">
          <Card>
            <AddPsgc />
          </Card>
        </TabsContent>
        <TabsContent value="stationType" className="container px-0">
          <Card>
            <StationType />
          </Card>
        </TabsContent>
        <TabsContent value="station" className="container px-0">
          <Card>
            <AddStation />
          </Card>
        </TabsContent>
        <TabsContent value="list" className="container px-0">
          <Card>
            <StationList />
          </Card>
        </TabsContent>
        <TabsContent value="users" className="container px-0">
          <Card>
            <UserControl />
          </Card>
        </TabsContent>
        <TabsContent value="bugs" className="container px-0">
          <Card>
            <Reports />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ) : (
    <div className="rounded-xl bg-[#F6F8FC] dark:bg-secondary w-full h-full">
      <NotFound />
    </div>
  );
};

export default AdminSettings;
