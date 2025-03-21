type PsgcData = {
  psgc: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
};

type StationType = {
  typeName: string;
};

type StationData = {
  stationName: string;
  stationType: string;
  latitude: string;
  longitude: string;
  psgc: string;
  municipality: number;
  province: number;
  region: number;
  imageLink: string;
};

type UserData = {
  username: string;
  role: string;
  password: string;
  grantedStations: string[];
};

type weatherSensorsType = {
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
}[];

type coastalSensorsType = {
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
}[];

type riverLevelSensorsType = {
  id: string;
  name: string;
  serial: string;
  message: string;
  sonic: string;
  recordedAt: string;
}[];

type rainGaugeSensorsType = {
  id: string;
  name: string;
  serial: string;
  message: string;
  rainGauge: string;
  recordedAt: string;
}[];

type userListType = {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string | null;
  stations: string[];
}[];

type reportedBugType = {
  id: number;
  user: {
    id: number;
    username: string;
  } | null;
  createdAt: string;
  title: string;
  description: string;
  metadata: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
};
