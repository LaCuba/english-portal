import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5c24f5",
    },
    secondary: {
      main: "#f6f6ff",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "25px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: "25px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "25px",
        },
      },
    },
  },
})
