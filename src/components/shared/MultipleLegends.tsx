import React from "react";
import { Card } from "@/components/ui/card";

interface DangerLevel {
  color: string;
  label: string;
}

interface DangerLegendProps {
  title: string;
  levels: DangerLevel[];
}

const DangerLegend: React.FC<DangerLegendProps> = ({ title, levels }) => {
  return (
    <Card className="px-4 py-3 w-fit">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-base border-b pb-1 mb-1">{title}</h3>
        {levels.map((level, index) => (
          <div key={index} className="flex items-center gap-3">
            <span
              className="size-4 rounded-full"
              style={{ backgroundColor: level.color }}
            ></span>
            <span className="text-sm">{level.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const WeatherDangerLegends: React.FC = () => {
  const heatIndexLevels: DangerLevel[] = [
    { color: "#CC0001", label: "Extreme Danger (52°C & beyond)" },
    { color: "#FF6600", label: "Danger (42-51°C)" },
    { color: "#FFCC00", label: "Extreme Caution (33-41°C)" },
    { color: "#FFFF00", label: "Caution (27-32°C)" },
  ];

  const windSpeedLevels: DangerLevel[] = [
    { color: "#FE0000", label: "Typhoon-force winds (118KPH & above)" },
    { color: "#FFC000", label: "Storm-force winds (89-117KPH)" },
    { color: "#FFFF00", label: "Gale-force Winds (62-88KPH)" },
    { color: "#00CCFF", label: "Strong winds (39-61KPH)" },
  ];

  const uvIndexLevels: DangerLevel[] = [
    { color: "#9E47CC", label: "Extreme (11+)" },
    { color: "#F55023", label: "Very High (8-10)" },
    { color: "#FF9000", label: "High (6-7)" },
    { color: "#FFBC01", label: "Moderate (3-5)" },
  ];

  const rainfallLevels: DangerLevel[] = [
    { color: "#FF0000", label: "Torrential Rain (30mm/hour & above)" },
    { color: "#FFA500", label: "Intense Rain (15-30mm/hour)" },
    { color: "#FFFF00", label: "Heavy Rain (7.5mm/hour)" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-5 justify-center">
      <DangerLegend title="Heat Index Danger Level" levels={heatIndexLevels} />
      <DangerLegend title="Wind Speed Danger Level" levels={windSpeedLevels} />
      <DangerLegend title="UV Index Danger Level" levels={uvIndexLevels} />
      <DangerLegend title="Rainfall Danger Level" levels={rainfallLevels} />
    </div>
  );
};
