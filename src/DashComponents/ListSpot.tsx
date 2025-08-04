import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
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

interface ListSpotProps {
  spots: Spot[];
  onEdit: (spot: Spot) => void;
}

const ListSpot = ({ spots, onEdit }: ListSpotProps) => {
  const [userSpots, setUserSpots] = useState<Spot[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  useEffect(() => {
    const storedData = localStorage.getItem("userSpot");
    if (storedData) {
      setUserSpots(JSON.parse(storedData));
    }
  }, []);

  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (deleteIndex === null) return;

    const updatedSpots = userSpots.filter((_, index) => index !== deleteIndex);
    setUserSpots(updatedSpots);
    localStorage.setItem("userSpot", JSON.stringify(updatedSpots));

    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleReadMore = (spot: Spot) => {
    setSelectedSpot(spot);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSpot(null);
  };

  const theme=useTheme();
  
  return (
    <Box sx={{ p: 2 }}>
      {/* <Typography variant="h5" gutterBottom>
        List View
      </Typography> */}

      {spots.map((spot, index) => {
        const canDelete = loggedInUser.fullname === spot.authorName;

        return (
          <Paper
            key={index}
            elevation={5}
            sx={{
              boxShadow: '4px 4px 20px rgba(0, 123, 255, 0.3)',
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { sm: "center" },
              p: 2,
              mb: 2,borderRadius: 2,backgroundColor:theme.palette.mode === 'light' ?"white":"#1F2937",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: 6,
                },
            }}
          >
            {/* Left: Image */}
            <Avatar
              variant="rounded"
              src={spot.image}
              alt={spot.place}
              sx={{  width: { xs: "100%", sm: 220 },
              height: 150,
              objectFit: "cover", }}
            />

            {/* Middle: Text info */}
            <Box sx={{ flex: 1, ml: { xs: 0, sm: 4 }, mt: { xs: 2, sm: 0 }}}>
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

              <Typography
                onClick={() => handleReadMore(spot)}
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
            <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, sm: 0 },
                alignSelf: { xs: "flex-end", sm: "center" },
                justifyContent: { xs: "flex-end", sm: "initial" },}}>
               {spot.authorName === loggedInUser.fullname && (
              <IconButton color="primary"
              onClick={() => onEdit(spot)}>
                <EditIcon />
              </IconButton>)}

              <IconButton
                onClick={() => canDelete && confirmDelete(index)}
                color={canDelete ? "error" : "default"}
                disabled={!canDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Paper>
        );
      })}

      {/* Read More Dialog */}
      {selectedSpot && (
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedSpot.place} - Full Description</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>{selectedSpot.detailDesc}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this spot?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListSpot;
