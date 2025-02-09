import { useQuery } from "@tanstack/react-query"
import { userApi } from "./api"

export const useGetProfile = (isSkip: boolean) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: userApi.getProfile,
    staleTime: 300000,
    retry: false,
    enabled: isSkip,
  })
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: userApi.getUsers,
    staleTime: 300000,
    retry: false,
  })
}
