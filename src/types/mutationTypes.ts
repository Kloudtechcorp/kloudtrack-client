export type addPsgcType = {
  psgc: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
};

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

//Update Data types
