export type PsgcData = {
  psgc: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
};

export type StationType = {
  typeName: string;
};

export type UserData = {
  username: string;
  role: string;
  password: string;
  grantedStations: string[];
};

export type UserDetails = {
  id: number;
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string | null;
  stations: string[];
};

export type ReportDetails = {
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

export type StationName = {
  id: number;
  typeName: string;
};

export type StationRegion = {
  id: number;
  region: string;
};

export type StationProvince = {
  id: number;
  province: string;
  regionId: number;
};

export type StationMunicipality = {
  id: number;
  municipality: string;
  provinceId: number;
};

export type StationBarangay = {
  psgc: string;
  barangay: string;
  municipalityId: number;
};

export type UserInformation = {
  grantedStations: string[];
  id: number;
  username?: string;
  password?: string;
};

export type ReportStatus = {
  id: number;
  status: string;
};
