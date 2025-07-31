import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh",
  "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu"
];

function AuthorForm() {
  const [authorName, setAuthorName] = useState("");
  // const [authorError, setAuthorError] = useState("");
  const [place, setPlace] = useState("");
  const [placeError, setPlaceError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [spotType, setSpotType] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [shortDesc, setShortDesc] = useState("");
  const [detailDesc, setDetailDesc] = useState("");
  const navigate = useNavigate();

  const userloggedIn = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    useEffect(() => {
      setAuthorName(userloggedIn.fullname || "");
    }, []);


  // const handleName = () => {
  //   if (authorName.trim() === "") {
  //     setAuthorError("Author name is required.");
  //   } else if (authorName.length < 3) {
  //     setAuthorError("At least 3 characters required.");
  //   } else {
  //     setAuthorError("");
  //   }
  // };

  const handlePlace = () => {
    if (place.trim() === "") {
      setPlaceError("Place is required.");
    } else if (place.length < 3) {
      setPlaceError("At least 3 characters required.");
    } else {
      setPlaceError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation flags
    let isValid = true;

    // if (authorName.trim() === "") {
    //   setAuthorError("Author name is required.");
    //   isValid = false;
    // }

    if (place.trim() === "") {
      setPlaceError("Place is required.");
      isValid = false;
    }

    if (city.trim() === "") {
      setCityError("City is required.");
      isValid = false;
    } else {
      setCityError("");
    }

    if (state === "") {
      setStateError("Please select a state.");
      isValid = false;
    } else {
      setStateError("");
    }

    if (!image) {
      alert("Please upload an image.");
      isValid = false;
    }

    if (shortDesc.trim() === "") {
      alert("Short description is required.");
      isValid = false;
    }

    if (detailDesc.trim().length < 20) {
      alert("Detailed description must be at least 20 characters.");
      isValid = false;
    }

    if (isValid && image) {
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Image = reader.result as string;

    const formData = {
      authorName,
      place,
      city,
      state,
      spotType,
      image: base64Image, // ✅ converted image
      shortDesc,
      detailDesc,
    };

        const oldData = localStorage.getItem("userSpot");
    const dataArray = oldData ? JSON.parse(oldData) : [];
    dataArray.unshift(formData);
    localStorage.setItem("userSpot", JSON.stringify(dataArray));

    alert("Spot submitted successfully!");
    navigate("/dashboard");

    // Reset
    setAuthorName("");
    setPlace("");
    setCity("");
    setState("");
    setSpotType("");
    setImage(null);
    setShortDesc("");
    setDetailDesc("");
  };

  reader.readAsDataURL(image); // ✅ Convert image to Base64
}}


  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Box
        sx={{ bgcolor: "background.paper", p: 3, mb: 4, borderRadius: 2, boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Author Profile
        </Typography>

                  <TextField
            fullWidth
            label="✍️ Author Name"
            value={authorName} // ✅ Correct way
            InputProps={{ readOnly: true }} // ✅ Use this instead of slotProps
            margin="normal"
            // error={!!authorError}
            // helperText={authorError}
          />


        <TextField
          fullWidth
          label="📍 Place Name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onBlur={handlePlace}
          error={!!placeError}
          helperText={placeError}
          margin="normal"
        />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <TextField
            fullWidth
            label="🏙️ City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={!!cityError}
            helperText={cityError}
            margin="normal"
          />

          <Autocomplete
            fullWidth
            options={indianStates}
            value={state}
            onChange={(_, val) => {
              setState(val || "");
              setStateError(val ? "" : "State is required");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="🌍 State"
                error={!!stateError}
                helperText={stateError}
                margin="normal"
              />
            )}
          />
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="spot-type-label">📌 Type of Spot</InputLabel>
          <Select
            labelId="spot-type-label"
            value={spotType}
            onChange={(e) => setSpotType(e.target.value)}
            label="📌 Type of Spot"
          >
            {["Temple", "Nature", "Historical", "Lake", "Food", "Other"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField required
        fullWidth
        type="file"
        onChange={(e) =>
          setImage((e.target as HTMLInputElement).files?.[0] || null)
        }
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />


        <TextField
          fullWidth
          label="✏️ Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="📖 Detailed Description"
          multiline
          rows={5}
          value={detailDesc}
          onChange={(e) => setDetailDesc(e.target.value)}
          margin="normal"
        />

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button type="submit" variant="contained" size="large">
            ✅ Submit Spot
          </Button>
        </Box>
      </Box>
    </Box></form>
  );
}

export default AuthorForm;
