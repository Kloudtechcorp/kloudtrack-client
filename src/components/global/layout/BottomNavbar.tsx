import { NavLink, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserContext } from "@/hooks/custom-hooks/authContext";

const BottomNavbar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const navbarItems = [
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

  return (
    <nav className="fixed bottom-0 w-full bg-white dark:bg-[#181819] flex justify-around items-center py-2 shadow-md z-[99]">
      {navbarItems.map((item) => {
        if (!item) return null;
        const isActive = pathname === item.route;
        return (
          <TooltipProvider key={item.route}>
            <Tooltip>
              <TooltipTrigger>
                <NavLink
                  to={item.route}
                  className={`flex flex-col items-center ${
                    isActive
                      ? "text-yellow-400"
                      : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <img
                    src={item.imgUrl}
                    alt={item.label}
                    className="w-6 h-6 dark:invert"
                  />
                  <span className="text-xs">{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              {/* <TooltipContent>{item.tooltip}</TooltipContent> */}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </nav>
  );
};

export default BottomNavbar;
