import { Container,useTheme } from "@mui/material"
import Navbar from "./DashComponents/NavBar"

const Dashboard = () => {
    const theme = useTheme();
    
  return (
    
    <Container sx={{backgroundColor:theme.palette.mode === 'light' ? '#eeeeee' : '#1F2937', 
        
        width: '100vw', height: '100vh',
        }}  maxWidth={false} >
      <Navbar/>
    </Container>
  )
}

export default Dashboard
