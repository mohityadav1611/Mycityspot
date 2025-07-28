import { Box, Typography, TextField, Select, MenuItem,Autocomplete, InputLabel, FormControl, Button,}
 from "@mui/material";
 

 function AuthorForm() {
        const [authorName, setAuthorName] = useState("");
        const [authorError, setAuthorError] = useState("");
        const [place, setPlace] = useState("");
        const [placeError, setPlaceError] = useState("");
        const [city, setCity] = useState("");
        const [cityError, setCityError] = useState("");

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu"
];

        const [state, setState] = useState<string>("");
        const [stateError, setStateError] = useState("");

        const [spotType, setSpotType] = useState("");
        const [spotTypeError, setSpotTypeError] = useState("");

        const [image, setImage] = useState<File | null>(null);
        const [imageError, setImageError] = useState("");

        const [shortDesc, setShortDesc] = useState("");
        const [shortDescError, setShortDescError] = useState("");

        const [detailDesc, setDetailDesc] = useState("");
        const [detailDescError, setDetailDescError] = useState("");
       
       // State variables for form fields
       const handleName=()=>{
if (authorName.trim() === "") {
    setAuthorError("Author name is required.");
    
  } else if (authorName.length < 3) {
    setAuthorError("At least 3 characters required.");
    
  } else {
    setAuthorError("");
  }};

  const handlePlace = () => {
  if (place.trim() === "") {
    setPlaceError("Place is required.");
  } else if (place.length < 3) {
    setPlaceError("At least 3 characters required.");
  } else {
    setPlaceError("");
  }
};


// Submit handler
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  let isValid = true;

  // Author Name
  

  // Place
  if (place.trim() === "") {
    setPlaceError("Place is required.");
    isValid = false;
  } else if (place.length < 3) {
    setPlaceError("At least 3 characters required.");
    isValid = false;
  } else {
    setPlaceError("");
  }

  // City
  if (city.trim() === "") {
    setCityError("City is required.");
    isValid = false;
  } else {
    setCityError("");
  }

  // State
  if (state === "") {
    setStateError("Please select a state.");
    isValid = false;
  } else {
    setStateError("");
  }

  // Spot Type
  if (spotType.trim() === "") {
    setSpotTypeError("Spot type is required.");
    isValid = false;
  } else {
    setSpotTypeError("");
  }

  // Image
  if (!image) {
    setImageError("Please upload an image.");
    isValid = false;
  } else {
    setImageError("");
  }

  // Short Description
  if (shortDesc.trim() === "") {
    setShortDescError("Short description is required.");
    isValid = false;
  } else if (shortDesc.length < 10) {
    setShortDescError("At least 10 characters required.");
    isValid = false;
  } else {
    setShortDescError("");
  }

  // Detail Description
  if (detailDesc.trim() === "") {
    setDetailDescError("Detail description is required.");
    isValid = false;
  } else if (detailDesc.length < 20) {
    setDetailDescError("At least 20 characters required.");
    isValid = false;
  } else {
    setDetailDescError("");
  }

  // ✅ If all validations pass
  if (isValid) {
    const formData = {
      authorName,
      place,
      city,
      state,
      spotType,
      imageName: image?.name,
      shortDesc,
      detailDesc,
    };

    console.log("📦 Form submitted successfully:", formData);
    alert("Form submitted successfully!");

    // Reset form
    setAuthorName("");
    setPlace("");
    setCity("");
    setState("");
    setSpotType("");
    setImage(null);
    setShortDesc("");
    setDetailDesc("");
  }
};



  return (
    <form onSubmit={handleSubmit}>
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      {/* Author Profile */}
      <Box
        sx={{ bgcolor: "background.paper", p: 3, mb: 4, borderRadius: 2, boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Author Profile
        </Typography>
        <TextField value={authorName} onChange={(e)=>setAuthorName(e.target.value)}  error={!!authorError}
          helperText={authorError} onBlur={handleName}
          fullWidth id="authorName" label="✍️ Enter Your Name" placeholder="Contributor name"
          margin="normal"
        />
      
      {/* Place Info */}
              
        <TextField value={place} onChange={(e)=>setPlace(e.target.value)}  error={!!placeError}
          helperText={placeError} onBlur={handlePlace}
          fullWidth
          required
          id="Place"
          label="📍 Place Name"
          placeholder="Enter a famous place"
          margin="normal"
        />

        {/* City & State */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <TextField value={city} onChange={(e)=>setCity(e.target.value)}  error={!!cityError}
          helperText={cityError}
            fullWidth
            required
            id="City"
            label="🏙️ City"
            placeholder="Enter city name"
            margin="normal"
          />
        

        <Autocomplete
        fullWidth
        options={indianStates}
        value={state}
        onChange={(_, newValue) => {
            const selectedState = newValue || "";
            setState(selectedState);

            if (!selectedState) {
            setStateError("State is required");
            } else {
            setStateError("");
            }
        }}
        renderInput={(params) => (
            <TextField
            {...params}
            label="🌍 State"
            margin="normal"
            error={!!stateError}
            helperText={stateError}
            />
        )}
        />
        </Box>

        {/* Spot Type */}
        <FormControl fullWidth margin="normal" >
          <InputLabel id="spot-type-label">📌 Type of Spot</InputLabel>
          <Select labelId="spot-type-label" id="spotType" label="📌 Type of Spot" error={!!spotTypeError}
          >
            <MenuItem value="">-- Select Type --</MenuItem>
            <MenuItem value="Temple">Temple</MenuItem>
            <MenuItem value="Nature">Nature</MenuItem>
            <MenuItem value="Historical">Historical</MenuItem>
            <MenuItem value="Lake">Lake</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <TextField helperText={spotTypeError}></TextField>
        </FormControl>

        {/* Image Upload */}
        <TextField error={!!imageError} helperText={imageError}
          fullWidth
          required
          type="file"
          id="imageUrl"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Short Description */}
        <TextField error={!!shortDescError} helperText={shortDescError}
          fullWidth
          required
          id="Short"
          label="✏️ Short Description"
          placeholder="One-line overview"
          margin="normal"
        />

        {/* Detailed Description */}
        <TextField  error={!!detailDescError} helperText={detailDescError}
          fullWidth
          required
          id="Detail"
          label="📖 Detailed Description"
          placeholder="Write full description here..."
          multiline
          rows={5}
          margin="normal"
        />

        {/* Submit */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            ✅ Submit Spot
          </Button>
        </Box>
      </Box>
    </Box>
    </form>
  );
}
import { useState } from "react";
export default AuthorForm