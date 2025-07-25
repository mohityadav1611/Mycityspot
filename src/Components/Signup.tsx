import { Box,Paper, TextField,Typography,Button,Container,Input } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

    const[fullname, setFullname]=useState("")
    const[nameError, setnameError]=useState("")
    const [email, setEmail]=useState("")
    const [emailError, setEmailError]=useState("")
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);




    const handlefullname=()=>{
         if (fullname.trim() === "") {
             setnameError("Full name is required.");
            } 
            else if (fullname.trim().length < 3) {
            setnameError("Full name must be at least 3 characters.");
            } 
            else {
            setnameError(""); // Clear error
            }
    }

    const handleEmail=()=>{
        if(email.trim()===""){
            setEmailError("Email is required.")
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
             {
                setEmailError("Please enter a valid email address.");
            }
        else{
            setEmailError("")
        }
    }

    const handlePassword = () => {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password.trim() === "") {
            setPasswordError("Password is required.");
        } else if (!strongPasswordRegex.test(password)) {
            setPasswordError("Password must contain at least 6 characters, including uppercase, lowercase, number, and special character.");
        } else {
            setPasswordError("");
        }
        };

        const handleConfirmPassword = () => {
        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Confirm Password is required.");
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError("");
        }
        };

        const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
        };

        const navigate = useNavigate();

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

  // ✅ Step 1: Safely fetch and parse existing data
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

  // ✅ Step 2: Check for duplicate email
  const compare = check.some(
    (user: { email: string }) => user.email === email.trim()
  );

  if (compare) {
    setEmailError("Email already registered");
    return;
  }

  // ✅ Step 3: Store the new user
  const userData = {
    fullname,
    email,
    password,
    photo,
    islogin:false
  };

  check.push(userData); // reuse the same `check` array
  localStorage.setItem("userData", JSON.stringify(check));

  alert("Signup successful!");
  console.log("user Data", check);
  navigate("/login");
};




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
             width:"80%",
              maxWidth: 900, 
              mx: "auto" ,
              height:{xs:"100%", lg:"auto",md:"auto"},
            
         }}>
        
          <Typography variant="h6" sx={{ mb: 3,fontWeight: "bold",
            color: "primary.main", m:{xs:1,lg:0} }}>
            Sign Up to MyCitySpot.
          </Typography>    

      <Box
      component="form" onSubmit={handleSubmit}
      sx={{ '& > :not(style)': { m: 2, width: '30ch' },
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        gap:1,
         justifyContent: "center",
        alignItems: "center", }}
      noValidate
      autoComplete="off"
    >
        {/* fullname */}
      <TextField required onChange={(e)=> setFullname(e.target.value)} value={fullname} 
      onBlur={handlefullname} error={Boolean(nameError)} helperText={nameError}
      id="fullname" type="text" label="Full Name" variant="outlined" autoFocus/>

      {/* email */}
      <TextField required onChange={(e)=>setEmail(e.target.value)} value={email}
      onBlur={handleEmail} error={Boolean(emailError)} helperText={emailError}
      id="email" type="email" label="Email" variant="outlined" />
      {/* password */}
      <TextField required value={password} onChange={(e) => setPassword(e.target.value)}
      onBlur={handlePassword} error={Boolean(passwordError)} helperText={passwordError}
      id="pswd" type="password" label="Password" variant="outlined" />

      {/* Confirm Password */}
      <TextField required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
      onBlur={handleConfirmPassword} error={Boolean(confirmPasswordError)}   helperText={confirmPasswordError} 
      id="cpswd" type="password" label="Confirm Password" variant="outlined" />

      {/* image */}
      <Button variant="contained" component="label" color="primary" 
      sx={{
            
            width: { xs: "100%", sm: "200px" },
            py: 1.2,
            fontWeight: 600,
            fontSize: "1rem",
            textAlign:"center"
          }}>
        Upload Photo
    <input type="file" hidden accept="image/*" onChange={handlePhotoChange}
    />
        </Button> 
        
          <Button variant="contained" type="submit" color="primary" 
          sx={{
            width: { xs: "100%", sm: "200px" },
            py: 1.2,
            fontWeight: 600,
            fontSize: "1rem",
            textAlign:"center"
          }}>
          Sign Up
          </Button>
         </Box>
         
         <Typography sx={{ mt: 1,mb:1 }}>Already have an account? 
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login
            </Link>
          </Typography>
            </Paper>
      
    {/* </Box> */}
    </Container>
  )
}

export default SignUp
