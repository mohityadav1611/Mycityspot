import { Box, Container, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box

      component="footer"
      sx={{ width: "100%",
        backgroundColor: isDarkMode ? "grey.900" : "grey.100",
        color: isDarkMode ? "grey.300" : "grey.700",
        mt: 10,
        py: 2,
      }}
    >
      <Container
        maxWidth={false} 
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography variant="h6" sx={{ color: "green.800", fontWeight: "bold" }}>
            MyCitySpots 🌍
          </Typography>
          <Typography variant="body2" sx={{ color: isDarkMode ? "#fff" : "grey.600", mt: 0.5 }}>
            Discover hidden places from real people across India.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ mt: { xs: 2, md: 0 }, textAlign: { xs: "center", md: "right" } }}>
          <Typography variant="body2">
            📧 <a href="mailto:mohit.544509@gmail.com" style={{ color: isDarkMode ? "#90CAF9" : "#1976d2", textDecoration: "none" }}>contact@mohit.544509@gmail.com</a>
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            © 2025 MyCitySpots. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
