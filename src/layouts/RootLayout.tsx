import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Footer, Header, Sidebar } from "@/components/global/layout";

const RootLayout = () => {
  const [clicked, setClicked] = useState(false);
  const handleBurgerMenu = (data: boolean) => {
    setClicked(data);
  };

  return (
    <div className="flex flex-col w-full">
      <Header burgerMenu={handleBurgerMenu} />
      <div className="flex h-[calc(100vh-4.5rem)] bg-white dark:bg-[#181819] w-full ">
        <Sidebar clicked={clicked} />
        <div className="block md:hidden ">
          <Footer />
        </div>
        <section className="flex-1 flex bg-white dark:bg-[#181819] w-full">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default RootLayout;
