import {
  UpdateStationProps,
  updateStationType,
  updateUserPasswordType,
} from "@/types/mutationTypes";

const method: string = "PUT";
const server = import.meta.env.VITE_SERVER;

export const updateUserPassword = async (passwords: updateUserPasswordType) => {
  const response = await fetch(`${server}/user/update-password`, {
    method,
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

export const updateApiKey = async (): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/update-api-key`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to refresh API key");
  }
  return data;
};

export const updateStation = async (
  values: UpdateStationProps
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/station/${values.id}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stationName: values.name,
      latitude: values.latitude,
      longitude: values.longitude,
      imageLink: values.image,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update station details.");
  }
  return data;
};
