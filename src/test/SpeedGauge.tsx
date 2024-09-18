import React from "react";
import GaugeChart from "react-gauge-chart";

type GaugeProps = {
  value: number;
};

const SpeedGauge = ({ value }: GaugeProps) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="size-[70%] ">
        <GaugeChart
          nrOfLevels={3}
          arcsLength={[0.25, 0.5, 0.25]}
          colors={["#FEEB94", "#FBD008", "#545454"]}
          arcPadding={0.02}
          percent={value / 600}
          textColor={"#000000"}
          needleColor={"#444444"}
          hideText={true}
        />
      </div>
      <span className="text-lg md:text-base">{value} kph</span>
    </div>
  );
};

export default SpeedGauge;
