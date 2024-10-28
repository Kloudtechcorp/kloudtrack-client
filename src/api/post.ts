import {
  addPsgcType,
  addStationTypeType,
  createStationType,
  createUserData,
  signInAccountType,
} from "@/types/mutationTypes";
import {
  downloadableDataTypes,
  downloadParamsTypes,
  weatherDataTypes,
} from "@/types/queryTypes";

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
  const response = await fetch(`${server}/admin/add-psgc`, {
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
  const response = await fetch(`${server}/admin/add-station-type`, {
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
  const response = await fetch(`${server}/admin/add-station`, {
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

export const generateApi = async (): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/create-api-key`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to generate API key");
  }
  return data;
};

export const handleLogout = async () => {
  const response = await fetch(`${server}/user/logout`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout Failed");
  }
  return data;
};

export const downloadData = async ({
  name,
  from,
  to,
}: downloadParamsTypes): Promise<weatherDataTypes[]> => {
  const response = await fetch(`${server}/weather/get/data`, {
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
  console.log(data);
  return data;
};
