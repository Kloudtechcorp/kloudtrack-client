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
    throw new Error(data.message || "Error adding Station Type");
  }
  return data;
};

// * This handles creating a station for a new hardware to send off data
export const createStation = async (station: StationData) => {
  const response = await fetch(`${server}/admin/station`, {
    method: "POST",
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

// * Get the status of every sensors of every weather station
// ! THIS TAKES TOO SLOW TO LOAD (approx. 30 seconds)
// TODO: Find the cause of slow fetching (it might be the backend, so gawin mo to regee)
export const getWeatherSensors = async (
  page = 0,
  pageSize = 10
): Promise<{
  items: weatherSensorsType;
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> => {
  const response = await fetch(
    `${server}/admin/weather/sensors?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch sensor data in weather stations"
    );
  }

  return data;
};

// * Get the status of every sensors of every weather station
// TODO: UPDATE THIS CODE. (APPLY PAGINATION SAME WITH FOR WEATHER STATIONS)
export const getCoastalSensors = async (): Promise<coastalSensorsType> => {
  const response = await fetch(`${server}/admin/coastal/sensors`, {
    method: "GET",
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

// * Get the status of every sensors of every weather station
// TODO: UPDATE THIS CODE. (APPLY PAGINATION SAME WITH FOR WEATHER STATIONS)
export const getRainGaugeSensors = async (): Promise<rainGaugeSensorsType> => {
  const response = await fetch(`${server}/admin/raingauge/sensors`, {
    method: "GET",
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
      method: "GET",
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
    method: "GET",
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
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }
  return data.data;
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
