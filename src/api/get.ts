import { stationStaticType, UserType } from "@/types";
import {
  stationBarangayType,
  stationDashboardType,
  stationsListType,
  stationMunicipalityType,
  stationNamesType,
  stationProvinceType,
  stationRegionType,
  userProfileTypes,
  TableGraphCardType,
  stationComputedTypes,
  hourlyDataTypes,
  downloadParamsTypes,
  downloadableDataTypes,
} from "@/types/queryTypes";

const method: string = "GET";
const server = import.meta.env.VITE_SERVER;

//=========================== GET DATA FOR DASHBOARD
export const getStationData = async (
  name: string
): Promise<stationDashboardType> => {
  const response = await fetch(`${server}/weather/station/${name}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  console.log(data);
  return data.data;
};

//=========================== GET DATA FOR STATIONS ALONG WITH ITS SENSORS
export const getStationList = async (): Promise<stationsListType[]> => {
  const response = await fetch(`${server}/admin/all/stations`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data.stations || [];
};

//=========================== GET DATA FOR STATION TYPES
export const getStationTypes = async (): Promise<stationNamesType[]> => {
  const response = await fetch(`${server}/admin/get-station-types`, {
    method,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.types || [];
};

//=========================== GET DATA FOR REGIONS
export const getStationRegions = async (): Promise<stationRegionType[]> => {
  const response = await fetch(`${server}/admin/get-region`, {
    method,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.region;
};

//=========================== GET DATA FOR PROVINCES
export const getStationProvinces = async (
  regionId: number
): Promise<stationProvinceType[]> => {
  const response = await fetch(`${server}/admin/get-province/${regionId}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.province;
};

//=========================== GET DATA FOR MUNICIPALITIES
export const getStationMunicipalities = async (
  provinceId: number
): Promise<stationMunicipalityType[]> => {
  const response = await fetch(
    `${server}/admin/get-municipality/${provinceId}`,
    {
      method,
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.municipality;
};

//=========================== GET DATA FOR BARANGAYS
export const getStationBarangays = async (
  municipalityId: number
): Promise<stationBarangayType[]> => {
  const response = await fetch(
    `${server}/admin/get-barangay/${municipalityId}`,
    {
      method,
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.barangay;
};

//=========================== GET DATA FOR USER PROFILE DATA
export const getUserProfile = async (): Promise<userProfileTypes> => {
  const response = await fetch(`${server}/user/get-profile`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }
  return data.userApi;
};

//=========================== GET DATA FOR USER SESSION
export const getUserSession = async (): Promise<UserType> => {
  const response = await fetch(`${server}/user/session`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user session");
  }
  return data.token;
};

//=========================== GET DATA FOR EACH STATION
export const getStationNames = async (): Promise<stationStaticType[]> => {
  const response = await fetch(`${server}/weather/station-names`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch station names");
  }
  return data.data;
};

//=========================== GET DATA FOR GRAHPHS
export const getTableGraphData = async ({
  stationName,
  weatherData,
  repeat,
  range,
}: TableGraphCardType): Promise<stationComputedTypes> => {
  const response = await fetch(
    `${server}/weather/analysis?variable=${weatherData}&range=${range}&name=${stationName}&repeat=${repeat}`,
    {
      method,
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch table data");
  }
  return data;
};

//=========================== GET DATA FOR HOURLY DATASET
export const getHourlyDataset = async ({
  stationName,
  weatherData,
  range,
  repeat,
}: TableGraphCardType): Promise<hourlyDataTypes[]> => {
  const response = await fetch(
    `${server}/weather/hourly-dataset/v2?variable=${weatherData}&range=${range}&name=${stationName}&repeat=${repeat}`,
    {
      method,
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch graph data");
  }
  return data;
};

//=========================== CHECK IF USER IS AUTHENTICATED
export const getIsAuthenticated = async (): Promise<boolean> => {
  const response = await fetch(`${server}/user/is-auth`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    return false;
  }
  return data;
};
