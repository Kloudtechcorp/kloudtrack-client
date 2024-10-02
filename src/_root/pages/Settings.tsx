import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./settingPages/ChangePassword";
import Profile from "./settingPages/Profile";

const Settings = () => {
  return (
    <div className="flex w-full h-full dark:bg-slate-950 bg-[#F6F8FC] p-2">
      <Tabs
        defaultValue="profile"
        className="w-full flex lg:flex-row flex-col p-3 rounded-2xl gap-5 justify-center container"
      >
        <TabsList className="flex flex-col justify-start gap-3 w-full lg:w-1/5 h-28 p-5 container">
          <TabsTrigger value="profile" className="w-full h-10">
            Profile
          </TabsTrigger>
          <TabsTrigger value="change" className="w-full h-10">
            Change Password
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="change"
          className="container w-full h-full my-0 bg-muted rounded-md p-2"
        >
          <ChangePassword />
        </TabsContent>
        <TabsContent
          value="profile"
          className="container w-full h-full my-0 bg-muted rounded-md p-2"
        >
          <Profile />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
