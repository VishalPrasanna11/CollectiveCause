import React from 'react';
import { Box, Typography, Button, Container, Grid, ThemeProvider } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink as RouterNavLink } from 'react-router-dom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { MyTheme } from '../themes/theme1';

// Assuming images are imported and available
import Image1 from "../assets/pexels-kokorevas-11319521.jpg";
import Image2 from "../assets/pexels-julia-m-cameron-6994982.jpg";
import Image3 from "../assets/pexels-rdne-6646967.jpg";
import Image5 from "../assets/to-offer-427297_1280.jpg";

const Home = () => {
    const carouselItems = [
        { imgSrc: Image1, title: 'Donate', description: 'Raise funds online for medical emergencies and social causes' },
        { imgSrc: Image2, title: 'Fundraise', description: 'Collective Cause app - fundraise and donate seamlessly!' },
        { imgSrc: Image3, title: 'Help', description: 'Our crowdfunding platform charges NO fees' },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <ArrowForwardIosIcon style={{ color: 'white', fontSize: '30px' }} />,
        prevArrow: <ArrowBackIosNewIcon style={{ color: 'white', fontSize: '30px' }} />,
    };

    return (
        <ThemeProvider theme={MyTheme}>
            {/* <Box sx={{ flexGrow: 1 }}>
                <Slider {...settings}>
                    {carouselItems.map((item, idx) => (
                        <Box key={idx} sx={{
                            position: 'relative',
                            height: 500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundImage: `url(${item.imgSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            <Box sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '20px',
                                borderRadius: '10px',
                                textAlign: 'center',
                                marginTop:"23%"
                            }}>
                                <Typography variant="h4" sx={{ color: 'white' }}>{item.title}</Typography>
                                <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>{item.description}</Typography>
                                <Button
                                    component={RouterNavLink}
                                    to="/donations"
                                    variant="contained"
                                    color="primary"
                                    sx={{ borderRadius: '20px', textTransform: 'none' }}
                                >
                                    Donate
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Slider>
            </Box> */}
            <Container maxWidth="lg" sx={{bgcolor:"white",marginTop:"30px"}}>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" color="textPrimary" gutterBottom>
                            Discover how CollectiveCause facilitates individuals to raise funds.
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            "Those who dare to believe they can make a difference, often do."
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 3 }}>
                            Be a responsible part in the mission to enlighten every single idea to bring more light into this world.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                            <img src={Image5} alt="main_image" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
