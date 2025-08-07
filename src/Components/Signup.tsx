import { Box, Paper, TextField, Typography, Button, Container, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {IconButton, InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [nameError, setnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [photo, setPhoto] = useState<string | null>(null); // BASE64 string here!

  const navigate = useNavigate();

  const handlefullname = () => {
    if (fullname.trim() === "") {
      setnameError("Full name is required.");
    } else if (fullname.trim().length < 3) {
      setnameError("Full name must be at least 3 characters.");
    } else {
      setnameError("");
    }
  };

  const handleEmail = () => {
    if (email.trim() === "") {
      setEmailError("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };



  const handlePassword = () => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      setShowPassword(false);
    if (password.trim() === "") {
      setPasswordError("Password is required.");
    } else if (!strongPasswordRegex.test(password)) {
      setPasswordError("Password must contain at least 6 characters, including uppercase, lowercase, number, and special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(false);
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required.");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string); // Base64 string set here!
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Re-run validations
    handlefullname();
    handleEmail();
    handlePassword();
    handleConfirmPassword();

    if (!fullname || !email || !password || !confirmPassword) {
      alert("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const checkEmail = localStorage.getItem("userData");
    let check: any[] = [];

    try {
      check = checkEmail ? JSON.parse(checkEmail) : [];
      if (!Array.isArray(check)) {
        check = [];
      }
    } catch (err) {
      console.error("Error parsing userData from localStorage:", err);
      check = [];
    }

    const compare = check.some((user: { email: string }) => user.email === email.trim());

    if (compare) {
      setEmailError("Email already registered");
      return;
    }

    // Store the new user with Base64 Photo
    const userData = {
      fullname,
      email,
      password,
      photo,  // Base64 string saved here!
      islogin: false,
    };

    check.push(userData);
    localStorage.setItem("userData", JSON.stringify(check));

    alert("Signup successful!");
    navigate("/login");
  };

  const theme= useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container
      maxWidth={false}
      sx={{
        width: '100vw',
        height: '100vh',
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/Nature2.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: 0,
        }}
      />

      <Paper
        elevation={8}
        sx={{
          boxShadow: '0px 4px 30px rgba(43, 22, 235, 0.3)',
          position: "relative",
          zIndex: 1,
          backgroundColor: isDarkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.32)",  // << changed here
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          width: "80%",
          maxWidth: 900,
          mx: "auto",
          height: { xs: "100%", lg: "auto", md: "auto" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: isDarkMode ? "#FFFFFF" : "primary.main",  // << dynamic color
          }}
        >
          Sign Up to MyCitySpot.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 2, width: '30ch' },
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            onBlur={handlefullname}
            error={Boolean(nameError)}
            helperText={nameError}
            id="fullname"
            type="text"
            label="Full Name"
            variant="outlined"
            InputProps={{
              style: { color: isDarkMode ? "#FFFFFF" : "" },  // << text color dark mode
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#FFFFFF" : "" },  // << label color dark mode
            }}
          />

          <TextField
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={handleEmail}
            error={Boolean(emailError)}
            helperText={emailError}
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            InputProps={{
              style: { color: isDarkMode ? "#FFFFFF" : "" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#FFFFFF" : "" },
            }}
          />

          <TextField
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onBlur={handlePassword}
  error={Boolean(passwordError)}
  helperText={passwordError}
  id="pswd"
  type={showPassword ? "text" : "password"}
  label="Password"
  variant="outlined"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    style: { color: isDarkMode ? "#FFFFFF" : "" },
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#FFFFFF" : "" },
  }}
/>

<TextField
  required
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  onBlur={handleConfirmPassword}
  error={Boolean(confirmPasswordError)}
  helperText={confirmPasswordError}
  id="cpswd"
  type={showConfirmPassword ? "text" : "password"}
  label="Confirm Password"
  variant="outlined"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          edge="end"
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
    style: { color: isDarkMode ? "#FFFFFF" : "" },
  }}
  InputLabelProps={{
    style: { color: isDarkMode ? "#FFFFFF" : "" },
  }}
/>

          <Button
            variant="contained"
            component="label"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "200px" },
              py: 1.2,
              fontWeight: 600,
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Upload Photo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </Button>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "200px" },
              py: 1.2,
              fontWeight: 600,
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography sx={{ mt: 1, mb: 1, color: isDarkMode ? "#FFFFFF" : "" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: isDarkMode ? "#90CAF9" : "#1976d2",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUp;