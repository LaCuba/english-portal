import { useMutation } from "@tanstack/react-query"
import { authApi } from "./api"
import { AxiosError } from "axios"
import { store } from "@/store"
// import { queryClient } from "../query"

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: authApi.register,
    onError: (error: AxiosError) => {
      console.error("Ошибка регистрации:", error.message)
    },
  })
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: authApi.login,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["userProfile"] })
    // },
    onError: (error: AxiosError) => {
      console.error("Ошибка входа:", error.message)
    },
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      store.useAuthStore.getState().reset()
    },
    onError: (error: AxiosError) => {
      console.error("Ошибка выхода:", error.message)
    },
  })
}
