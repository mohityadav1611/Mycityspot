import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Welcome = () => {
    const navigate = useNavigate()

    const handleLoginClick =()=>{
        navigate("/login");
    }

  return (
    <Container maxWidth={false}
  sx={{
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    // backgroundColor:"skyblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  
    gap:2,
    }}>
        {/* <Box sx={{ 
  position: "relative", 
  width: "100vw", 
  height: "100vh", 
  overflow: "hidden" 
}}> */}
    <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "url('/Nature2.avif')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(2px)",
      zIndex: 0
    }}
  />
  <Box sx={{ 
    position: "relative", 
    zIndex: 1, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100%" 
  }}>
    <Box
      sx={{
        height: "50vh",
        // bgcolor: "#f5f5f5",       
        px: 2,
        textAlign: "center",
         padding: { xs: 3, sm: 5 },
        //   borderRadius: 3,
        //   boxShadow: '0px 4px 30px rgba(43, 22, 235, 0.3)',
          maxWidth: 600,
          width: "100%",
      }}
    >      
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#eeeeee",
            mb: 2,
          }}
        >
          Welcome to MyCitySpot
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 4, fontWeight: "bold",
            color: "#fafafa",}}>
          Explore your city like never before — Discover places, events, and hidden gems right near you.
        </Typography>

        <Button
            onClick={handleLoginClick}
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "200px" },
            py: 1.2,
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Explore Now
        </Button>
      </Box>
    </Box>
{/* </Box> */}
    </Container>
  );
};

export default Welcome;
