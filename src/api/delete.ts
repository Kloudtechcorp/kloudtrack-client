const method: string = "DELETE";
const server = import.meta.env.VITE_SERVER;

export const deleteApiKey = async (): Promise<{ message: string }> => {
  const response = await fetch(`${server}/user/delete-api-key`, {
    method,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete API key");
  }
  return data;
};
