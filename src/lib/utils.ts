import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { timer } from "./objects/himawariArrays";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(
  dateString: string,
  month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
) {
  const now = new Date(dateString);
  const utcPlus8Now = new Date(now.getTime() - 8 * 60 * 60 * 1000);

  const options: Intl.DateTimeFormatOptions = {
    month: month,
    day: "numeric",
  };

  if (month !== "short") {
    options.year = "numeric";
  }
  const date = new Date(utcPlus8Now);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "numeric",
  });

  return `${formattedDate} at ${time}`;
}

export const getNearestTimeIndex = (hours: number, minutes: number): number => {
  const { hour: localHour, minute: localMinute } = convertLocaltoUTC(
    hours,
    minutes
  );
  const roundedMinutes = Math.floor(localMinute / 10) * 10;
  const formattedTime = `${localHour
    .toString()
    .padStart(2, "0")}${roundedMinutes.toString().padStart(2, "0")}`;
  return timer.indexOf(formattedTime);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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
    case "CLMS":
      return "Coastal Level Monitoring System";
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
    return `${Math.round(value * 100) / 100} °N`;
  } else if (value > 0 && value < 90) {
    return `${Math.round(value * 100) / 100} °NE`;
  } else if (value === 90) {
    return `${Math.round(value * 100) / 100} °E`;
  } else if (value > 90 && value < 180) {
    return `${Math.round(value * 100) / 100} °SE`;
  } else if (value === 180) {
    return `${Math.round(value * 100) / 100} °S`;
  } else if (value > 180 && value < 270) {
    return `${Math.round(value * 100) / 100} °SW`;
  } else if (value === 270) {
    return `${Math.round(value * 100) / 100} °W`;
  } else if (value > 270 && value < 360) {
    return `${Math.round(value * 100) / 100} °NW`;
  } else {
    return `N/A`;
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
    distance: "cm",
  };

  return units[measurement] || null;
};
export const getDateRange = (
  selected: string,
  now: Date
): DateRange | undefined => {
  // Create a copy of `now` to avoid mutation
  const today = new Date(now);

  switch (selected) {
    case "7days":
      return { from: subDays(today, 7), to: today };
    case "28days":
      return { from: subDays(today, 28), to: today };
    case "90days":
      return { from: subDays(today, 90), to: today };
    case "week":
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
      return { from: startOfWeek, to: today };
    case "month":
      return {
        from: new Date(today.getFullYear(), today.getMonth(), 1),
        to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      };
    case "year":
      return {
        from: new Date(today.getFullYear(), 0, 1),
        to: new Date(today.getFullYear(), 11, 31),
      };
    case "last-week":
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7); // Start of last week
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6); // End of last week
      return { from: lastWeekStart, to: lastWeekEnd };
    case "last-month":
      const lastMonth = today.getMonth() - 1;
      const lastMonthYear =
        lastMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
      const lastMonthStart = new Date(lastMonthYear, lastMonth, 1);
      const lastMonthEnd = new Date(lastMonthYear, lastMonth + 1, 0);
      return { from: lastMonthStart, to: lastMonthEnd };
    default:
      return undefined;
  }
};

export const checkPasswordStrength = (password: string) => {
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  return criteria;
};

export const checkStationType = (type: string): string => {
  if (type === "ARG") {
    return "Automated Rain Gauge";
  } else if (type === "RLMS") {
    return "River Level Monitoring System";
  } else if (type === "CLMS") {
    return "Coastal Livel Monitoring System";
  }
  return "Automated Weather Station";
};

export const checkRepeat = (repeat: string, range: number): number => {
  switch (repeat) {
    case "minute":
      return range * 60;
    case "halfhour":
      return range * 2;
    case "day":
      return range / 24;
    case "week":
      return range / 168;
    default:
      return range;
  }
};

export function addSpacesToPascalCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}
