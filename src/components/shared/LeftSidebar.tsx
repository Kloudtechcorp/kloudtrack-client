import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarProps } from "@/types";
import { INITIAL_USER, useUserContext } from "@/hooks/context/authContext";
import { useHandleLogout } from "@/hooks/react-query/mutations";
import toast from "react-hot-toast";
import BugIcon from "./icons/BugIcon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BugReport } from "../forms/bugReport";

// import FormIcon from "./icons/formIcon";

const LeftSidebar = ({ expand }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser, user, setIsAuthenticated } = useUserContext();
  const { mutate: handleLogout } = useHandleLogout();

  const sidebarItems = [
    {
      imgUrl: "/assets/icons/dashboard.svg",
      route: "/",
      label: "Dashboard",
    },
    {
      imgUrl: "/assets/icons/map.svg",
      route: "/map",
      label: "Map",
    },
    {
      imgUrl: "/assets/icons/graphs.svg",
      route: "/graphs",
      label: "Graphs",
    },
    {
      imgUrl: "/assets/icons/satellite.svg",
      route: "/satellite",
      label: "Satellite",
    },

    {
      imgUrl: "/assets/icons/settings.svg",
      route: "/settings",
      label: "Settings",
    },

    user.role === "ADMIN"
      ? {
          imgUrl: "/assets/icons/adminProtected.svg",
          route: "/admin-settings",
          label: "Admin",
        }
      : null,
  ];

  return (
    <nav
      className={`bg-white dark:bg-[#181819] ease-in-out duration-300 hidden md:flex ${
        expand ? "w-44" : "w-[3.5rem]"
      }`}
    >
      <div className="flex flex-col gap-7 justify-between w-full">
        <div className="flex flex-col justify-center h-2/3">
          <ul className="flex flex-col gap-4 justify-center p-[1rem]">
            {sidebarItems.map((link, key) => {
              if (!link) return null;
              const isActive = pathname === link.route;
              return (
                <li
                  key={key}
                  className={` ${
                    isActive
                      ? "border-b-yellow-400 border-b-4 bg-accent "
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  } rounded-sm `}
                >
                  <NavLink
                    to={link.route}
                    className={`flex gap-4 items-center py-3  ${
                      expand ? "justify-start px-4" : "justify-center"
                    }`}
                  >
                    <img src={link.imgUrl} className={`dark:invert size-4 `} />{" "}
                    <div
                      className={`ease-in-out transition-all delay-300 duration-300 ${
                        expand ? "block" : "hidden"
                      }`}
                    >
                      {link.label}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-full flex flex-col justify-end items-center gap-3 ">
          <Sheet>
            <SheetTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`flex gap-4 items-center py-4   ${
                        expand ? "justify-start px-4" : "justify-center"
                      }`}
                    >
                      <BugIcon theme={""} />
                      <span className={expand ? "block" : "hidden"}>
                        Bug Report
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Report a Bug</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle>Report a Bug!</SheetTitle>
                <BugReport />
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`flex gap-4 items-center ${
                    expand ? "justify-start px-4 " : "justify-center"
                  }`}
                >
                  <FormIcon theme={""} />
                  <span className={expand ? "block" : "hidden"}>
                    Feedback Form
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          {/* <ModeToggle expand={expand} /> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex gap-3 py-4 ">
                  <img
                    src="/assets/icons/logout.svg"
                    className="bg-white dark:bg-transparent dark:invert w-full size-5"
                    onClick={() => {
                      handleLogout();
                      setIsAuthenticated(false);
                      setUser(INITIAL_USER);
                      navigate("/signin");
                      toast.success("Logout Successfull!");
                    }}
                  />
                  <span className={expand ? "block" : "hidden"}>Logout</span>
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
