import { useTheme } from "@/components/theme-provider";
import { Laptop, AlertCircle } from "lucide-react";

type DeviceCounterProps = {
  activeDevices: number;
  maxDevices: number;
};

const DeviceCounter = ({ activeDevices, maxDevices }: DeviceCounterProps) => {
  const percentage = (activeDevices / maxDevices) * 100;
  const { theme } = useTheme();

  // Determine color and message based on usage percentage
  const getStatusInfo = () => {
    if (percentage < 60) {
      return {
        barColor: "bg-green-500",
        textColor: "text-green-500",
        message: `${maxDevices - activeDevices} devices remaining`,
      };
    } else if (percentage < 80) {
      return {
        barColor: "bg-amber-500",
        textColor: "text-amber-500",
        message: `${maxDevices - activeDevices} devices remaining`,
      };
    } else {
      return {
        barColor: "bg-red-500",
        textColor: "text-red-500",
        message:
          maxDevices === activeDevices
            ? "Maximum devices reached"
            : `${maxDevices - activeDevices} devices remaining`,
      };
    }
  };

  const { barColor, textColor, message } = getStatusInfo();

  return (
    <div className="flex items-center gap-4 justify-center p-4 ">
      {/* Custom progress indicator */}
      <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
        <svg className="w-14 h-14" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={theme === "dark" ? "#545454" : "#e5e7eb"}
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${percentage} 100`}
            strokeLinecap="round"
            className={barColor}
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium dark:text-white">
          {activeDevices}/{maxDevices}
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          Device Usage
        </h3>
        <div className={`flex items-center gap-2 ${textColor}`}>
          {percentage >= 80 ? <AlertCircle size={16} /> : <Laptop size={16} />}
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCounter;
