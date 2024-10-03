import { type ClassValue, clsx } from "clsx";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(dateString: string) {
  const now = new Date(dateString);
  const utcPlus8Now = new Date(now.getTime() - 8 * 60 * 60 * 1000);

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

export const roundUpToNearest10Minutes = (date: Date): string => {
  const adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() - 8);

  const hours = adjustedDate.getHours();
  const minutes = adjustedDate.getMinutes();

  let roundedMinutes = Math.ceil(minutes / 10) * 10;

  if (roundedMinutes === 60) {
    roundedMinutes = 0;
    adjustedDate.setHours(hours + 1);
  }

  adjustedDate.setMinutes(roundedMinutes);
  adjustedDate.setSeconds(0);
  adjustedDate.setMilliseconds(0);

  const finalHours = adjustedDate.getHours().toString().padStart(2, "0");
  const finalMinutes = adjustedDate.getMinutes().toString().padStart(2, "0");

  return `${finalHours}${finalMinutes}`;
};

export const convertLocaltoUTC = (
  localHour: number,
  localMinute: number
): { hour: number; minute: number } => {
  const utcDate = new Date(Date.UTC(1970, 0, 1, localHour - 8, localMinute));
  return { hour: utcDate.getUTCHours(), minute: utcDate.getUTCMinutes() };
};

export const checkImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export function getFormattedDate(passedTime: string): string {
  const now = new Date();

  const roundDownToNearest10Minutes = (date: Date): Date => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.floor(minutes / 10) * 10;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(roundedMinutes);
    return roundedDate;
  };

  const roundedNow = roundDownToNearest10Minutes(now);

  const [passedHours, passedMinutes] = passedTime.split(":").map(Number);
  const passedDate = new Date(now);
  passedDate.setHours(passedHours);
  passedDate.setMinutes(passedMinutes);

  if (passedDate > roundedNow) {
    passedDate.setDate(passedDate.getDate() - 1);
  }

  const formattedDate = passedDate.toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}

export const convertUTCtoLocal = (
  utcHour: number,
  utcMinute: number
): { hour: number; minute: number } => {
  const localDate = new Date(Date.UTC(1970, 0, 1, utcHour, utcMinute));
  localDate.setHours(localDate.getHours() + 8); // Adjust for GMT+8
  return { hour: localDate.getUTCHours(), minute: localDate.getUTCMinutes() };
};

export const weatherUnit = (measurement: string): string | null => {
  const units: Record<string, string> = {
    temperature: "°C",
    heatIndex: "°C",
    humidity: "%",
    light: "lux",
    pressure: "mb",
    windSpeed: "kph",
    precipitation: "mm",
  };

  return units[measurement] || null;
};
