// src/types/chartTypes.ts

// Type for each environmental parameter's data
export type ChartData = {
  temperature: number[];
  humidity: number[];
  heatIndex: number[];
  airPressure: number[];
  precipitation: number[];
  uvIndex: number[];
  irradiance: number[];
  lux: number[];
  batteryLevel: number[];
};

// Type for the station details
export type StationDetails = {
  label: string;
  value: string;
};

// Type for station data including details and chart data
export type StationData = {
  stationName: string;
  location: string;
  details: {
    temperature: unknown[];
    humidity: unknown[];
    heatIndex: unknown[];
    airPressure: unknown[];
    precipitation: unknown[];
    uvIndex: unknown[];
    irradiance: unknown[];
    lux: unknown[];
    batteryLevel: unknown[];
  };
  chartData: ChartData;
};

// Props for the ReusableLineChart component
export type ReusableLineChartProps = {
  containerId: string;
  stationIndex: number;
  dataKey: string;
  data: StationData;
  markLineValue: number;
  markLineColor: string;
  markLineWidth: number;
};
