import { useUserContext } from "@/hooks/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StationRegistration from "./adminpages/StationRegistration";
import UserCreation from "./adminpages/UserCreation";
import AddPsgc from "./adminpages/AddPsgc";
import AddStationType from "./adminpages/AddStationType";
import NotFound from "@/components/shared/NotFound";
import { Card } from "@/components/ui/card";
import { UserControl } from "./adminpages/UserControl";
import StationList from "./adminpages/StationList";

const AdminSettings = () => {
  const { user } = useUserContext();

  return user.role === "ADMIN" ? (
    <div className="flex w-full h-full dark:bg-slate-950 bg-[#F6F8FC] p-2">
      <Tabs
        defaultValue="account"
        className="w-full flex lg:flex-row flex-col p-3 rounded-2xl gap-5 justify-center container"
      >
        <TabsList className="flex flex-col justify-start gap-3 w-full lg:w-1/5 h-28 p-5 container">
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
        </TabsList>
        <TabsContent value="account" className="container px-0">
          <Card>
            <UserCreation />
          </Card>
        </TabsContent>
        <TabsContent value="psgc" className="container px-0">
          <Card>
            <AddPsgc />
          </Card>
        </TabsContent>
        <TabsContent value="stationType" className="container px-0">
          <Card>
            <AddStationType />
          </Card>
        </TabsContent>
        <TabsContent value="station" className="container px-0">
          <Card>
            <StationRegistration />
          </Card>
        </TabsContent>
        <TabsContent value="list" className="container px-0">
          <Card>
            <StationList />
          </Card>
        </TabsContent>
        <TabsContent value="users" className="container px-0">
          <Card className="px-4">
            <UserControl />
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
