import { useMutation, useQuery } from "@tanstack/react-query"
import { chatApi } from "./api"
import { AxiosError } from "axios"
import { queryClient } from "../query"

export const useGetChats = () => {
  return useQuery({
    queryKey: ["getChats"],
    queryFn: chatApi.getChats,
    staleTime: 300000,
    retry: false,
  })
}

export const useCreateChatGroup = () => {
  return useMutation({
    mutationFn: chatApi.createChatGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getChats"] })
    },
    onError: (error: AxiosError) => {
      console.error("Ошибка регистрации:", error.message)
    },
  })
}
