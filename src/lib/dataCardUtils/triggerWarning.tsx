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
  let toastId: string;

  const toasterDetailsView = (
    <div className="flex bg-red-400 p-4 w-full">
      <div className="flex w-4/5 flex-col">
        <span className={`bg-blue-400 ${colorClass} p-2 rounded`}>{title}</span>
        <span className="bg-green-400 p-2 rounded">{message}</span>
      </div>
      <div className="flex flex-col w-1/5 bg-pink-200">
        <Button
          className="flex justify-end top-2 right-4 bg-emerald-500 h-1/5"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          X
        </Button>
        <Button
          className="flex top-2 right-4 bg-slate-500 h-4/5 align-middle"
          onClick={() => {
            toast.dismiss(toastId);
            navigate(`/${stationName}`);
          }}
        >
          View
        </Button>
      </div>
    </div>
  );

  const toasterDetailsNoView = (
    <div className="flex bg-red-400 p-4 w-full">
      <div className="flex w-4/5 flex-col">
        <span className={`bg-blue-400 ${colorClass} p-2 rounded`}>{title}</span>
        <span className="bg-green-400 p-2 rounded">{message}</span>
      </div>
      <div className="flex flex-col w-1/5 bg-pink-200">
        <Button
          className="flex justify-end top-2 right-4 bg-emerald-500 h-1/5"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        >
          X
        </Button>
      </div>
    </div>
  );

  if (dashboardType === "DATADASHBOARD") {
    toastId = toast(toasterDetailsNoView);
    console.log("toast id is", toastId);
  } else {
    toastId = toast(toasterDetailsView);
    console.log("toast id is", toastId);
  }
};
