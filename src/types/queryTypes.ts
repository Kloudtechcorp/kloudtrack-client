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
    id: string;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
  };
  data: stationCurrentWeatherType;
};

export type awsDashboardType2 = {
  station: {
    id: string;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
  };
  data: stationCurrentWeatherType;
  pastHourPrecip: number;
};

export type argDashboardType = {
  station: {
    id: string;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
  };
  data: stationCurrentRainType;
};

export type rlmsDashboardType = {
  station: {
    id: string;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
  };
  data: stationCurrentRiverLevelType;
};

export type clmsDashboardType = {
  station: {
    id: string;
    name: string;
    type: string;
    latitude: string;
    longitude: string;
    barangay: string;
    municipality: string;
    province: string;
    image: string;
    region: string;
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
  pastHourPrecip: number;
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
    title: string;
    id: number;
  }[];
};

export type TableGraphCardType = {
  type: string;
  stationId: string;
  weatherData: string;
  range: number;
  repeat: string;
  showDots?: boolean;
};

export type DynamicDatasetType = {
  type: string;
  stationIds: string[];
  weatherData: string;
  range: number;
  repeat: string;
  showDots?: boolean;
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
  interval: string;
  parameter: string[];
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
  stationId: string;
  weatherData: string;
  range: number;
  repeat: string;
  type: string;
};

export type analysisType = {
  stationId: string;
  weatherData: string;
  type: string;
  repeat: string;
};

export type detailedStationProps = {
  id: number;
  typeId: number;
  stationName: string;
  psgc: string;
  latitude: number;
  longitude: number;
  municipalityId: number;
  provinceId: number;
  regionId: number;
  serial: string;
  imageLink: string | null;
  createdAt: Date;
};
type Station = {
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  barangay: string;
  municipality: string;
  province: string;
};

export type WeatherStationResponse = {
  average: string;
  currentData: number;
  max: string;
  maxTime: string;
  min: string;
  minTime: string;
  past1minute: number;
  recordedAt: string;
  station: Station;
};

type Device = {
  deviceNumber: number;
  deviceName: string;
  location: string;
  os: string;
  expiresAt: string; // ISO date string
  sessionId: string;
};

export type ActiveDevicesResponse = {
  activeDevices: number;
  devices: Device[];
  maxDevices: number;
};
