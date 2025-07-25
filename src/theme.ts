// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#f50057", // Pink
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
