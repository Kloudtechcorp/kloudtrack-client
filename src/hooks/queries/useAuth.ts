import { QUERY_KEYS } from "@/constants";
import { getIsAuthenticated, getUserSession } from "@/services/authService";
import { UserDetails } from "@/types/auth.type";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUserSession = (): UseQueryResult<UserDetails, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SESSION],
    queryFn: () => getUserSession(),
    staleTime: 60000,
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
