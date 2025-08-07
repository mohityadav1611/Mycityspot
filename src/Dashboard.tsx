import { Container,Toolbar,useTheme,Box,Button } from "@mui/material"
import Navbar from "./DashComponents/NavBar"
import Cardspot from "./DashComponents/Cardspot";
import { useEffect, useState,useRef } from "react";
import AuthorForm from "./DashComponents/FormModal"
import ListSpot from "./DashComponents/ListSpot";
import { Autocomplete, TextField } from '@mui/material';
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";


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


    const cardSectionRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    
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

// Toggle state
      // Step 1: Get view from localStorage (safe default = "card")
const viewR = localStorage.getItem("viewType");
const viewF = viewR ? JSON.parse(viewR) : "card"; // fallback to "card"

// Step 2: Set it in state
const [viewType, setViewType] = useState<"card" | "list">(viewF);

// Step 3: Whenever viewType changes, update it in localStorage
useEffect(() => {
  localStorage.setItem("viewType", JSON.stringify(viewType));
}, [viewType]);

// search bar state
      const [searchInput, setSearchInput] = useState("");

      const filteredSpots = spots.filter((spot)=>{
        const input = searchInput.toLowerCase().trim();
        return(
           spot.place.toLowerCase().includes(input) ||
          spot.city.toLowerCase().includes(input) ||
          spot.state.toLowerCase().includes(input)
        )
      })
    
  return (
    
    <Container  sx={{backgroundColor:theme.palette.mode === 'light' ? '#eeeeee' : '#1F2937', 
        
         py: { xs: 2, sm: 3, md: 2 },px: { xs: 2, sm: 4, md: 4 },minHeight: "100vh",
       pb: { xs: 4, sm: 6 }, overflowX: "hidden", }}  maxWidth={false} >
      <Navbar/>
      
      <Toolbar/>
      <HeroSection scrollToRef={cardSectionRef}/>
      <Box sx={{ height:"auto"}} ref={cardSectionRef}>

        
        
        <Box id="box" sx={{display:"flex",flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between",
         alignItems: { xs: "stretch", sm: "center" },gap:2,px:2, pt: { xs: 22, sm: 10 },  }}>

        <Autocomplete
      freeSolo
      options={[...new Set(spots.flatMap((spot) => [spot.place, spot.city, spot.state]))]}
      onInputChange={(e, value) => setSearchInput(value)}
      renderInput={(params) => (
    <TextField
      {...params}
      label="Search Places / City / State"
      variant="outlined"
      sx={{
        // backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        '& .MuiOutlinedInput-root': {
          '&:hover': {
            transform: "scale(1.02)",
            transition: "transform 0.2s ease-in-out",
          },
        },
      }}
    />
  )}
  sx={{
    width: { xs: '100%', sm: 350 },
    
    transition: "all 0.3s ease-in-out",
    '&:hover': {
      transform: "scale(1.02)",
    },
  }}
/>


        <Button
          onClick={() => setViewType(viewType === "card" ? "list" : "card")}
          variant="contained"
          color="primary"
          sx={{width: { xs: '100%', sm: 'auto' },
              borderRadius: '30px', px: 3, fontWeight: 600,
             textTransform: 'capitalize',  }}
        >
          {viewType === "card" ? "Switch to List View" : "Switch to Card View"}
        </Button></Box>

        {viewType === 'card' ?(
            <Box
      sx={{
         display: "grid",
    gridTemplateColumns: {
      xs: "1fr",        // small screen: 1 column
      sm: "1fr 1fr",    // small screen: 2 columns
      md: "1fr 1fr 1fr",// medium: 3
      lg: "1fr 1fr 1fr", // large: 4
    },
    gap: 4,
    px: 2,
    py: 2,
      }}
    >

        
        {filteredSpots.map((spot, index) => (
          
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
        ))}</Box>
      
      ) : (
      
      <Box sx={{ p: 2 }}>
        
        <ListSpot
        spots={filteredSpots}     
        onEdit={handleEdit}/>  
      </Box>
    )}
    </Box>
        
       
            <AuthorForm
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={selectedSpot ?? undefined} // New prop to pass data
          isEdit={true} // Optional: flag to know it's edit mode
        />  
        <Box>
        <Footer/></Box>
    </Container>
   
  )
}

export default Dashboard
