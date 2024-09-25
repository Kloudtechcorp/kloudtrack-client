import { type ClassValue, clsx } from "clsx";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(dateString: string) {
  const now = new Date(dateString);
  const utcPlus8Now = new Date(
    now.getTime() - 16 * 60 * 60 * 1000 + 10 * 60 * 1000
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(utcPlus8Now);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "numeric",
  });

  return `${formattedDate} at ${time}`;
}

export const stationType = (type: string) => {
  switch (type) {
    case "TC":
      return "Tomato Company";
    case "AWS":
      return "Automated Weather Station";
    case "RLMS":
      return "River Level Monitoring System";
    case "ARG":
      return "Automated Rain Gauge";
    default:
      return "Not Defined";
  }
};

export const returnActive = (active: boolean) => {
  if (!active) {
    return "Inactive";
  }
  return "Active";
};

export const getWindDirectionLabel = (value: number) => {
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

export const batteryPercentage = (battery: number) => {
  const batteryPercent = (battery - 6) / 6.6;
  if (batteryPercent < 6) {
    return 0;
  }
  return batteryPercent;
};

export const getBatteryImg = (level: number) => {
  if (level == 100) {
    return "/assets/img/batteryFull.svg";
  } else if (level >= 80) {
    return "/assets/img/battery6Bar.svg";
  } else if (level >= 50) {
    return "/assets/img/battery5Bar.svg";
  } else if (level >= 30) {
    return "/assets/img/battery4Bar.svg";
  } else if (level > 0) {
    return "/assets/img/battery2Bar.svg";
  } else if (level == 0) {
    return "/assets/img/battery0Bar.svg";
  } else {
    return "/assets/img/battery2Bar.svg";
  }
};
