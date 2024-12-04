import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type WarningToastProps = {
  title: string;
  message: string;
  id: string;
  dashboardType: string;
  colorClass: string;
  navigate: (path: string) => void;
};

export const triggerWarningToast = ({
  title,
  message,
  id,
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
        <X />
      </Button>
      <div className="flex w-4/5 flex-col ">
        <span className={`flex self-start ${colorClass}`}>{title}</span>
        <span className="flex rounded self-start text-muted-foreground">
          {message}
        </span>
      </div>

      <div className="triggerButtonDiv">
        <Button
          className={`flex self-center text-black dark:text-white bg-inherit hover:bg-gray-200 border border-transparent hover:border-gray-700 dark:hover:border-gray-200 dark:hover:bg-gray-700 transition-all ease-in-out duration-300`}
          variant="default"
          onClick={() => {
            toast.dismiss();
            navigate(`/${id}`);
          }}
        >
          View
        </Button>
      </div>
    </div>
  );

  const toasterDetailsNoView = (
    <div className="flex w-full h-full">
      <div className="flex w-full flex-col">
        <span className={`flex self-start ${colorClass}`}>{title}</span>
        <span className="flex rounded self-start text-muted-foreground">
          {message}
        </span>
      </div>

      <div className="w-20 flex items-center justify-end  ">
        <Button
          className={`flex self-center bg-inherit hover:bg-gray-200 border border-transparent hover:border-gray-700 dark:hover:border-gray-200 dark:hover:bg-gray-700 transition-all ease-in-out duration-300`}
          variant="default"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          <X className="invert" />
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
