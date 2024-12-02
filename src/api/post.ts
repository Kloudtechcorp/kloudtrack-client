import { apiKeyType } from "@/types";
import {
  addPsgcType,
  addStationTypeType,
  createStationType,
  createUserData,
  reportBugType,
  signInAccountType,
} from "@/types/mutationTypes";
import {
  coastalDataTypes,
  downloadParamsTypes,
  rainGaugeDataTypes,
  riverLevelDataTypes,
  weatherDataSensors,
  weatherDataTypes,
} from "@/types/queryTypes";
import { bugSchema } from "@/types/validation";
import { z } from "zod";

const method: string = "POST";
const server = import.meta.env.VITE_SERVER;

export const signInAccount = async (user: signInAccountType) => {
  const response = await fetch(`${server}/user/auth/signin`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching station data");
  }

  return response.json();
};

export const addPsgc = async (values: addPsgcType) => {
  const response = await fetch(`${server}/admin/psgc`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error adding PSGC");
  }
  return response.json();
};

export const addStationType = async (values: addStationTypeType) => {
  const response = await fetch(`${server}/admin/station-type`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error adding Station Type");
  }
  return data;
};

export const createStation = async (station: createStationType) => {
  const response = await fetch(`${server}/admin/station`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data;
};

export const createUser = async (userData: createUserData) => {
  const response = await fetch(`${server}/admin/signup`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create user");
  }
  return data;
};

export const generateApi = async (
  apiData: apiKeyType
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/create-api-key`, {
    method,
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

export const handleLogout = async () => {
  const response = await fetch(`${server}/user/auth/logout`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout Failed");
  }
  return data;
};

export const downloadWeatherData = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<weatherDataTypes[]> => {
  const response = await fetch(`${server}/weather/download`, {
    method,
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

export const downloadWeatherDataSensors = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<weatherDataSensors[]> => {
  const response = await fetch(`${server}/weather/download/sensorsRawData`, {
    method,
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

export const downloadCoastalData = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<coastalDataTypes[]> => {
  const response = await fetch(`${server}/coastal/download`, {
    method,
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

export const downloadRiverLevelData = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<riverLevelDataTypes[]> => {
  const response = await fetch(`${server}/riverlevel/download`, {
    method,
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

export const downloadRainGaugeData = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<rainGaugeDataTypes[]> => {
  const response = await fetch(`${server}/raingauge/download`, {
    method,
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

export const reportBug = async ({
  title,
  description,
  metadata,
}: reportBugType): Promise<rainGaugeDataTypes[]> => {
  const response = await fetch(`${server}/user/bug`, {
    method,
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
