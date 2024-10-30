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
  station: {
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
  };
  data: stationCurrentWeatherType;
};

export type argDashboardType = {
  station: {
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
  };
  data: stationCurrentRainType;
};

export type rlmsDashboardType = {
  station: {
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
  };
  data: stationCurrentRiverLevelType;
};

export type clmsDashboardType = {
  station: {
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
  };
  data: stationCurrentCoastalLevelType;
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
export type stationCurrentCoastalLevelType = {
  recordedAt: string;
  humidity: number;
  pressure: number;
  temperature: number;
  distance: number;
};

export type userProfileTypes = {
  createdAt: string;
  username: string;
  updatedAt: string | null;
  role: string;
  apiKeys: {
    createdAt: string;
    updatedAt: string | null;
    apiKey: string;
    expiresAt: string | null;
    isActive: boolean;
  }[];
};

export type TableGraphCardType = {
  graphType?: string;
  stationId: number;
  weatherData: string;
  range: number;
  repeat: "minute" | "halfhour" | "hour" | "day" | "week";
};

export type stationComputedTypes = {
  max: number;
  min: number;
  average: number;
  currentData: number;
  past1minute: number;
  recordedAt: string;
  station: {
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    barangay: string;
    municipality: string;
    province: string;
  };
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

export type coastalDataTypes = {
  recordedAt: string;
  temperature: number;
  humidity: number;
  pressure: number;
  distance: number;
};

export type riverLevelDataTypes = {
  recordedAt: string;
  distance: number;
};

export type rainGaugeDataTypes = {
  recordedAt: string;
  precipitation: number;
};

export type downloadableDataTypes = {
  weatherdata: weatherDataTypes[];
};

export type tablesType = {
  stationId: number;
  weatherData: string;
  range: number;
  repeat: "minute" | "halfhour" | "hour" | "day" | "week";
  type: string;
};
