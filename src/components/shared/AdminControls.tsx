import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import EditIcon from "./icons/EditIcon";
import UpdateStation from "../forms/UpdateStation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteIcon from "./icons/DeleteIcon";
import { useDeleteStation } from "@/hooks/react-query/mutations";
import { useUserContext } from "@/hooks/context/authContext";
import { useNavigate } from "react-router-dom";

type AdminControlsProps = {
  theme: string;
  station: {
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
  };
  id: number;
};

const AdminControls = ({ theme, station, id }: AdminControlsProps) => {
  const { mutateAsync: deleteStation } = useDeleteStation();

  return (
    <div className="lg:flex gap-2 justify-end items-end hidden">
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button className="button-icon" variant="ghost">
                  <EditIcon theme={theme} />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit station</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent className="min-w-[720px]">
          <UpdateStation
            id={id}
            name={station.name}
            latitude={station.latitude}
            longitude={station.longitude}
            image={station.image}
          />
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="button-icon" variant="ghost">
            <DeleteIcon theme={theme} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              statiob and remove and all of its gathered data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteStation(id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminControls;
