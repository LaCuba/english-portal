// import axios from "axios"
// import { queryClient } from "./query"
// import { store } from "@/store"
// import { __ } from "@/helpers"

import axios from "axios"

// export type FailedQueue = {
//   resolve: (value: unknown) => void
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   reject: (reason?: any) => void
// }

// let isRefreshing = false
// let failedQueue: FailedQueue[] = []

// function processQueue(error: unknown, token: string | null = null) {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token)
//     }
//   })

//   failedQueue = []
// }

// function getCookie(name: string) {
//   const cookies = __.split(document.cookie, ";")
//   const foundCookie = __.find(cookies, (cookie) => __.includes(cookie, name))
//   return foundCookie?.match(`${name}=(.*)`)
// }

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   withCredentials: true,
// })

// instance.interceptors.request.use((config) => {
//   const token = getCookie('ac-token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject })
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`
//             return axios(originalRequest)
//           })
//           .catch((err) => {
//             return Promise.reject(err)
//           })
//       }

//       originalRequest._retry = true
//       isRefreshing = true

//       try {
//         const response = await axios.post(
//           "/auth/refresh",
//           {},
//           { withCredentials: true },
//         )
//         const newToken = response.data.token

//         // TODO: Тут нужно засетать новый токен

//         processQueue(null, newToken)

//         originalRequest.headers.Authorization = `Bearer ${newToken}`
//         return instance(originalRequest)
//       } catch (err) {
//         processQueue(err, null)
//         store.useAuthStore.getState().reset()
//         queryClient.clear()
//         return Promise.reject(err)
//       } finally {
//         isRefreshing = false
//       }
//     }

//     return Promise.reject(error)
//   },
// )

// export default instance

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})
