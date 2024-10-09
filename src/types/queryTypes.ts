export type stationNamesType = {
  id: number;
  typeName: string;
};

export type stationRegionType = {
  id: number;
  region: string;
};

export type stationProvinceType = {
  id: number;
  province: string;
  regionId: number;
};

export type stationMunicipalityType = {
  id: number;
  municipality: string;
  provinceId: number;
};

export type stationBarangayType = {
  psgc: string;
  barangay: string;
  municipalityId: number;
};

export type stationsListType = {
  stationName: string;
  latitude: string;
  longitude: string;
  stationType: {
    typeName: string;
  };
  region: {
    region: string;
  };
  province: {
    province: string;
  };
  municipality: {
    municipality: string;
  };
  barangay: {
    barangay: string;
    psgc: string;
  };
  serial: string;
  createdAt: string;
  currentweather: {
    recordedAt: string;
    T1: number;
    T2: number;
    T3: number;
    H1: number;
    H2: number;
    H3: number;
    P1: number;
    P2: number;
    P3: number;
    light: number;
    uvIntensity: number;
    windDirection: number;
    windSpeed: number;
    precipitation: number;
    gust: number;
  }[];
};

export type awsDashboardType = {
  currentweather: stationCurrentWeatherType;
};

export type argDashboardType = {
  raingaugedata: stationCurrentRainType;
};

export type rlmsDashboardType = {
  riverleveldata: stationCurrentRiverLevelType;
};

export type stationCurrentWeatherType = {
  recordedAt: string;
  temperature: number;
  humidity: number;
  pressure: number;
  heatIndex: number;
  light: number;
  uvIntensity: number;
  uvIndex: number;
  windDirection: number;
  windSpeed: number;
  precipitation: number;
  gust: number;
  batteryVoltage: number;
};

export type stationCurrentRainType = {
  recordedAt: string;
  precipitation: number;
};

export type stationCurrentRiverLevelType = {
  recordedAt: string;
  distance: number;
};

export type userProfileTypes = {
  username: string;
  createdAt: string;
  updatedAt: string;
  apiKeys: {
    apiKey: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type TableGraphCardType = {
  stationName: string;
  weatherData: string;
  range: number;
  repeat: "minute" | "hour" | "day" | "week" | "12-hours" | "48-hours";
};

export type stationComputedTypes = {
  info: {
    barangay: {
      barangay: string;
    };
    municipality: {
      municipality: string;
    };
    province: {
      province: string;
    };
    region: {
      region: string;
    };
    stationType: {
      typeName: string;
    };
    stationName: string;
    currentweather: { recordedAt: string; data: number }[];
    data: [number];
  };
  max: number;
  min: number;
  average: number;
  currentData: { current: number; past1min: number };
};

export type hourlyDataTypes = {
  hour: string;
  average: number;
  count: number;
};

export type downloadParamsTypes = {
  from: Date | undefined;
  to: Date | undefined;
  name: string;
};

export type weatherDataTypes = {
  recordedAt: string;
  temperature: number;
  humidity: number;
  pressure: number;
  heatIndex: number;
  light: number;
  uvIntensity: number;
  windDirection: number;
  windSpeed: number;
  precipitation: number;
  gust: number;
  uvIndex: number;
};

export type downloadableDataTypes = {
  weatherdata: weatherDataTypes[];
};
