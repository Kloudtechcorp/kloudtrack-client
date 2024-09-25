import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  downloadableDataTypes,
  downloadParamsTypes,
  hourlyDataTypes,
  stationBarangayType,
  stationComputedTypes,
  stationDashboardType,
  stationMunicipalityType,
  stationNamesType,
  stationProvinceType,
  stationRegionType,
  stationsListType,
  TableGraphCardType,
  userProfileTypes,
} from "@/types/queryTypes";
import {
  getHourlyDataset,
  getIsAuthenticated,
  getStationBarangays,
  getStationData,
  getStationList,
  getStationMunicipalities,
  getStationNames,
  getStationProvinces,
  getStationRegions,
  getStationTypes,
  getTableGraphData,
  getUserProfile,
  getUserSession,
} from "@/api/get";
import { stationStaticType, UserType } from "@/types";

export const useGetStationData = (
  name: string
): UseQueryResult<stationDashboardType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_DATA, name],
    queryFn: () => getStationData(name),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetStationList = (): UseQueryResult<
  stationsListType[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_LIST],
    queryFn: () => getStationList(),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetStationTypes = (): UseQueryResult<
  stationNamesType[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_TYPES],
    queryFn: () => getStationTypes(),
  });
};

export const useGetStationRegions = (): UseQueryResult<
  stationRegionType[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_REGIONS],
    queryFn: () => getStationRegions(),
  });
};

export const useGetStationProvinces = (
  regionId: number
): UseQueryResult<stationProvinceType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_PROVINCES],
    queryFn: () => getStationProvinces(regionId),
    enabled: !!regionId,
  });
};

export const useGetStationMunicipalities = (
  provinceId: number
): UseQueryResult<stationMunicipalityType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_MUNICIPALITIES],
    queryFn: () => getStationMunicipalities(provinceId),
    enabled: !!provinceId,
  });
};

export const useGetStationBarangays = (
  municipalityId: number
): UseQueryResult<stationBarangayType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_BARANGAYS],
    queryFn: () => getStationBarangays(municipalityId),
    enabled: !!municipalityId,
  });
};

export const useGetUserProfile = (): UseQueryResult<
  userProfileTypes,
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE],
    queryFn: () => getUserProfile(),
    staleTime: 60000,
  });
};

export const useGetUserSession = (): UseQueryResult<UserType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SESSION],
    queryFn: () => getUserSession(),
    staleTime: 60000,
  });
};

export const useGetStationNames = (): UseQueryResult<
  stationStaticType[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_NAMES],
    queryFn: () => getStationNames(),
    staleTime: 60000,
  });
};

export const useGetTableGraphData = (
  graphData: TableGraphCardType
): UseQueryResult<stationComputedTypes, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TABLE_GRAPH_DATA, graphData],
    queryFn: () => getTableGraphData(graphData),
    refetchInterval: 60000,
    staleTime: 60000,
  });
};

export const useGetHourlyDataset = (
  graphData: TableGraphCardType
): UseQueryResult<hourlyDataTypes[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HOURLY_DATASET, graphData],
    queryFn: () => getHourlyDataset(graphData),
    refetchInterval: 60000,
    staleTime: 60000,
    refetchOnWindowFocus: true,
  });
};

export const useGetIsAuthenticated = (): UseQueryResult<boolean, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_IS_AUTHENTICATED],
    queryFn: () => getIsAuthenticated(),
    staleTime: 60000,
  });
};
