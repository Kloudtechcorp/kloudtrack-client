import { Card } from "@/components/ui/card";

const MapLegend = () => {
  return (
    <Card className="absolute bottom-10 right-5 z-50 px-3 py-2 w-36">
      <div className="flex flex-col gap-2 ">
        <span className="font-bold text-base">Map Legend</span>
        <div className="flex items-center gap-3">
          <span className="size-4 bg-blue-500 rounded-full "></span>
          <span className="text-sm">ARG</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-4 bg-yellow-500 rounded-full "></span>
          <span className="text-sm">AWS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-4 bg-green-500 rounded-full "></span>
          <span className="text-sm">CLMS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-4 bg-red-500 rounded-full "></span>
          <span className="text-sm">RLMS</span>
        </div>
      </div>
    </Card>
  );
};

export default MapLegend;
