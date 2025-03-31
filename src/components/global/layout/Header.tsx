import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/global/custom-ui/ModeToggle";
import { Twirl as Hamburger } from "hamburger-react";
import { INITIAL_USER, useUserContext } from "@/hooks/custom-hooks/authContext";
import BugIcon from "@/components/global/icons/BugIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHandleLogout } from "@/hooks/mutations/useAuthMutations";
import SubmitReport from "../forms/SubmitReport";

const Header = ({ burgerMenu }: HeaderToggle) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser, user, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: handleLogout } = useHandleLogout();
  const [clicked, setClicked] = useState(false);
  const [time, setTime] = useState("");

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
  const closeSheet = () => {
    setSheetOpen(false);
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
        <div className="w-full bg-white dark:bg-[#181819] p-1 h-[5rem] flex text-center items-center">
          <div className=" gap-4 md:hidden flex px-2">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger>
                <div className="flex flex-col items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
                  <BugIcon theme="" />
                  {/* <span className="text-xs">Bug Report</span> */}
                </div>
              </SheetTrigger>
              <SheetContent side={"bottom"}>
                <SheetHeader>
                  <SheetTitle>Report a Bug!</SheetTitle>
                  <SubmitReport onClose={closeSheet} />
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex flex-col items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setUser(INITIAL_USER);
                      navigate("/signin");
                      handleLogout();
                    }}
                  >
                    <LogOut className="size-4" />
                    {/* <span className="text-xs">Logout</span> */}
                  </div>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className=" hover:cursor-pointer hidden md:block">
            <Hamburger size={18} toggled={clicked} toggle={handleClick} />
          </div>
          <div className="items-center flex w-full flex-row justify-center my-2">
            <span className="hidden md:block md:size-12">
              <img src={"/assets/pd-icons/pdrrmo-logo.png"} />
            </span>
            <div className="flex flex-col text-center mx-4 ">
              <span className="text-lg md:text-2xl font-bold capitalize ">
                {user.username}
              </span>
              <span className="text-xs md:text-sm">{time}</span>
            </div>
            <span className="hidden md:block md:size-12">
              <img src={"/assets/pd-icons/bataangov.png"} />
            </span>
          </div>
          <div className="mr-10">
            <ModeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
