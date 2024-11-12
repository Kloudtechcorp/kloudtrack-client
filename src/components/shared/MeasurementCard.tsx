import { Card, CardContent } from "../ui/card";

const MeasurementCard: React.FC<{
  label: string;
  value: number;
  unit: string;
}> = ({ label, value, unit }) => (
  <Card className="w-full h-full ">
    <CardContent className="px-0 p-0 h-full">
      <div className="text-center w-full flex flex-col h-full">
        <div className="w-full dark:bg-slate-800 py-1">
          <span className=" xl:text-xl lg:text-lg md:text-base sm:text-xs">
            {label}
          </span>
        </div>
        <div className="text-xl flex h-full items-center justify-center">
          <span className="xl:text-4xl lg:text-3xl md:text-xl sm:text-sm font-bold">
            {Math.round(value * 100) / 100} {unit}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MeasurementCard;
