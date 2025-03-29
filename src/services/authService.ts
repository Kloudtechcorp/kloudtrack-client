import { SignIn, UserDetails } from "@/types/auth.type";

const server = import.meta.env.VITE_SERVER;

// ** GET REQUESTS
export const getUserSession = async (): Promise<UserDetails> => {
  const response = await fetch(`${server}/user/auth/account`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user session");
  }
  return data.profile;
};

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

// ** POST REQUESTS
export const signInAccount = async (user: SignIn) => {
  const response = await fetch(`${server}/user/auth/signin`, {
    method: "GET",
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
export const handleLogout = async () => {
  const response = await fetch(`${server}/user/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout Failed");
  }
  return data;
};
