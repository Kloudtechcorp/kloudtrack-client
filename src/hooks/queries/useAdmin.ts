import { QUERY_KEYS } from "@/constants";
import {
  getReports,
  getStationBarangays,
  getStationMunicipalities,
  getStationProvinces,
  getStationRegions,
  getStations,
  getUserList,
} from "@/services/adminService";
import {
  getCoastalSensors,
  getRainGaugeSensors,
  getRiverLevelSensors,
  getWeatherSensors,
} from "@/services/stationService";
import {
  ReportDetails,
  StationBarangay,
  StationMunicipality,
  StationName,
  StationProvince,
  StationRegion,
  UserDetails,
} from "@/types/admin.type";
import {
  CoastalSensor,
  RainGaugeSensor,
  RiverLevelSensor,
  WeatherSensor,
} from "@/types/station.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetStationTypes = (): UseQueryResult<StationName[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_TYPES],
    queryFn: () => getStations(),
  });
};

export const useGetStationRegions = (): UseQueryResult<
  StationRegion[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_REGIONS],
    queryFn: () => getStationRegions(),
  });
};

export const useGetStationProvinces = (
  regionId: number
): UseQueryResult<StationProvince[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_PROVINCES, regionId],
    queryFn: () => getStationProvinces(regionId),
    enabled: !!regionId,
  });
};

export const useGetStationMunicipalities = (
  provinceId: number
): UseQueryResult<StationMunicipality[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_MUNICIPALITIES, provinceId],
    queryFn: () => getStationMunicipalities(provinceId),
    enabled: !!provinceId,
  });
};

export const useGetStationBarangays = (
  municipalityId: number
): UseQueryResult<StationBarangay[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_BARANGAYS, municipalityId],
    queryFn: () => getStationBarangays(municipalityId),
    enabled: !!municipalityId,
  });
};

export const useGetWeatherSensors = (
  page = 0,
  pageSize = 10
): UseQueryResult<
  {
    items: WeatherSensor[];
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
    staleTime: 60000,
  });
};

export const useGetRainGaugeSensors = (): UseQueryResult<
  RainGaugeSensor[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ARG_SENSORS],
    queryFn: () => getRainGaugeSensors(),
    staleTime: 60000,
  });
};
export const useGetRiverLevelSensors = (): UseQueryResult<
  RiverLevelSensor[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RLMS_SENSORS],
    queryFn: () => getRiverLevelSensors(),
    staleTime: 60000,
  });
};
export const useGetCoastalSensors = (): UseQueryResult<
  CoastalSensor[],
  Error
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLMS_SENSORS],
    queryFn: () => getCoastalSensors(),
    staleTime: 60000,
  });
};

export const useGetUsers = (): UseQueryResult<UserDetails[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LIST],
    queryFn: () => getUserList(),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const useGetReports = (): UseQueryResult<ReportDetails[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BUG_REPORTS],
    queryFn: () => getReports(),
    staleTime: 5000,
    refetchInterval: 5000,
  });
};
