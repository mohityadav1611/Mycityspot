// Cardspot.tsx
import { Card, CardContent, Typography, CardMedia,Box, Modal,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
  useTheme
 } from "@mui/material";
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
  onDelete: any;
  canDelete: boolean;
  onEdit: (item: Spot) => void;
}


interface Spot {
  image: string;
  place: string;
  city: string;
  Type: string;
  state: string;
  short: string;
  authorName: string;
  detail: string;
}

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
  onEdit:(item: Spot)=>void;
}

const Cardspot: React.FC<CardspotProps> = ({ image, place, city, Type, state, short, authorName,detail,onDelete,canDelete,onEdit }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openConfirm, setOpenConfirm] = useState(false); // for delete confirm

        const handleDeleteClick = () => {
          setOpenConfirm(true); // open dialog
        };

        const handleConfirmDelete = () => {
          onDelete(); // parent se aayega
          setOpenConfirm(false);
        };

        const handleCancelDelete = () => {
          setOpenConfirm(false);
        };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
      const handleEdit = () => {
        console.log("Edit button clicked");
        const spot={
          image,
          place,
          city,
          Type,
          state,
          short,
          authorName,
          detail
        };
        onEdit(spot)
      };
      const theme=useTheme()
  return (
    
    <Card sx={{ width: 350, height: 440,maxHeight:600, display: "flex", flexDirection: "column", justifyContent: "space-between",border: "2px solid red", borderRadius: 3,mt:2 
      ,boxShadow: '4px 4px 20px rgba(0, 123, 255, 0.3)',
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
       "&:hover": {
      transform: "scale(1.02)",
      boxShadow: 6,
      
    },backgroundColor:theme.palette.mode === 'light' ?"white":"#1F2937"
    }}> 
    <Box sx={{maxHeight:200 , }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={place}
        sx={{   height: 200,
          width: '100%',
          objectFit: 'cover',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px', }}
      /></Box>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
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
            <Typography sx={{ mt: 1, cursor: "pointer", color: "#1976d2", fontWeight: "light", display: "inline-block", }}
             onClick={handleOpen} >
          Readmore...
        </Typography></Box>
        <Box>
            <IconButton onClick={handleDeleteClick} disabled={!canDelete}>
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

      <Dialog open={openConfirm} onClose={handleCancelDelete}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete this spot?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancelDelete}>Cancel</Button>
    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
  </DialogActions>
</Dialog>

    </Card>
   
  );
};

export default Cardspot;
