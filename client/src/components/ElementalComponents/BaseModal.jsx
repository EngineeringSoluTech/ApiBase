import * as React from 'react';
import axios from 'axios';
import { Fragment, useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@mui/material';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import PetsIcon from '@mui/icons-material/Pets';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2' 

import SwipeableTextMobileStepper from '../../components/ElementalComponents/StepperImage'


const flexcomponent = {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
} 

export default function BaseModal({ isOpen, onClose, indexProduct , productObject}) {
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        const imageModalHeight= screenWidth<600? "45%": "58%" ;
return(
<Grid container style={flexcomponent} spacing={2}>
 <Modal open={isOpen} onClose={onClose}>
  <Box
   sx={{
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%) scale(1.5)',
     width: "auto",
     height:imageModalHeight,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 20,
     borderRadius:3,
     p: 0,
     mt:0,
     overflow:"hidden"
    }}
   >   
   {!productObject || !indexProduct && indexProduct != 0? 
   <>
   </>
   :
   <SwipeableTextMobileStepper productArray={productObject[indexProduct]}/>
   }
  </Box>
 </Modal>
</Grid>
 )
}

