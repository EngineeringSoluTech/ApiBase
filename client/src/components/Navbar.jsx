import React, { Fragment, useState, useEffect} from 'react'
import { grey } from '@mui/material/colors';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';

import walking from '/images/gif/walking.gif'


import {
    AppBar,
    Grid,
    Typography,
    Tab,
    Tabs,
    Box,
} from '@mui/material'

const styleList = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

const componentFlex = {
   display : "flex",
   alignItems : "center",
   justifyContent: "center",
   width: "100%",
}

const componentFlexMenu = {
   display : "flex",
   alignItems : "center",
   justifyContent: "center",
   width: "100%",
   backgroundColor: 'rgba(174,182,191, 0.05)'
}

const Navbar = (props) => {
    
    const [value, setValue] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    const handleMenuToggle = () => {
        setMenuOpen(prev => !prev);
    };

    let direccion = window.location;
    let ruta = (direccion.pathname).toString().replace(/\/+/g, '').replace(/\s+/g, '');

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
          };
      
          window.addEventListener('resize', handleResize);
      
          // Limpiar el event listener al desmontar el componente
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
      
        const setSmallWidth = screenWidth < 600 ? true : false;
        //const colorWidth = screenWidth < 600 ? 'rgba(219,230,238,0.5)' : 'ButtonShadow';

    return (
<Fragment>
    <CssBaseline/>
            <AppBar style={{color:"white", backgroundColor:"#273c75", padding: 10, boxShadow:"none"}}>
                {setSmallWidth ? 
                     <Grid item xs={12} sm={3} md={2} style={componentFlex}>  
                      <Hidden smUp>
                        <Grid item xs={1} style={componentFlex}>
                            <IconButton onClick={handleMenuToggle}>
                                <MenuIcon sx={{border:"none", color:"white"}}/>
                            </IconButton>
                        </Grid>
                      </Hidden>

                      <Grid item xs={11} style={componentFlex}>
                        <Typography style={{fontSize:"20px"}}>
                            <strong>PeluditosTrendy</strong>
                        </Typography>
                        <Typography >
                          <img src="logo" class="rounded" alt=""/>
                        </Typography>
                      </Grid>
                     </Grid>
                     :
                    <Grid container style={{alignItems:"Center"}}>
                      <Grid item xs={12} sm={3} md={2} style={componentFlex}>  
                        <Hidden smUp>
                          <Grid item xs={1} style={componentFlex}>
                              <IconButton onClick={handleMenuToggle}>
                                 <MenuIcon sx={{border:"none", color:"white"}}/>
                              </IconButton>
                          </Grid>
                        </Hidden>
                        <Grid item xs={11} sm={12} xl={12} style={componentFlex}>
                          <Typography style={{fontSize:"20px"}}>
                            <strong>PeluditosTrendy</strong>
                          </Typography>
                          <Typography sx={{marginLeft:1}}>
                            <img src={walking} alt='walking' style={{width:35}}/>
                          </Typography>
                        </Grid>
                       </Grid>
                        <Grid item sm={12} md={8} style={componentFlex}>
                            <Tabs
                                value={value !== undefined ? value : 1}
                                onChange={(e,val) => setValue(val)}
                                textColor="inherit"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value={0} href='/inicio' label="INICIO" />
                                <Tab value={1} href='/productos' label="PRODUCTOS" />
                                <Tab value={2} href='/' label="QUIENES SOMOS" />
                                <Tab value={3} href='/' label="CONTACTANOS" />
                            </Tabs>
                        </Grid>

                        <Grid item sm={12} md={2} style={{display: 'flex', alignItems:"center", justifyContent:"center"}}>
                            <Box>
                                <Typography style={{fontSize: 35, color:"whitesmoke", fontFamily:'-apple-system'}}> 
                                    Bienvenido
                                </Typography>
                            </Box>
                        </Grid>
                      </Grid>
                    } 
            </AppBar>

            {/* Menú desplegable para dispositivos móviles */}
            <Hidden smUp>
                <Drawer 
                   anchor="right" 
                   open={menuOpen} 
                   onClose={handleMenuToggle} 
                   style={componentFlexMenu}
                   PaperProps={{ 
                       style: { 
                           backgroundColor: 'rgba(31,97,141,0.7)' ,
                           height:"auto"
                       } 
                   }}
                   >
                    <List
                        sx={styleList}
                        omponent="nav" 
                        aria-label="mailbox folders"
                        value={value}
                        onChange={(e, val) => setValue(val)}
                        textColor="inherit"
                        indicatorColor="secondary"
                        orientation="vertical"
                    >
                      <ListItem 
                        disablePadding
                        style={value === 1 ? {backgroundColor: 'rgba(0, 0, 0, 0.1)', color:"white"} : {}}
                      >
                        <ListItemButton href="inicio">
                         <ListItemIcon>
                           <HomeIcon />
                         </ListItemIcon>
                           <ListItemText primary="INICIO" />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton href="productos">
                         <ListItemIcon>
                           <ShoppingCartIcon />
                         </ListItemIcon>
                           <ListItemText primary="PRODUCTOS" />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton href="#">
                         <ListItemIcon>
                           <SentimentVerySatisfiedIcon />
                         </ListItemIcon>
                           <ListItemText primary="QUIENES SOMOS" />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton href="#">
                         <ListItemIcon>
                           <ContactPhoneIcon />
                         </ListItemIcon>
                           <ListItemText primary="CONTACTANOS" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                </Drawer>
            </Hidden>

        </Fragment>
    )
}

export default Navbar
