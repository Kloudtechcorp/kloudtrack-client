import {
  coastalSensorsType,
  formattedDataType,
  rainGaugeSensorsType,
  reportedBugType,
  riverLevelSensorsType,
  stationStaticType,
  userListType,
  UserType,
  weatherSensorsType,
} from "@/types";
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
  detailedStationProps,
  analysisType,
  DynamicDatasetType,
  WeatherStationResponse,
} from "@/types/queryTypes";

const method: string = "GET";
const server = import.meta.env.VITE_SERVER;

//=========================== GET DATA FOR DASHBOARD
export const getAwsData = async (id: string): Promise<awsDashboardType> => {
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

export const getAwsData2 = async (id: string): Promise<awsDashboardType2> => {
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
export const getArgData = async (id: string): Promise<argDashboardType> => {
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
export const getRlmsData = async (id: string): Promise<rlmsDashboardType> => {
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
export const getClmsData = async (id: string): Promise<clmsDashboardType> => {
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
  return data.provinces;
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

  return data.municipalities;
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

  return data.barangays;
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
  stationId: string
): Promise<stationStaticType> => {
  const response = await fetch(`${server}/user/stations/${stationId}`, {
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
export const getAnalysis = async ({
  stationId,
  weatherData,
  type,
  repeat,
}: analysisType): Promise<WeatherStationResponse> => {
  const response = await fetch(
    `${server}/${type}/analysis/v2/${stationId}?variable=${weatherData}&repeat=${repeat}`,
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

//=========================== CHECK SENSORS
export const getWeatherSensors = async (): Promise<weatherSensorsType> => {
  const response = await fetch(`${server}/admin/weather/sensors`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch sensor data in weather stations"
    );
  }
  return data;
};

export const getCoastalSensors = async (): Promise<coastalSensorsType> => {
  const response = await fetch(`${server}/admin/coastal/sensors`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch sensor data in coastal stations"
    );
  }
  return data;
};

export const getRainGaugeSensors = async (): Promise<rainGaugeSensorsType> => {
  const response = await fetch(`${server}/admin/raingauge/sensors`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch sensor data in rain gauge stations"
    );
  }
  return data;
};

export const getRiverLevelSensors =
  async (): Promise<riverLevelSensorsType> => {
    const response = await fetch(`${server}/admin/riverlevel/sensors`, {
      method,
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch sensor data in river level stations"
      );
    }
    return data;
  };

export const getUserList = async (): Promise<userListType> => {
  const response = await fetch(`${server}/admin/all-users`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data;
};

export const getBugReports = async (): Promise<reportedBugType[]> => {
  const response = await fetch(`${server}/admin/reports`, {
    method,
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data.data;
};

//=========================== GET DATA station
export const getStationDetailed = async (
  id: string
): Promise<detailedStationProps[]> => {
  const response = await fetch(`${server}/admin/station/${id}`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to detailed data of a station");
  }
  return data;
};

export const stackedGraphDataset = async ({
  stationIds,
  weatherData,
  range,
  repeat,
  type,
}: DynamicDatasetType) => {
  const stationIdsQuery = stationIds
    .map((id) => `stationIds[]=${encodeURIComponent(id)}`)
    .join("&");

  const response = await fetch(
    `${server}/dataset/dynamic?variable=${encodeURIComponent(
      weatherData
    )}&type=${type}&range=${encodeURIComponent(
      range
    )}&repeat=${encodeURIComponent(repeat)}&${stationIdsQuery}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch graph data");
  }
  return data.transformedData;
};
