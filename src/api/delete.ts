const method: string = "DELETE";
const server = import.meta.env.VITE_SERVER;

export const deleteApiKey = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/delete-api-key/${id}`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete API key");
  }
  return data;
};

export const deleteStation = async (
  id: number
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/station/delete/${id}`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete station!");
  }
  return data;
};
