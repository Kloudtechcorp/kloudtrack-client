import { useEffect, useState } from "react";

import { HeaderProps } from "@/types";
import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "./ModeToggle";
import { Twirl as Hamburger } from "hamburger-react";

const Header = ({ burgerMenu }: HeaderProps) => {
  const [data, setData] = useState(true);
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
    setData(!data);
    burgerMenu(data);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full bg-white dark:bg-[#181819] p-2 h-[3.5rem] flex flex-col text-center justify-center items-center gap-2">
          <Skeleton className="w-44 h-4" />
          <Skeleton className="w-52 h-5" />
          <Skeleton className="w-64 h-6" />
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#181819] px-1 h-[3.5rem] flex text-center items-center">
          <div className="flex hover:cursor-pointer">
            <Hamburger size={20} toggled={data} toggle={handleClick} />
          </div>

          <div className="items-center flex w-full flex-row justify-center">
            <div className="flex flex-col text-center">
              <span className="text-2xl font-bold capitalize">
                {user.username}
              </span>
              <span className="text-sm">{time}</span>
            </div>
          </div>
          <div className="">
            <ModeToggle expand={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
