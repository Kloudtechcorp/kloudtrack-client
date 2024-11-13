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


  console.log( "color class is " , colorClass);
  const toasterDetailsView = (
    <div className="flex w-full h-full">
        <Button
          className="flex justify-end h-1/5 bg-transparent text-primary absolute top-0 right-0 hover:bg-slate-200 mb-4"
          onClick={() => {
            toast.dismiss(toastId);
          }}
        > 
          X
        </Button>
      <div className="flex w-4/5 flex-col">
        <span className={`flex self-start ${colorClass}`}>{title}</span>
        <span className="flex rounded self-start text-muted-foreground">{message}</span>
      </div>
  

        <div className="flex w-1/5">
          <Button
          className={`flex self-center bg-slate-200 text-primary border border-primary`}
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
        <span className="flex rounded self-start text-muted-foreground">{message}</span>
      </div>
  
        <div className="flex w-1/5  h-full item-center">
          <Button
          className={`flex self-center bg-slate-200 text-primary border border-primary`}
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
    console.log("toast id is", toastId);
  } else {
    toastId = toast(toasterDetailsView);
    console.log("toast id is", toastId);
  }
};
