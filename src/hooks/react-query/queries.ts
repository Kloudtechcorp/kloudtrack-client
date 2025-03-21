"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  ActiveDevicesResponse,
  analysisType,
  argDashboardType,
  awsDashboardType,
  awsDashboardType2,
  clmsDashboardType,
  coastalDataTypes,
  detailedStationProps,
  DynamicDatasetType,
  hourlyDataTypes,
  rlmsDashboardType,
  stationBarangayType,
  stationComputedTypes,
  stationMunicipalityType,
  stationNamesType,
  stationProvinceType,
  stationRegionType,
  stationsListType,
  TableGraphCardType,
  tablesType,
  userProfileTypes,
  WeatherStationResponse,
} from "@/types/queryTypes";
import {
  getArgData,
  getAwsData,
  getAwsData2,
  getIsAuthenticated,
  getRlmsData,
  getStationBarangays,
  getStationList,
  getStationMunicipalities,
  getStationData,
  getStationProvinces,
  getStationRegions,
  getStationTypes,
  getUserProfile,
  getUserSession,
  getDataset,
  getClmsData,
  getWeatherSensors,
  getRainGaugeSensors,
  getRiverLevelSensors,
  getCoastalSensors,
  getUserList,
  getBugReports,
  getStationDetailed,
  getAnalysis,
  stackedGraphDataset,
  getActiveDevices,
} from "@/api/get";
import {
  coastalSensorsType,
  formattedDataType,
  rainGaugeSensorsType,
  reportedBugType,
  riverLevelSensorsType,
  stationStaticType,
  userListType,
  UserType,
  weatherSensorsType,
} from "@/types";

export const useGetAwsData = (
  id: string
): UseQueryResult<awsDashboardType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AWS_DATA, id],
    queryFn: () => getAwsData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetAwsData2 = (
  id: string
): UseQueryResult<awsDashboardType2, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AWS_DATA2, id],
    queryFn: () => getAwsData2(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetArgData = (
  id: string
): UseQueryResult<argDashboardType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ARG_DATA, id],
    queryFn: () => getArgData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetRlmsData = (
  id: string
): UseQueryResult<rlmsDashboardType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RLMS_DATA, id],
    queryFn: () => getRlmsData(id),
    refetchInterval: 5000,
    retry: 1,
    staleTime: 30000,
  });
};

export const useGetClmsData = (
  id: string
): UseQueryResult<clmsDashboardType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLMS_DATA, id],
    queryFn: () => getClmsData(id),
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
    queryKey: [QUERY_KEYS.GET_STATION_PROVINCES, regionId],
    queryFn: () => getStationProvinces(regionId),
    enabled: !!regionId,
  });
};

export const useGetStationMunicipalities = (
  provinceId: number
): UseQueryResult<stationMunicipalityType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_MUNICIPALITIES, provinceId],
    queryFn: () => getStationMunicipalities(provinceId),
    enabled: !!provinceId,
  });
};

export const useGetStationBarangays = (
  municipalityId: number
): UseQueryResult<stationBarangayType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_BARANGAYS, municipalityId],
    queryFn: () => getStationBarangays(municipalityId),
    enabled: !!municipalityId,
  });
};

export const useGetUserProfile = (
  userId: number
): UseQueryResult<userProfileTypes, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE, userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 60000,
    refetchInterval: 1000,
  });
};

export const useGetUserSession = (): UseQueryResult<UserType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SESSION],
    queryFn: () => getUserSession(),
    staleTime: 60000,
  });
};

export const useGetStationNames = (
  stationId: string
): UseQueryResult<stationStaticType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_NAMES, stationId],
    queryFn: () => getStationData(stationId),
    staleTime: 60000,
  });
};

export const useGetAnalysis = (
  graphData: analysisType
): UseQueryResult<WeatherStationResponse, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TABLE_GRAPH_DATA, graphData],
    queryFn: () => getAnalysis(graphData),
    refetchInterval: 60000,
    staleTime: 60000,
  });
};

export const useGetDataset = (
  graphData: TableGraphCardType
): UseQueryResult<formattedDataType[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DATASET, graphData],
    queryFn: () => getDataset(graphData),
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
    refetchInterval: 5000,
  });
};
export const useGetAwsSensors = (
  page = 0,
  pageSize = 10
): UseQueryResult<
  {
    items: weatherSensorsType;
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  },
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_AWS_SENSORS, page, pageSize],
    queryFn: () => getWeatherSensors(page, pageSize),
    staleTime: 60000, // 1 minute
  });
};
export const useGetArgSensors = (): UseQueryResult<
  rainGaugeSensorsType,
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ARG_SENSORS],
    queryFn: () => getRainGaugeSensors(),
    staleTime: 60000,
  });
};
export const useGetRlmsSensors = (): UseQueryResult<
  riverLevelSensorsType,
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RLMS_SENSORS],
    queryFn: () => getRiverLevelSensors(),
    staleTime: 60000,
  });
};
export const useGetClmsSensors = (): UseQueryResult<
  coastalSensorsType,
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLMS_SENSORS],
    queryFn: () => getCoastalSensors(),
    staleTime: 60000,
  });
};

export const useGetUsers = (): UseQueryResult<userListType, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LIST],
    queryFn: () => getUserList(),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const useGetBugReports = (): UseQueryResult<
  reportedBugType[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BUG_REPORTS],
    queryFn: () => getBugReports(),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const useGetStationDetailed = (
  id: string
): UseQueryResult<detailedStationProps, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BUG_REPORTS],
    queryFn: () => getStationDetailed(id),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const useGetStackedGraphData = (data: DynamicDatasetType) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_DATASET_ALL],
    queryFn: () => stackedGraphDataset(data),
  });
};

export const useGetActiveDevices = (): UseQueryResult<
  ActiveDevicesResponse,
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTIVE_DEVICES],
    queryFn: () => getActiveDevices(),
    staleTime: 60000,
    refetchInterval: 1000,
  });
};
