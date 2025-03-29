import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  getAnalysis,
  getCoastalData,
  getDataset,
  getRainData,
  getRiverData,
  getStationDetailed,
  getWeatherData,
  stackedGraphDataset,
} from "@/services/stationService";
import {
  AnalysisRequirements,
  CoastalDashboard,
  FormattedData,
  LinearGraph,
  RainDashboard,
  RiverDashboard,
  StackedGraph,
  StationInformation,
  WeatherAnalysis,
  WeatherDashboard,
} from "@/types/station.type";
import { getStations } from "@/services/adminService";

export const useGetWeatherData = (
  id: string
): UseQueryResult<WeatherDashboard, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AWS_DATA, id],
    queryFn: () => getWeatherData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetRainData = (
  id: string
): UseQueryResult<RainDashboard, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ARG_DATA, id],
    queryFn: () => getRainData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetRiverData = (
  id: string
): UseQueryResult<RiverDashboard, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RLMS_DATA, id],
    queryFn: () => getRiverData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetCoastalData = (
  id: string
): UseQueryResult<CoastalDashboard, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLMS_DATA, id],
    queryFn: () => getCoastalData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetAnalysis = (
  graphData: AnalysisRequirements
): UseQueryResult<WeatherAnalysis, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TABLE_GRAPH_DATA, graphData],
    queryFn: () => getAnalysis(graphData),
    refetchInterval: 60000,
    staleTime: 60000,
  });
};

export const useGetDataset = (
  graphData: LinearGraph
): UseQueryResult<FormattedData[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DATASET, graphData],
    queryFn: () => getDataset(graphData),
    refetchInterval: 60000,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};

export const useGetStationDetailed = (
  id: string
): UseQueryResult<StationInformation[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BUG_REPORTS],
    queryFn: () => getStationDetailed(id),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const useGetStackedGraphData = (data: StackedGraph) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DATASET_ALL],
    queryFn: () => stackedGraphDataset(data),
  });
};
