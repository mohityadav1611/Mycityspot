
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../ThemeContext";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Navbar = () => {
  const navigate = useNavigate();
  const navigate1 = useNavigate();

  const { toggleColorMode } = useContext(ColorModeContext);
const isDark = localStorage.getItem("themeMode") === "dark";

  // Get logged-in user name from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    navigate("/login");
  };
        const theme = useTheme();
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{ backgroundColor:theme.palette.mode === 'light' ? 'primary' : '#1F2937' }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between",  }}>
          {/* App Name / Logo */}
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            <img src="/Logo 2.png" alt="" height={80} width={100}/>
          </Typography>
          
          {/* User Name & Logout Button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Welcome, {user.fullname}
              </Typography>
            )}
            <Button variant="contained" sx={{backgroundColor:"grey"}} onClick={()=>navigate1("/form")}>
              + Create Spot
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
            <IconButton onClick={toggleColorMode} color="inherit">
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
