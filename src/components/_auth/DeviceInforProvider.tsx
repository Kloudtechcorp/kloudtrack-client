import { useState, useEffect, ReactNode } from "react";

interface DeviceInfo {
  device: string;
  browser: string;
  os: string;
  location: string | null;
}

interface DeviceInfoProviderProps {
  children: (deviceInfo: DeviceInfo) => ReactNode;
}

export const DeviceInfoProvider = ({ children }: DeviceInfoProviderProps) => {
  const [locationData, setLocationData] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "https://ipinfo.io/json?token=d4f581d268b14e"
        );
        if (response.ok) {
          const data = await response.json();
          if (data.city && data.country) {
            setLocationData(
              `${data.city}, ${data.region} ${data.country} ${data.postal}, coordinates: ${data.loc}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  const getDeviceInfo = (): DeviceInfo => {
    const userAgent = window.navigator.userAgent;
    let deviceType = "Unknown";
    let browserName = "Unknown";
    let osName = "Unknown";

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      deviceType = /iPad/i.test(userAgent) ? "iPad" : "iPhone";
    } else if (/Android/i.test(userAgent)) {
      deviceType = /Tablet/i.test(userAgent)
        ? "Android Tablet"
        : "Android Phone";
    } else if (/Windows Phone/i.test(userAgent)) {
      deviceType = "Windows Phone";
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
      deviceType = "Mac";
    } else if (/Windows|Win32|Win64|Windows NT/i.test(userAgent)) {
      deviceType = "Windows PC";
    } else if (/Linux/i.test(userAgent)) {
      deviceType = "Linux";
    }

    if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) {
      browserName = "Chrome";
    } else if (/firefox/i.test(userAgent)) {
      browserName = "Firefox";
    } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
      browserName = "Safari";
    } else if (/edg/i.test(userAgent)) {
      browserName = "Edge";
    } else if (/opera|opr/i.test(userAgent)) {
      browserName = "Opera";
    } else if (/msie|trident/i.test(userAgent)) {
      browserName = "Internet Explorer";
    }

    if (/Windows NT 10.0/i.test(userAgent)) {
      osName = "Windows 10";
    } else if (/Windows NT 6.3/i.test(userAgent)) {
      osName = "Windows 8.1";
    } else if (/Windows NT 6.2/i.test(userAgent)) {
      osName = "Windows 8";
    } else if (/Windows NT 6.1/i.test(userAgent)) {
      osName = "Windows 7";
    } else if (/Mac OS X/i.test(userAgent)) {
      osName = "macOS";
    } else if (/Android/i.test(userAgent)) {
      osName = "Android";
    } else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) {
      osName = "iOS";
    } else if (/Linux/i.test(userAgent)) {
      osName = "Linux";
    }

    return {
      device: deviceType,
      browser: browserName,
      os: osName,
      location: locationData,
    };
  };

  return <>{children(getDeviceInfo())}</>;
};
