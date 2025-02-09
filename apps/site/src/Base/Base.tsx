import { BrowserRouter } from "react-router"
import { Routes } from "./Routes"
import { ModalChooser } from "@/components/modals/ModalChooser"
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
          <ModalChooser />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
