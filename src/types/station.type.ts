export type WeatherDashboard = {
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
  data: WeatherData;
  pastHourPrecip: number;
};

export type RainDashboard = {
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
  data: RainData;
};

export type RiverDashboard = {
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
  data: RiverData;
};

export type CoastalDashboard = {
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
  data: CoastalData;
};

export type WeatherData = {
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

export type RainData = {
  recordedAt: string;
  precipitation: number;
};

export type RiverData = {
  recordedAt: string;
  distance: number;
};
export type CoastalData = {
  recordedAt: string;
  humidity: number;
  pressure: number;
  temperature: number;
  distance: number;
};

export type StationData = {
  stationName: string;
  station: string;
  latitude: string;
  longitude: string;
  psgc: string;
  municipality: number;
  province: number;
  region: number;
  imageLink: string;
};

export type WeatherSensor = {
  id: string;
  name: string;
  serial: string;
  BME280a: string;
  BME280b: string;
  BME280c: string;
  BH1750: string;
  AS5600: string;
  UV: string;
  SLAVE: string;
  recordedAt: string;
};

export type CoastalSensor = {
  id: string;
  name: string;
  serial: string;
  sensorStatuses: {
    BME280: string;
    sonic1: string;
    sonic2: string;
    sonic3: string;
  };
  recordedAt: string;
};

export type RiverLevelSensor = {
  id: string;
  name: string;
  serial: string;
  message: string;
  sonic: string;
  recordedAt: string;
};

export type RainGaugeSensor = {
  id: string;
  name: string;
  serial: string;
  message: string;
  rainGauge: string;
  recordedAt: string;
};

export type StationDetails = {
  name: string;
  latitude: string;
  longitude: string;
  image: string;
  id: string;
  province: number;
  region: number;
  psgc: string;
  municipality: number;
};

export type AnalysisRequirements = {
  stationId: string;
  weatherData: string;
  type: string;
  repeat: string;
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

export type WeatherAnalysis = {
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

export type LinearGraph = {
  type: string;
  stationId: string;
  weatherData: string;
  range: number;
  repeat: string;
  showDots?: boolean;
};

export type FormattedData = {
  datetime: any;
  data: number;
};

export type StackedGraph = {
  type: string;
  stationIds: string[];
  weatherData: string;
  range: number;
  repeat: string;
  showDots?: boolean;
};

export type StationInformation = {
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
