import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Edit, Trash2 } from "lucide-react";
import { useDeleteStation } from "@/hooks/mutations/useStationMutations";
import { UpdateStation } from "../tabs/station-list/components";

type AdminControlsProps = {
  id: string;
};

const AdminControls = ({ id }: AdminControlsProps) => {
  const { mutateAsync: deleteStation } = useDeleteStation();

  return (
    <div className="lg:flex gap-2 justify-center items-center hidden">
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <SheetTitle>
                  <Button className="button-icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </SheetTitle>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit station</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent className="min-w-[720px]">
          <SheetDescription>
            Update an information for a station.
          </SheetDescription>
          <UpdateStation id={id} />
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="button-icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
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
