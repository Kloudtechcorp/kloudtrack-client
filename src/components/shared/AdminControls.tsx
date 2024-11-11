import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import EditIcon from "./EditIcon";
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
        <Button className="button-icon" variant="ghost">
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
  </div>
);

export default AdminControls;
