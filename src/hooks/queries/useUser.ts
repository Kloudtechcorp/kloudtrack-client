import { QUERY_KEYS } from "@/constants";
import {
  getActiveDevices,
  getStationData,
  getUserProfile,
} from "@/services/userService";
import { ActiveDevices, StationDetails, UserProfile } from "@/types/user.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUserProfile = (
  userId: number
): UseQueryResult<UserProfile, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE, userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 60000,
    refetchInterval: 1000,
  });
};

export const useGetStationNames = (
  stationId: string
): UseQueryResult<StationDetails, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_STATION_NAMES, stationId],
    queryFn: () => getStationData(stationId),
    staleTime: 60000,
  });
};

export const useGetActiveDevices = (): UseQueryResult<ActiveDevices, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ACTIVE_DEVICES],
    queryFn: () => getActiveDevices(),
    staleTime: 60000,
    refetchInterval: 1000,
  });
};
