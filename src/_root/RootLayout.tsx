import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Header from "@/components/shared/Header";
import { useState } from "react";
import BottomNavbar from "@/components/shared/BottomNavbar";

const RootLayout = () => {
  const [clicked, setClicked] = useState(false);
  const handleBurgerMenu = (data: boolean) => {
    setClicked(data);
  };

  return (
    <div className="flex flex-col w-full">
      <Header burgerMenu={handleBurgerMenu} />
      <div className="flex h-[calc(100vh-3.5rem)] bg-white dark:bg-[#181819] w-full ">
        <LeftSidebar clicked={clicked} />
        <div className="block md:hidden ">
          <BottomNavbar />
        </div>
        <section className="flex-1 flex bg-white dark:bg-[#181819] w-full">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
