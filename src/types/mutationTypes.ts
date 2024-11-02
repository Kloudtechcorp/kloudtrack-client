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
  stationType: "AWS" | "TC" | "CLMS" | "RLMS" | "ARG";
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
};

//Update Data types
export type updateUserPasswordType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};
