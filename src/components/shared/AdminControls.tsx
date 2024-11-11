import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import EditIcon from "./EditIcon";
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
} from "../ui/alert-dialog";
import DeleteIcon from "./DeleteIcon";
import UpdateStation from "../forms/UpdateStation";

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

const AdminControls = ({ theme, station, id }: AdminControlsProps) => (
  <div className="lg:flex gap-2 justify-end items-end hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button className="button-icon">
          <EditIcon theme={theme} />
        </Button>
      </SheetTrigger>
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
        <Button className="button-icon">
          <DeleteIcon theme={theme} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            station.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

export default AdminControls;
