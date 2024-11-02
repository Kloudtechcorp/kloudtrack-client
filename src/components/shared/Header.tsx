import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../theme-provider";
import { HeaderProps } from "@/types";
import { useUserContext } from "@/hooks/context/authContext";
import { Skeleton } from "../ui/skeleton";

const Header = ({ burgerMenu }: HeaderProps) => {
  const { theme } = useTheme();
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

  const handleClick = () => {
    setData(!data);
    burgerMenu(data);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full bg-white dark:bg-[#181819] p-2 h-20 flex flex-col text-center justify-center items-center gap-2">
          <Skeleton className="w-44 h-4" />
          <Skeleton className="w-52 h-5" />
          <Skeleton className="w-64 h-6" />
        </div>
      ) : (
        <div className="w-full bg-white dark:bg-[#181819] px-2 h-20 flex text-center">
          <div className="flex px-[1.25rem] gap-2">
            <img
              src="/assets/icons/burger.svg"
              width={30}
              onClick={handleClick}
              className="dark:invert hidden md:block"
            />
          </div>

          <div className="items-center flex w-full flex-row justify-center">
            {/* <Link to="/home" className="flex gap-3 justify-start p-3">
              <img
                src={
                  theme === "dark"
                    ? "/assets/img/logo-v2.png"
                    : "/assets/img/logo-v1.png"
                }
                alt="logo"
                className="size-12"
              />
            </Link> */}
            <div className="flex flex-col text-center">
              <span className="text-3xl font-bold capitalize">
                {user.username}
              </span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
