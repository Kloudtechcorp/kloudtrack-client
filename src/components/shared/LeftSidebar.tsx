import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { ModeToggle } from "./ModeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarProps } from "@/types";
import { INITIAL_USER, useUserContext } from "@/hooks/context/authContext";
import { useHandleLogout } from "@/hooks/react-query/mutations";
// import toast from "react-hot-toast";
import BugIcon from "./icons/BugIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BugReport } from "../forms/bugReport";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const LeftSidebar = ({ clicked }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser, user, setIsAuthenticated } = useUserContext();
  const { mutate: handleLogout } = useHandleLogout();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const sidebarItems = [
    {
      imgUrl: "/assets/icons/dashboard.svg",
      route: "/",
      label: "Dashboard",
      tooltip: "Dashboard",
    },
    {
      imgUrl: "/assets/icons/map.svg",
      route: "/map",
      label: "Map",
      tooltip: "Map",
    },
    {
      imgUrl: "/assets/icons/graphs.svg",
      route: "/graphs",
      label: "Graphs",
      tooltip: "Graphs",
    },
    {
      imgUrl: "/assets/icons/satellite.svg",
      route: "/satellite",
      label: "Satellite",
      tooltip: "Satellite",
    },

    {
      imgUrl: "/assets/icons/settings.svg",
      route: "/settings",
      label: "Settings",
      tooltip: "Settings",
    },

    user.role === "ADMIN"
      ? {
          imgUrl: "/assets/icons/adminProtected.svg",
          route: "/admin-settings",
          label: "Admin",
          tooltip: "Admin Settings",
        }
      : null,
  ];

  const closeSheet = () => {
    setSheetOpen(false);
  };

  return (
    <nav
      className={`bg-white dark:bg-[#181819] ease-in-out duration-300 hidden md:flex py-2 ${
        clicked ? "w-44" : "w-[3.5rem]"
      }`}
    >
      <div className="flex flex-col gap-7 w-full">
        <div className="flex flex-col justify-start h-full">
          <ul className="flex flex-col gap-4 justify-start px-2 py-4">
            {sidebarItems.map((link) => {
              if (!link) return null;
              const isActive = pathname === link.route;
              return (
                <TooltipProvider key={link.route}>
                  <Tooltip>
                    <TooltipTrigger>
                      <li
                        className={`${
                          isActive
                            ? "border-b-yellow-400 border-b-4 bg-accent"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        } rounded-sm`}
                      >
                        <NavLink
                          to={link.route}
                          className={clicked ? `flex` : `flex justify-center`}
                        >
                          <div
                            className={`flex gap-4 items-center py-3  ${
                              clicked ? "justify-start px-4" : "justify-center"
                            }`}
                          >
                            <img
                              src={link.imgUrl}
                              className={`dark:invert size-4`}
                            />
                            <div className={`${clicked ? "block" : "hidden"}`}>
                              {link.label}
                            </div>
                          </div>
                        </NavLink>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>{link.tooltip}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </ul>
        </div>

        <div
          className={`w-full flex flex-col justify-end${
            clicked ? "items-start px-4" : "items-center px-2"
          } gap-3 `}
        >
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <div
                className={`flex gap-4 items-center py-3 px-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5`}
              >
                <BugIcon theme={""} />
                <span className={clicked ? "block" : "hidden"}>Bug Report</span>
              </div>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Report a Bug!</SheetTitle>
                <BugReport onClose={closeSheet} />
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <div
                  className={`flex gap-4 items-center py-3 px-2 rounded-sm hover:bg-black/5 dark:hover:bg-black/5 dark:invert ${
                    clicked ? "justify-start" : "justify-center"
                  }`}
                  onClick={() => {
                    setIsAuthenticated(false);
                    setUser(INITIAL_USER);
                    navigate("/signin");
                    handleLogout();
                  }}
                >
                  <LogOut className="dark:bg-transparent dark:invert size-5" />
                  <span
                    className={`dark:invert ${clicked ? "block" : "hidden"}`}
                  >
                    Logout
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
