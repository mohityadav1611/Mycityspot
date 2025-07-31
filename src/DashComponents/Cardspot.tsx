// Cardspot.tsx
import { Card, CardContent, Typography, CardMedia,Box, Modal, } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";



interface CardspotProps {
  image: string;
  place: string;
  city: string;
  Type: string;
  state: string;
  short: string;
  authorName: string;
  detail: string;
  onDelete:any;
  canDelete: boolean;
}

const Cardspot: React.FC<CardspotProps> = ({ image, place, city, Type, state, short, authorName,detail,onDelete,canDelete }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
   const handleDelete = () => {
    onDelete(); // parent se aayega
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      const handleEdit = () => {
        // Step 2 me handle karenge
        console.log("Edit button clicked");
      };

  return (
    
    <Card sx={{ width: 350, height: 440,maxHeight:600, display: "flex", flexDirection: "column", justifyContent: "space-between",border: "2px solid red", borderRadius: 3, boxShadow: 3,mt:12 }}> 
    <Box sx={{maxHeight:200}}>
      <CardMedia
        component="img"

        height="180"
        image={image}
        alt={place}
        sx={{ objectFit: "cover",overflow:"hidden" }}
      /></Box>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          📍 {place}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city}, {state}
        </Typography>

       <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Type:  {Type}
        </Typography>

        <Typography variant="body2" noWrap sx={{ mt: 1, overflow:"hidden",textOverflow: 'ellipsis', height: 20 }}>
          {short}
        </Typography>

 

        <Box sx={{display:"flex",alignItems:"center",gap:1,mb:1,mt:1 }}>
        <PersonIcon fontSize="small"/>
        <Typography variant="body2" color="text.secondary" display="block" sx={{  }}>
           {authorName}
        </Typography>
        </Box>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <Box>
            <Typography sx={{ mt: 1, cursor: "pointer", color: "blue", fontWeight: "light", display: "inline-block", }}
             onClick={handleOpen} >
          Read More...
        </Typography></Box>
        <Box>
            <IconButton onClick={handleDelete} disabled={!canDelete}>
              <DeleteOutlineIcon  color={canDelete?"error":"disabled"} />
            </IconButton>
            {authorName === loggedInUser.fullname && (
              <IconButton onClick={handleEdit}>
                <EditIcon color="primary" />
              </IconButton>
            )}
              </Box>
          </div>

      </CardContent>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2, 
        width:{xs:"90%", sm:"80%",md:"60%"},
        maxHeight: "80vh", overflowY: "auto", }}>
        
          <CloseIcon onClick={handleClose} sx={{position: "absolute", top: 8, right: 8,
        cursor: "pointer", color: "gray", "&:hover": {color: "red", }, }}/>

        <Typography variant="h6" gutterBottom>
        {place}, {city}
      </Typography>
        <Typography variant="h6" gutterBottom>
        📖 Detailed Description
      </Typography>
      <Typography variant="body2">
        {detail}
      </Typography>

        </Box>

      </Modal>
    </Card>
   
  );
};

export default Cardspot;
