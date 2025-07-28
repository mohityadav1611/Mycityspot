import { Box,Paper, TextField,Typography,Button,Container } from "@mui/material"
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");

  const navigate = useNavigate()
  

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
    navigate("/dashboard");
  } else {
    setError("Invalid email or password.");
  }
};


  

    const handleSignupClick =()=>{
        navigate("/signup");
    }


  return (
    <Container maxWidth={false}
  sx={{
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    // backgroundColor:"skyblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  
    gap:2,
    }}>
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
      zIndex: 0
    }}
  />
     
      <Paper elevation={8}
      sx={{
            boxShadow: '0px 4px 30px rgba(43, 22, 235, 0.3)',
            position:"relative",
            zIndex:1,
            backgroundColor: "rgba(255, 255, 255, 0.32)"  ,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
             padding: 4,
              maxWidth: 400, 
              mx: "auto" 
         }}>
        
          <Typography variant="h6" sx={{ mb: 3,fontWeight: "bold",
            color: "primary.main", }}>
            Please Login....
          </Typography>
        

      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 2, width: '30ch' },
        display:"flex",
        flexDirection:"column",
        gap:1,
         justifyContent: "center",
        alignItems: "center", }}
      noValidate
      autoComplete="off"
    >
      {/* email */}
      <TextField required id="email" type="email" label="Email" variant="outlined" autoFocus
                  value={email} onChange={(e) => setEmail(e.target.value)}/>
      <TextField 
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
           value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(error)} helperText={error}
        />
    </Box>
        <Box sx={{m:2}}>
          <Button onClick={handleLogin} variant="contained" 
          
          type="submit" color="primary" sx={{
            width: { xs: "100%", sm: "200px" },
            py: 1.2,
            fontWeight: 600,
            fontSize: "1rem",
          }}>
          Login
          </Button>
         </Box>
         <Typography sx={{ mt: 1,mb:1 }}>Don't have an account?{" "}
            <Link to="/signup" onClick={handleSignupClick} style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign up
            </Link>
          </Typography>
            </Paper>
      
    
    </Container>
  )
}

export default Login
