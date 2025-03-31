import {
  PsgcData,
  ReportDetails,
  ReportStatus,
  StationBarangay,
  StationMunicipality,
  StationName,
  StationProvince,
  StationRegion,
  StationType,
  UserData,
  UserDetails,
  UserInformation,
} from "@/types/admin.type";

const server = import.meta.env.VITE_SERVER;

// ** POST REQUESTS **
//* This handles adding psgc for station location
export const addPsgc = async (values: PsgcData) => {
  const response = await fetch(`${server}/admin/psgc`, {
    method: "POST",
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

//* This handles adding an station type (e.g automated weather station)
// TODO: adding station parameters (e.g. temperature, humidity, etc.) based on the station type created
export const addStationType = async (values: StationType) => {
  const response = await fetch(`${server}/admin/station-type`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error adding Station ");
  }
  return data;
};

// * This handles creating a new user, only admin can create a new user
// Admins are also able to create new admins and designate a station
export const createUser = async (userData: UserData) => {
  const response = await fetch(`${server}/admin/signup`, {
    method: "POST",
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

// ** GET RQUESTS

// * Get the list of users
export const getUserList = async (): Promise<UserDetails[]> => {
  const response = await fetch(`${server}/admin/all-users`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data;
};

// * Get the list of reports
export const getReports = async (): Promise<ReportDetails[]> => {
  const response = await fetch(`${server}/admin/reports`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data.data;
};

// * Fetch the station types
export const getStations = async (): Promise<StationName[]> => {
  const response = await fetch(`${server}/admin/station-types`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.types || [];
};

// ** This functions will fetch the psgc information
// * This will fetch the regions
export const getStationRegions = async (): Promise<StationRegion[]> => {
  const response = await fetch(`${server}/admin/regions`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.regions;
};

// * This will fetch the provinces
export const getStationProvinces = async (
  regionId: number
): Promise<StationProvince[]> => {
  const response = await fetch(`${server}/admin/provinces/${regionId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.provinces;
};

// * This will fetch the municipalities
export const getStationMunicipalities = async (
  provinceId: number
): Promise<StationMunicipality[]> => {
  const response = await fetch(`${server}/admin/municipalities/${provinceId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.municipalities;
};

// * This will fetch the barangays
export const getStationBarangays = async (
  municipalityId: number
): Promise<StationBarangay[]> => {
  const response = await fetch(`${server}/admin/barangays/${municipalityId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return data.barangays;
};

// ** UPDATE REQUESTS

// * This function will update the user information
export const updateUser = async (
  values: UserInformation
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/user/update/${values.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grantedStations: values.grantedStations,
      ...(values.password && { password: values.password }),
      ...(values.username && { username: values.username }),
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update station details.");
  }
  return data;
};

// * This function will update the status of a reported issue
export const updateReportStatus = async (
  values: ReportStatus
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/reports`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: values.id,
      status: values.status,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update bug report.");
  }
  return data;
};

// ** DELETE REQUESTS
//* This handles deleting an station
//* Adding it here because it is a function only admin can do
export const deleteStation = async (
  id: string
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/station/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete station!");
  }
  return data;
};

//* This handles deleting an user
export const deleteUser = async (id: number): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/user/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user!");
  }
  return data;
};
