import { Container,Toolbar,useTheme,Box,Button } from "@mui/material"
import Navbar from "./DashComponents/NavBar"
import Cardspot from "./DashComponents/Cardspot";
import { useEffect, useState } from "react";
import AuthorForm from "./DashComponents/FormModal"
import ListSpot from "./DashComponents/ListSpot";



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
    const [spots, setspots]= useState<Spot[]>([]) ;
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

      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

      const handleEdit = (spot: Spot) => {
        console.log("Editing spot:", spot);
        setSelectedSpot(spot);
        setIsEditModalOpen(true);
      };

      const [viewType, setViewType] = useState<"card" | "list">("card");

    
  return (
    
    <Container sx={{backgroundColor:theme.palette.mode === 'light' ? '#eeeeee' : '#1F2937', 
        
        width: '100vw', height: '100vh',paddingBottom: "2rem",minHeight: "100vh"
        }}  maxWidth={false} >
      <Navbar/>
      <Toolbar/>

      <Box sx={{backgroundColor:"green", height:"auto"}}>
        <Box sx={{display:"flex", justifyContent:"flex-end", p:2  }}>
        <Button
          onClick={() => setViewType(viewType === "card" ? "list" : "card")}
          variant="contained"
          color="primary"
          sx={{mt:5}}
        >
          {viewType === "card" ? "Switch to List View" : "Switch to Card View"}
        </Button></Box>

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
            onEdit={handleEdit}
          />       
        ))}
      </div>
      </Box>
      <Box>
        <ListSpot/>
      </Box>
        
       
            <AuthorForm
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={selectedSpot} // New prop to pass data
          isEdit={true} // Optional: flag to know it's edit mode
        />  
       

    </Container>
  )
}

export default Dashboard
