import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type WarningToastProps = {
  title: string;
  message: string;
  stationName: string;
  dashboardType: string;
  colorClass: string;
  navigate: (path: string) => void;
};

export const triggerWarningToast = ({
  title,
  message,
  stationName,
  colorClass,
  navigate,
  dashboardType,
}: WarningToastProps) => {
  let toastId: string | number;

  const toasterDetailsView = (
    <div className="flex w-full h-full">
      <Button
        className="flex justify-end h-1/5 absolute top-1 right-1"
        variant="ghost"
        onClick={() => {
          toast.dismiss(toastId);
        }}
      >
        X
      </Button>
      <div className="flex w-4/5 flex-col ">
        <span className={`flex self-start ${colorClass}`}>{title}</span>
        <span className="flex rounded self-start text-muted-foreground">
          {message}
        </span>
      </div>

      <div className="triggerButtonDiv">
        <Button
          className={`flex self-center`}
          variant="default"
          onClick={() => {
            toast.dismiss();
            navigate(`/${stationName}`);
          }}
        >
          View
        </Button>
      </div>
    </div>
  );

  const toasterDetailsNoView = (
    <div className="flex w-full h-full">
      <div className="flex w-4/5 flex-col">
        <span className={`flex self-start ${colorClass}`}>{title}</span>
        <span className="flex rounded self-start text-muted-foreground">
          {message}
        </span>
      </div>

      <div className="triggerButtonDiv ">
        <Button
          className={`flex self-center`}
          variant="default"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );

  if (dashboardType === "DATADASHBOARD") {
    toastId = toast(toasterDetailsNoView);
  } else {
    toastId = toast(toasterDetailsView);
  }
};
