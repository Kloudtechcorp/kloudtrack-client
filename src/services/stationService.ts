import {
  AnalysisRequirements,
  CoastalDashboard,
  CoastalSensor,
  FormattedData,
  RainDashboard,
  RainGaugeSensor,
  RiverDashboard,
  RiverLevelSensor,
  StationData,
  StationDetails,
  StationInformation,
  LinearGraph,
  StackedGraph,
  WeatherAnalysis,
  WeatherDashboard,
  WeatherSensor,
} from "@/types/station.type";

const server = import.meta.env.VITE_SERVER;

// ** GET REQUESTS

// * Get the status of every sensors of every weather station
// ! THIS TAKES TOO SLOW TO FETCH (approx. 30 seconds)
// TODO: Find the cause of slow fetching (it might be the backend, so gawin mo to regee)
export const getWeatherSensors = async (
  page = 0,
  pageSize = 10
): Promise<{
  items: WeatherSensor[];
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
export const getCoastalSensors = async (): Promise<CoastalSensor[]> => {
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

// * Get the status of every sensors of every automatic rain gauges
// TODO: UPDATE THIS CODE. (APPLY PAGINATION SAME WITH FOR WEATHER STATIONS)
export const getRainGaugeSensors = async (): Promise<RainGaugeSensor[]> => {
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

// * Get the status of every sensors of every automatic river level
// TODO: UPDATE THIS CODE. (APPLY PAGINATION SAME WITH FOR WEATHER STATIONS)
export const getRiverLevelSensors = async (): Promise<RiverLevelSensor[]> => {
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
export const getWeatherData = async (id: string): Promise<WeatherDashboard> => {
  const response = await fetch(`${server}/weather/v2/station/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getRainData = async (id: string): Promise<RainDashboard> => {
  const response = await fetch(`${server}/raingauge/station/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getRiverData = async (id: string): Promise<RiverDashboard> => {
  const response = await fetch(`${server}/riverlevel/station/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

//=========================== GET DATA FOR DASHBOARD
export const getCoastalData = async (id: string): Promise<CoastalDashboard> => {
  const response = await fetch(`${server}/coastal/station/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching station data");
  }
  const data = await response.json();
  return data;
};

export const getAnalysis = async ({
  stationId,
  weatherData,
  type,
  repeat,
}: AnalysisRequirements): Promise<WeatherAnalysis> => {
  const response = await fetch(
    `${server}/${type}/analysis/v2/${stationId}?variable=${weatherData}&repeat=${repeat}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch table data");
  }
  return data;
};

export const getDataset = async ({
  stationId,
  weatherData,
  range,
  repeat,
}: LinearGraph): Promise<FormattedData[]> => {
  const response = await fetch(
    `${server}/dataset/dynamic/${stationId}?variable=${weatherData}&range=${range}&repeat=${repeat}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch graph data");
  }
  return data.data;
};
export const getStationDetailed = async (
  id: string
): Promise<StationInformation> => {
  const response = await fetch(`${server}/admin/station/${id}`, {
    method: "GET",
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
}: StackedGraph) => {
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

// ** POST REQUESTS
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

// ** UPDATE REQUESTS
// * This function will update the station details based on the id
export const updateStation = async (
  values: StationDetails
): Promise<{ message: string }> => {
  const response = await fetch(`${server}/admin/station/${values.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stationName: values.name,
      latitude: values.latitude,
      longitude: values.longitude,
      imageLink: values.image,
      psgc: values.psgc,
      province: values.province,
      region: values.region,
      municipality: values.municipality,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update station details.");
  }
  return data;
};
