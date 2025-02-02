import { BrowserRouter } from "react-router"
import { Routes } from "./Routes"
import { Modal } from "@/components/modals/Modal"
import { ThemeProvider } from "@mui/material"
import { theme } from "./theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/api"


export function Base() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
          <Modal />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
