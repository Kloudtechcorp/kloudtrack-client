import {
  ActiveDevices,
  ApiKey,
  CoastalData,
  DownloadRequirements,
  RainGaugeData,
  ReportDetails,
  RiverLevelData,
  StationDetails,
  UserPasswordUpdate,
  UserProfile,
  WeatherData,
} from "@/types/user.type";

const server = import.meta.env.VITE_SERVER;

// ** POST REQUESTS
//* This handles generating api key for the user
export const generateApi = async (
  apiData: ApiKey
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/create-api-key`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to generate API key");
  }
  return data;
};

//* This will fetch the data from the requested station with custom parameters for weather stations
export const downloadWeatherData = async ({
  name,
  from,
  to,
  interval,
  parameter,
}: DownloadRequirements): Promise<WeatherData[]> => {
  const response = await fetch(`${server}/weather/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, from, to, interval, parameter }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};

//* This will fetch the data from the requested station for coastal stations
// TODO: UPDATE THIS CODE (AS WELL AS THE BACKEND) TO FUNCTION SAME WITH THE WEATHER DATA DOWNLOAD
export const downloadCoastalData = async ({
  name,
  from,
  to,
}: DownloadRequirements): Promise<CoastalData[]> => {
  const response = await fetch(`${server}/coastal/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, from, to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};
//* This will fetch the data from the requested station for river stations
// TODO: UPDATE THIS CODE (AS WELL AS THE BACKEND) TO FUNCTION SAME WITH THE WEATHER DATA DOWNLOAD
export const downloadRiverLevelData = async ({
  name,
  from,
  to,
}: DownloadRequirements): Promise<RiverLevelData[]> => {
  const response = await fetch(`${server}/riverlevel/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, from, to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};
//* This will fetch the data from the requested station for rain gauges
// TODO: UPDATE THIS CODE (AS WELL AS THE BACKEND) TO FUNCTION SAME WITH THE WEATHER DATA DOWNLOAD
export const downloadRainGaugeData = async ({
  name,
  from,
  to,
}: DownloadRequirements): Promise<RainGaugeData[]> => {
  const response = await fetch(`${server}/raingauge/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, from, to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};

// * This function will allow the user to send report
export const reportDetails = async ({
  title,
  description,
  metadata,
}: ReportDetails) => {
  const response = await fetch(`${server}/user/bug`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, metadata }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send bug report.");
  }
  return data;
};

// ** GET REQUESTS
export const getUserProfile = async (userId: number): Promise<UserProfile> => {
  const response = await fetch(`${server}/user/profile/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }
  return data.profile;
};
export const getStationData = async (
  stationId: string
): Promise<StationDetails> => {
  const response = await fetch(`${server}/user/stations/${stationId}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch station names");
  }
  return data.data;
};

export const getActiveDevices = async (): Promise<ActiveDevices> => {
  const response = await fetch(`${server}/user/auth/active-devices`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to detailed data of a station");
  }
  return data;
};

// ** UPDATE REQUESTS
export const updateApiKey = async (): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/update-api-key`, {
    method: "PUT",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to refresh API key");
  }
  return data;
};

export const updateUserPassword = async (passwords: UserPasswordUpdate) => {
  const response = await fetch(`${server}/user/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwords),
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data;
};

// ** DELETE REQUESTS
export const deleteApiKey = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/delete-api-key/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete API key");
  }
  return data;
};
