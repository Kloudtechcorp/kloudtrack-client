import React from "react";

type CompassProps = {
  direction: number;
};
const getWindDirectionLabel = (value: number) => {
  if (value === 0 || value === 360) {
    return "°N";
  } else if (value > 0 && value < 90) {
    return "°NE";
  } else if (value === 90) {
    return "°E";
  } else if (value > 90 && value < 180) {
    return "°SE";
  } else if (value === 180) {
    return "°S";
  } else if (value > 180 && value < 270) {
    return "°SW";
  } else if (value === 270) {
    return "°W";
  } else if (value > 270 && value < 360) {
    return "°NW";
  } else {
    return `${value}°`;
  }
};

const Compass = ({ direction }: CompassProps) => {
  const rotation = direction - 45; // Adjusting rotation to match initial orientation
  const label = getWindDirectionLabel(direction);

  return (
    <div className="h-full">
      <div className="flex items-center justify-center flex-col pb-0.5">
        <div className="relative flex items-center justify-center size-16 rounded-full border-2 border-black bg-slate-300 dark:border-slate-100">
          <div>
            <img
              src="/assets/img/arrow.svg"
              width={20}
              alt="Compass Arrow"
              style={{ transform: `rotate(${rotation}deg)` }}
              className="hidden md:block"
            />
          </div>
          <span className="absolute top-0 font-bold text-[0.7rem] dark:text-black">
            N
          </span>
          <span className="absolute right-[0.2rem] font-bold text-[0.7rem] dark:text-black">
            E
          </span>
          <span className="absolute bottom-0 font-bold text-[0.7rem] dark:text-black">
            S
          </span>
          <span className="absolute left-[0.2rem] font-bold text-[0.7rem] dark:text-black">
            W
          </span>
        </div>
      </div>
      <span className="text-base">
        {direction}
        {label}
      </span>
    </div>
  );
};

export default Compass;
