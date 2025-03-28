export type ApiKey = {
  expiresAt: Date | null;
  title: string;
};

export type DownloadRequirements = {
  from: Date | undefined;
  to: Date | undefined;
  name: string;
  interval?: string;
  parameter?: string[];
};

export type WeatherData = {
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

export type CoastalData = {
  recordedAt: string;
  temperature: number;
  humidity: number;
  pressure: number;
  distance: number;
};

export type RiverLevelData = {
  recordedAt: string;
  distance: number;
};

export type RainGaugeData = {
  recordedAt: string;
  precipitation: number;
};

export type UserProfile = {
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

export type StationDetails = {
  name: string;
  type: string;
  barangay: string;
  municipality: string;
  province: string;
  latitude: number;
  longitude: number;
  id: string;
  image: string;
};

export type UserPasswordUpdate = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type ReportDetails = {
  title: string;
  description: string;
  metadata: string;
};

type Device = {
  deviceNumber: number;
  deviceName: string;
  location: string;
  os: string;
  expiresAt: string;
  sessionId: string;
};

export type ActiveDevices = {
  activeDevices: number;
  devices: Device[];
  maxDevices: number;
};
