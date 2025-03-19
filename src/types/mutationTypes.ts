export type addPsgcType = {
  psgc: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
};

export type signInAccountType = { username: string; password: string };

export type addStationTypeType = {
  typeName: "AWS" | "TC" | "CLMS" | "RLMS" | "ARG";
};

export type createStationType = {
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

export type createUserData = {
  username: string;
  role: string;
  password: string;
  grantedStations: string[];
};

//Update Data types
export type updateUserPasswordType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export type updateStationType = {
  stationName: string;
  latitude: string;
  longitude: string;
  imageLink: string;
};

export type UpdateStationProps = {
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

export type updateUserType = {
  grantedStations: string[];
  id: number;
  username?: string;
  password?: string;
};

export type reportBugType = {
  title: string;
  description: string;
  metadata: string;
};
