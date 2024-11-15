export type HeaderProps = {
  burgerMenu: (data: boolean) => void;
};

export type SidebarProps = {
  expand: boolean;
};

export type ModeToggleProps = {
  expand: boolean;
};

export type WeatherDataProps = {
  stationId: number;
  name: string;
  type: string;
  location: string;
  coordinates: [number, number];
  imgStation: string;
  temperature: number;
  heatIndex: number;
  humidity: number;
  precipitation: number;
  gust: number;
  airPressure: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  irradiance: number;
  lux: number;
  batteryLevel: number;
  status: string;
};

export type dataProps = {
  esp32_id: string;
  id: string;
  loc: string;
  key: [number, number];
  serial: string;
  rainfall: number | null;
  airPressure: number | null;
  windSpeed: number | null;
  windDirection: number | null;
  uvIndex: number | null;
  uvIntensity: number | null;
  irradiance: number | null;
  light: number | null;
  H1: number | null;
  H2: number | null;
  P1: number | null;
  P2: number | null;
  T1: number | null;
  T2: number | null;
  recordedAt: string;
};
export type apiKeyType = {
  expiresAt: Date | null;
  title: string;
};

export type UserType = {
  id: number;
  username: string;
  role: string;
  stations:
    | {
        id: number;
        type: string;
        name: string;
      }[]
    | [];
};

export type UserCreate = {
  id: number | null;
  username: string;
  password: string;
  role: string;
};

export interface Region {
  name: string;
  designation: string;
}

export interface Province {
  name: string;
  region: string;
}

export interface Municipality {
  name: string;
  province: string;
}

export interface Barangay {
  name: string;
  citymun: string;
  code: number;
}

export interface MappedRegion extends Region {
  provinces: Array<Province>;
}

export interface MappedProvince extends Province {
  municipalities: Array<Municipality>;
}

export interface MappedMunicipality extends Municipality {
  barangays: Array<Barangay>;
}
export type testProps = {
  title: string;
  value: string;
  value2: number;
};

export type stationSchemaType = {
  id: number;
  typeName: string;
};

export type regionSchemaType = {
  id: number;
  region: string;
};

export type provinceSchemaType = {
  id: number;
  province: string;
  regionId: number;
};

export type municipalitySchemaType = {
  id: number;
  municipality: string;
  provinceId: number;
};

export type barangaySchemaType = {
  psgc: string;
  barangay: string;
  municipalityId: number;
};

export type stationsListType = {
  stationName: string;
  latitude: string;
  longitude: string;
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

export type stationDashboardType = {
  heatIndex: string | undefined;
  imageLink: string;
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
  currentweather: {
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
    batteryVoltage: number;
  }[];
};

export type profileType = {
  username: string;
  createdAt: string;
  updatedAt: string;
  apiKeys: {
    apiKey: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type stationStaticType = {
  name: string;
  type: string;
  barangay: string;
  municipality: string;
  province: string;
  latitude: number;
  longitude: number;
  id: number;
  image: string;
};

export type formattedDataType = {
  datetime: any;
  data: number;
};

export type weatherSensorsType = {
  id: number;
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
}[];

export type coastalSensorsType = {
  id: number;
  name: string;
  serial: string;
  sensorStatuses: {
    BME280: string;
    sonic1: string;
    sonic2: string;
    sonic3: string;
  };
  recordedAt: string;
}[];

export type riverLevelSensorsType = {
  id: number;
  name: string;
  serial: string;
  message: string;
  sonic: string;
  recordedAt: string;
}[];

export type rainGaugeSensorsType = {
  id: number;
  name: string;
  serial: string;
  message: string;
  rainGauge: string;
  recordedAt: string;
}[];

export type userListType = {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string | null;
  stations: number[];
}[];
