import { useUserContext } from "@/hooks/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StationRegistration from "./adminpages/StationRegistration";
import UserCreation from "./adminpages/UserCreation";
import AddPsgc from "./adminpages/AddPsgc";
import AddStationType from "./adminpages/AddStationType";
import StationList from "./adminpages/StationList";

const AdminSettings = () => {
  const { user } = useUserContext();

  return user.role === "ADMIN" ? (
    <Tabs
      defaultValue="account"
      className="w-full flex-col dark:bg-slate-950 bg-[#F6F8FC] p-3 rounded-2xl overflow-x-auto min-x-[420px]"
    >
      <TabsList className="flex flex-row justify-start container">
        <TabsTrigger value="account">Account Creation</TabsTrigger>
        <TabsTrigger value="psgc">Add PSGC</TabsTrigger>
        <TabsTrigger value="stationType">Add Station Type</TabsTrigger>
        <TabsTrigger value="station">Station Registration</TabsTrigger>
        <TabsTrigger value="list">Station List</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="container">
        <UserCreation />
      </TabsContent>
      <TabsContent value="psgc" className="container">
        <AddPsgc />
      </TabsContent>
      <TabsContent value="stationType" className="container">
        <AddStationType />
      </TabsContent>
      <TabsContent value="station" className="container">
        <StationRegistration />
      </TabsContent>
      <TabsContent value="list" className="container">
        <StationList />
      </TabsContent>
    </Tabs>
  ) : (
    <div>This page is off limits</div>
  );
};

export default AdminSettings;
