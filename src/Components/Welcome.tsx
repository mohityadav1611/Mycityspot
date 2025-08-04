import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                        backgroundColor: 'rgba(0,0,0,0.4)',  // Dark overlay for better text visibility
                    }
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: '#ffffff',
                    px: { xs: 3, sm: 6 },
                    maxWidth: 600,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: '2rem', sm: '2.5rem', md: 'rem' },
                    }}
                >
                    Welcome to MyCitySpot
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: { xs: 3, sm: 4 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        fontWeight: 500,
                        color: '#e0e0e0',
                    }}
                >
                    Explore your city like never before — Discover places, events, and hidden gems right near you.
                </Typography>

                <Button
                    onClick={handleLoginClick}
                    variant="contained"
                    color="primary"
                    sx={{
                        width: { xs: '100%', sm: '200px' },
                        py: 1.2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: '30px',
                        transition: 'all 0.3s ease',
                        "&:hover": {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    Explore Now
                </Button>
            </Box>
        </Container>
    );
};

export default Welcome;
