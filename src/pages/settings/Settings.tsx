import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./settingPages/ChangePassword";
import Profile from "./settingPages/Profile";
import ApiDocument from "./settingPages/ApiDocument";

const Settings = () => {
  return (
    <div className="flex w-full dark:bg-secondary bg-[#F6F8FC] p-2 ">
      <Tabs
        defaultValue="profile"
        className="w-full flex lg:flex-row flex-col p-3 rounded-2xl gap-5 justify-center container"
      >
        <TabsList className="flex flex-col justify-start gap-3 w-full lg:w-1/5 h-28 p-5 container sticky left-0 md:mb-28 lg:mb-0">
          <TabsTrigger value="profile" className="w-full h-10">
            Profile
          </TabsTrigger>
          <TabsTrigger value="change" className="w-full h-10">
            Change Password
          </TabsTrigger>
          <TabsTrigger value="api" className="w-full h-10">
            How to use the API key?
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="change"
          className="container w-full h-full my-0 rounded-md p-2"
        >
          <ChangePassword />
        </TabsContent>
        <TabsContent
          value="profile"
          className="container w-full h-full my-0 rounded-md p-2 overflow-auto no-scrollbar"
        >
          <Profile />
        </TabsContent>
        <TabsContent
          value="api"
          className="container w-full h-full my-0 rounded-md p-2 overflow-auto no-scrollbar"
        >
          <ApiDocument />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
