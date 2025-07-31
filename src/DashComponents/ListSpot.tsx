import { Box, Typography, Avatar, Button, IconButton, Stack, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions,} from "@mui/material";

type Spot = {
  image: string;
  place: string;
  city: string;
  state: string;
  shortDesc: string;
  spotType: string;
  authorName: string;
  detailDesc: string;
  onDelete:any;
  canDelete: boolean;
  onEdit:(item: Spot)=>void;
};


const ListSpot = () => {
    const [userSpots, setUserSpots]= useState<Spot[]>([])

    const [openModal, setOpenModal] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);


    useEffect(() => {
    const storedData = localStorage.getItem("userSpot");
    if (storedData) {
      setUserSpots(JSON.parse(storedData));
    }
    }, []);

            const handleReadMore = (spot: Spot) => {
        setSelectedSpot(spot);
        setOpenModal(true);
        };

        const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSpot(null);
        };


  return (
    <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
        List View
      </Typography>

      {userSpots.map((spot, index) => (
        <Paper
          key={index}
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { sm: "center" },
            p: 2,
            mb: 2,
          }}
        >
          {/* Left: Image */}
          <Avatar
            variant="rounded"
            src={spot.image}
            alt={spot.place}
            sx={{ width: 220, height: 150 }}
          />

          {/* Middle: Text info */}
          <Box sx={{ flex: 1, ml: 4 }}>
            <Typography variant="h6" color="primary">
              📍 {spot.place}, {spot.city} ({spot.state})
            </Typography>
            <Typography variant="subtitle2" sx={{ fontStyle: "italic", mt: 1 }}>
              Type: {spot.spotType}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, mt: 1 }}>
              <PersonIcon fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
                {spot.authorName}
              </Typography>
            </Box>
            <Typography variant="body2">{spot.shortDesc}</Typography>

            <Typography onClick={() => handleReadMore(spot)}
              sx={{
                mt: 1,
                cursor: "pointer",
                color: "blue",
                fontWeight: "light",
                display: "inline-block",
              }}
              variant="body2"
            >
              Readmore...
            </Typography>
          </Box>

          {/* Right: Buttons */}
          <Stack direction="row" spacing={1}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      ))}
      <Box>
    {selectedSpot && (
  <Box>
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>{selectedSpot.place} - Full Description</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {selectedSpot.detailDesc}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
)}

    </Box>
</Box>
    
  


  );
};

export default ListSpot;
