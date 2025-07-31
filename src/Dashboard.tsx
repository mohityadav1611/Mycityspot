import { Container,Toolbar,useTheme,Box } from "@mui/material"
import Navbar from "./DashComponents/NavBar"
import Cardspot from "./DashComponents/Cardspot";
import { useEffect, useState } from "react";



type Spot = {
  image: string;
  place: string;
  city: string;
  state: string;
  shortDesc: string;
  spotType: string;
  authorName: string;
  detailDesc: string;
};

const Dashboard = () => {
    const theme = useTheme();
    const [spots, setspots]= useState<Spot[]>([]) ;//Delete state
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
   
    const handleDelete = (deleteIndex:any) => {
  const updatedSpots = spots.filter((_, i) => i !== deleteIndex);
  setspots(updatedSpots);
  localStorage.setItem("userSpot", JSON.stringify(updatedSpots));
};


    
    useEffect(()=>{
      const storeData= localStorage.getItem("userSpot");
      if(storeData){
        const parseData = JSON.parse(storeData);
        console.log("Parsed Data:", parseData);
        setspots(parseData);
      }
    },[])
    
  return (
    
    <Container sx={{backgroundColor:theme.palette.mode === 'light' ? '#eeeeee' : '#1F2937', 
        
        width: '100vw', height: '100vh',paddingBottom: "2rem",minHeight: "100vh"
        }}  maxWidth={false} >
      <Navbar/>
      <Toolbar/>
      <Box sx={{backgroundColor:"green", height:"auto"}}>
      <div style={{ display: "flex",flexDirection:"row",flexWrap: "wrap",justifyContent:"space-between" ,gap: "50px", padding: "1rem" }}>
        {spots.map((spot, index) => (
          
          <Cardspot
            key={index}
            image={spot.image}
            place={spot.place}
            city={spot.city}
            state={spot.state}
            short={spot.shortDesc}
            Type={spot.spotType}
            authorName={spot.authorName}
             detail={spot.detailDesc} // future: for "Read More"
             onDelete={()=>handleDelete(index)}
            canDelete={spot.authorName === loggedInUser.fullname}
             
            
          />
          
        ))}
      </div>
      </Box>
    </Container>
  )
}

export default Dashboard
