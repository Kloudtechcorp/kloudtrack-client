const MeasurementCard2: React.FC<{
  label: string;
  value: number;
  unit: string;
}> = ({ label, value, unit }) => (
  <div className="w-full h-full  pb-4">
    <div className="text-center w-full flex flex-col h-full">
      <div className=" border-gray-200 w-full dark:bg-slate-800 py-1">
        <span className="xl:text-xl lg:text-lg md:text-base sm:text-xs">
          {label}
        </span>
      </div>
      <div className="text-xl flex h-full items-center justify-center">
        <span className="font-bold xl:text-4xl lg:text-3xl md:text-xl sm:text-sm">
          {Math.round(value * 100) / 100} {unit}
        </span>
      </div>
    </div>
  </div>
);

export default MeasurementCard2;
