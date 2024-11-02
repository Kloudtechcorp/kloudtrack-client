import { Badge } from "@/components/ui/badge";

export const checkBME280 = (temp: number, humid: number, press: number) => {
  if (temp === null || !humid === null || !press === null) {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  } else if (temp === 0 || humid === 0 || press === 0) {
    return (
      <Badge className="text-xs w-full justify-center" variant="outline">
        No Value
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const checkBH1750 = (light: number) => {
  if (light === null) {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  } else if (light === 0) {
    return (
      <Badge className="text-xs w-full justify-center" variant="outline">
        No Value
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const checkAS5600 = (windDirection: number) => {
  if (windDirection === null) {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  } else if (windDirection === 0) {
    return (
      <Badge className="text-xs w-full justify-center" variant="outline">
        No Value
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const checkRTC = (recordedAt: string) => {
  if (recordedAt === "2000-01-01T10:10:10.000Z") {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const checkUV = (uv: number) => {
  if (uv === null) {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  } else if (uv === 0) {
    return (
      <Badge className="text-xs w-full justify-center" variant="outline">
        No Value
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const checkSlave = (windSpeed: number, rain: number, gust: number) => {
  if (windSpeed === null || !rain === null || !gust === null) {
    return (
      <Badge className="text-xs w-full justify-center" variant="destructive">
        Failed
      </Badge>
    );
  } else if (windSpeed === 0 || rain === 0 || gust === 0) {
    return (
      <Badge className="text-xs w-full justify-center" variant="outline">
        No Value
      </Badge>
    );
  }
  return (
    <Badge
      className="text-xs w-full justify-center bg-blue-500"
      variant="default"
    >
      Working
    </Badge>
  );
};

export const NO_VALUE_BADGE = (
  <Badge className="text-xs w-full justify-center" variant="secondary">
    No Value
  </Badge>
);
