import { Box, Typography, Button, Avatar, useTheme } from "@mui/material";
// import { motion } from "framer-motion";
// import { useRef } from "react";
type HeroSectionProps = {
  scrollToRef: React.RefObject<HTMLDivElement>;
};
const HeroSection = ({ scrollToRef }: HeroSectionProps) => {
  const theme = useTheme();

  const handleScroll = () => {
    scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "60vh", md: "50vh" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.mode === 'light' ? "#f5f5f5" : "#1F2937",
        px: { xs: 3, md: 10 },
        py: { xs: 4, md: 8 },
        borderRadius: "20px",
        boxShadow: '4px 4px 20px rgba(0, 123, 255, 0.3)',
        mt: {xs:30,sm:4,md:4,lg:4},
      }}
    >
      {/* Left Content */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.mode === 'light' ? "#333" : "#e0e0e0",
            mb: 2,
          }}
        >
          Discover & Share Hidden Gems 🌟
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: theme.palette.mode === 'light' ? "#555" : "#cfcfcf", mb: 3 }}
        >
          Explore places shared by real people across India. Be a part of the community and let the world know your city’s best spots.
        </Typography>

        <Button onClick={handleScroll}
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Right Image/Avatar with Hover Animation */}
      <Box
    
        // whileHover={{ scale: 1.1, rotate: 5 }}
        sx={{
          mt: { xs: 4, md: 0 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="MyCitySpot"
          src="/Nature2.avif" // Replace with your image
          sx={{
            width: { xs: 180, sm: 220, md: 280 },
            height: { xs: 180, sm: 220, md: 280 },
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            border: "5px solid",
            borderColor: theme.palette.primary.main,
          }}
        />
      </Box>
      
    </Box>
    
  );
};

export default HeroSection;
