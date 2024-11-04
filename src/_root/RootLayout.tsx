import { Navigate, Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Header from "@/components/shared/Header";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/context/authContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

const RootLayout = () => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(false);
  const [time, setTime] = useState("");
  const { user, isLoading } = useUserContext();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();
      const currentDate = dateObject.toDateString();
      const currentTime = dateObject.toLocaleTimeString();
      setTime(currentDate + ", " + currentTime);
    }, 1000);
  }, []);

  const handleBurgerMenu = (data: boolean) => {
    setClicked(data);
  };

  return (
    <div className="flex flex-col w-full">
      <SidebarProvider>
        <div className="w-full bg-white dark:bg-[#181819] px-2 h-20 flex text-center">
          <div className="flex px-[1.25rem] gap-2">
            {/* <img
              src="/assets/icons/burger.svg"
              width={30}
              onClick={handleClick}
              className="dark:invert hidden md:block"
            /> */}
            <SidebarTrigger />
          </div>

          <div className="items-center flex w-full flex-row justify-center">
            <div className="flex flex-col text-center">
              <span className="text-3xl font-bold capitalize">
                {user.username}
              </span>
              <span>{time}</span>
            </div>
          </div>
        </div>{" "}
        <div className="flex h-[calc(100vh-5rem)]">
          {/* <LeftSidebar expand={clicked} /> */}
          {/* <AppSidebar /> */}
          <section className="flex-1 flex bg-white dark:bg-[#181819]">
            <Outlet />
          </section>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;
