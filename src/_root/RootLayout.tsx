import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Header from "@/components/shared/Header";
import { useState } from "react";

const RootLayout = () => {
  const [clicked, setClicked] = useState(false);
  const handleBurgerMenu = (data: boolean) => {
    setClicked(data);
  };

  return (
    <div className="flex flex-col w-full">
      <Header burgerMenu={handleBurgerMenu} />
      <div className="flex h-[calc(100vh-5rem)]">
        <LeftSidebar expand={clicked} />
        <section className="flex-1 flex bg-white dark:bg-[#181819]">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
