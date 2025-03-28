import React, { useState, useRef } from "react";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-2 py-1 text-white text-sm bg-gray-800 rounded shadow-md transition-opacity duration-200 w-fit text-nowrap ${
            position === "top"
              ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2"
              : position === "bottom"
              ? "top-full left-1/2 transform -translate-x-1/2 mt-2"
              : position === "left"
              ? "right-full top-1/2 transform -translate-y-1/2 mr-2"
              : "left-full top-1/2 transform -translate-y-1/2 ml-2"
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
