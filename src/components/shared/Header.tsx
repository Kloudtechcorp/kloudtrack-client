import { useEffect, useState } from "react";

import { HeaderProps } from "@/types";
import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "./ModeToggle";
import { Twirl as Hamburger } from "hamburger-react";

const Header = ({ burgerMenu }: HeaderProps) => {
  const [clicked, setClicked] = useState(false);
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

  const handleClick = () => {
    setClicked(!clicked);
    burgerMenu(!clicked);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full bgColor p-2 h-[3.5rem] flex flex-col text-center justify-center items-center gap-2">
          <Skeleton className="w-44 h-4" />
          <Skeleton className="w-52 h-5" />
          <Skeleton className="w-64 h-6" />
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#181819] p-1 h-[4.5rem] flex text-center items-center">
          <div className="flex hover:cursor-pointer">
            <Hamburger size={18} toggled={clicked} toggle={handleClick} />
          </div>
          <div className="items-center flex w-full flex-row justify-center gap-4">
            <span className="size-12">
              <img src={"/assets/pd-icons/pdrrmo-logo.png"} />
            </span>
            <div className="flex flex-col text-center w-52 mx-4">
              <span className="text-2xl font-bold capitalize">
                {user.username}
              </span>
              <span className="text-sm">{time}</span>
            </div>
            <span className="size-12">
              <img src={"/assets/pd-icons/bataangov.png"} />
            </span>
          </div>
          <div className="mr-2 ">
            <ModeToggle expand={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
