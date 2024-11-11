import { formattedDataType, stationStaticType, UserType } from "@/types";
import {
  stationBarangayType,
  stationsListType,
  stationMunicipalityType,
  stationNamesType,
  stationProvinceType,
  stationRegionType,
  userProfileTypes,
  TableGraphCardType,
  stationComputedTypes,
  hourlyDataTypes,
  awsDashboardType,
  awsDashboardType2,
  argDashboardType,
  rlmsDashboardType,
  clmsDashboardType,
  tablesType,
} from "@/types/queryTypes";

const method: string = "GET";
const server = import.meta.env.VITE_SERVER;

//=========================== GET DATA FOR DASHBOARD
export const getAwsData = async (id: number): Promise<awsDashboardType> => {
  const response = await fetch(`${server}/weather/station/${id}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

export const getAwsData2 = async (id: number): Promise<awsDashboardType2> => {
  const response = await fetch(`${server}/weather/v2/station/${id}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getArgData = async (id: number): Promise<argDashboardType> => {
  const response = await fetch(`${server}/raingauge/station/${id}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getRlmsData = async (id: number): Promise<rlmsDashboardType> => {
  const response = await fetch(`${server}/riverlevel/station/${id}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getClmsData = async (id: number): Promise<clmsDashboardType> => {
  const response = await fetch(`${server}/coastal/station/${id}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
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
  console.log(data);
  return data.stations || [];
};

//=========================== GET DATA FOR STATION TYPES
export const getStationTypes = async (): Promise<stationNamesType[]> => {
  const response = await fetch(`${server}/admin/station-types`, {
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
  const response = await fetch(`${server}/admin/regions`, {
    method,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.regions;
};

//=========================== GET DATA FOR PROVINCES
export const getStationProvinces = async (
  regionId: number
): Promise<stationProvinceType[]> => {
  const response = await fetch(`${server}/admin/provinces/${regionId}`, {
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
  const response = await fetch(`${server}/admin/municipalities/${provinceId}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.municipality;
};

//=========================== GET DATA FOR BARANGAYS
export const getStationBarangays = async (
  municipalityId: number
): Promise<stationBarangayType[]> => {
  const response = await fetch(`${server}/admin/barangays/${municipalityId}`, {
    method,
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.barangay;
};

//=========================== GET DATA FOR USER PROFILE DATA
export const getUserProfile = async (
  userId: number
): Promise<userProfileTypes> => {
  const response = await fetch(`${server}/user/profile/${userId}`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }
  console.log(data.profile);
  return data.profile;
};

//=========================== GET DATA FOR USER SESSION
export const getUserSession = async (): Promise<UserType> => {
  const response = await fetch(`${server}/user/auth/account`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user session");
  }
  return data.profile;
};

//=========================== GET DATA FOR EACH STATION
export const getStationData = async (
  stationName: string
): Promise<stationStaticType> => {
  const response = await fetch(`${server}/user/stations/${stationName}`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch station names");
  }
  return data.data;
};

//=========================== GET AWS DATA FOR GRAHPHS
export const getTableGraph = async ({
  stationId,
  weatherData,
  repeat,
  range,
  type,
}: tablesType): Promise<stationComputedTypes> => {
  const response = await fetch(
    `${server}/${type}/analysis/${stationId}?variable=${weatherData}&range=${range}&repeat=${repeat}`,
    {
      method,
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch table data");
  }
  console.log(data);
  return data;
};

//=========================== GET DATA FOR HOURLY DATASET
export const getDataset = async ({
  stationId,
  weatherData,
  range,
  repeat,
}: TableGraphCardType): Promise<formattedDataType[]> => {
  const response = await fetch(
    `${server}/dataset/dynamic/${stationId}?variable=${weatherData}&range=${range}&repeat=${repeat}`,
    {
      method,
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch graph data");
  }
  return data.data;
};

//=========================== CHECK IF USER IS AUTHENTICATED
export const getIsAuthenticated = async (): Promise<{
  isAuthenticated: boolean;
}> => {
  const response = await fetch(`${server}/user/auth/session`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return data;
};
