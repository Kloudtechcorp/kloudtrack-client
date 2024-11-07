import { toast } from "sonner";

type WarningToastProps = {
  title: string;
  message: string;
  stationName: string;
  dashboardType: string;
  navigate: (path: string) => void;
};

export const triggerWarningToast = ({
  title,
  message,
  stationName,
  navigate,
  dashboardType,
}: WarningToastProps) => {
  if (dashboardType === "DATADASHBOARD") {
    toast(title, {
      description: message,
      action: {
        label: "Confirm",
        onClick: () => {
          console.log("sonner closed ", dashboardType);
        },
      },
    });
  } else {
    toast(title, {
      description: message,
      action: {
        label: "View",
        onClick: () => {
          console.log("sonner closed ", dashboardType);
          navigate(`/${stationName}`);
        },
      },
    });
  }
};
