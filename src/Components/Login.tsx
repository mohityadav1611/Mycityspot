import { Box, Paper, TextField, Typography, Button, Container, useTheme } from "@mui/material";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  setEmail("");
  setPassword("");
  setError("");
}, []);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const loginData = localStorage.getItem("userData");
    const users = loginData ? JSON.parse(loginData) : [];

    const user = users.find(
      (user: { email: string; password: string }) =>
        email === user.email && password === user.password
    );

    if (user) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
            setEmail("");
      setPassword("");
      navigate("/dashboard");

    } else {
      setError("Invalid email or password.");
    }
  };
  const theme= useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/Nature2.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          zIndex: 0,
          "&::after": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',  // Dark overlay
          }
        }}
      />

      {/* Login Form */}
      <Paper 
        elevation={10}
        sx={{
          position: 'relative',
          zIndex: 1,
          
          backgroundColor: isDarkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.32)",
          backdropFilter: 'blur(8px)',
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 6 },
          width: { xs: '90%', sm: '400px' },
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0px 4px 30px rgba(43, 22, 235, 0.3)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontWeight: 'bold',
             color: isDarkMode ? "#FFFFFF" : "primary.main",
          }}
        >
          Please Login...
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            required
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{
              py: 1.2,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: '30px',
              transition: 'transform 0.3s ease',
              "&:hover": {
                transform: 'scale(1.05)',
              },
            }}
          >
            Login
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#1976d2", textDecoration: "none", fontWeight: 'bold' }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
