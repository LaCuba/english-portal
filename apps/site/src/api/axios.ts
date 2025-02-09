import axios from "axios"

import { store } from "@/store"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-ALlow-Credentials": true,
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.useAuthStore.getState().reset()
    }
  },
)
