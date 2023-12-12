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
import { createTheme} from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Divider from '@mui/material/Divider';

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
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import {TextField} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2' 

//* modulos
import ModalShoppingCar from '../../components/ElementalComponents/ModalShoppingCar'
import ModalAddProduct from '../../components/ElementalComponents/ModalAddProduct'
import SwipeableTextMobileStepper from '../../components/ElementalComponents/StepperImage'
import Footer from '../../components/ElementalComponents/Footer/Footer';
import BaseModal from '../../components/ElementalComponents/BaseModal';
import InsertVideoCode from '../../components/ElementalComponents/InsertCodeVideoModal';
import FixedBottomComentaries from '../../components/ElementalComponents/CommentariesComponent'


import configuraciones from '../../config'
const BASE_API_BACKEND_HOST = configuraciones.BASE_API_BACKEND_HOST;

//~~ **** IMAGENES ****
  import wtfcat from '/images/gif/wtfcat.gif'
  import funnycat from '/images/gif/funnycat.gif'
//~~ ******************

const ArraySizes = [
  {value: 'S'},
  {value: 'M'},
  {value: 'L'},
  {value: 'XS'},
  {value: 'XL'},
  {value: 'XXS'},
  {value: 'XXL'},
  {value: 'UNO'},
  {value: 'XXXL'},
];

const flexcomponent = {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
} 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(10),
    width: '60%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
  },
}));

const theme = createTheme();

const actions = [
  { icon: <AddIcon />, name: 'crear Producto'},
  { icon: <VideoSettingsIcon />, name: 'Update Video' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
 ];

export default function Album() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const [favorite, setFavorite] = useState(false)
  const [openModalCreateProduct, setOpenModalCreateProduct] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalInsertVideoOpen, setModalInsertVideoOpen] = useState(false);
  const [isBaseModalOpen, setBaseModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [dataGetProduct, setDataGetProduct] = useState([]);
  const [dataGetUser, setDataGetUser] =useState(null)
  const [dataGetVideo, setDataGetVideo] =useState(null)
  const [loggedUser, setLoggedUser] =useState(null)
  const [receivedCode, setReceivedCode] = useState('');
  const [elevation, setElevation] = useState(8); 
  const [scalingCard, setscalingCard] = useState(null);

  const [CreateProductValues, setCreateProductValues] = useState({
    productName: "",
    reference: "",
    photo : "",
    quantityStock: 1,
    sizes : [],
    size :'',
    description:"",
    price:1,
    typeOfCurrency:""
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const classesSpeedDial = useStyles();

console.log("dataGetVideo", dataGetVideo);
console.log("dataGetProduct", dataGetProduct);
const tokenManual = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE2NDA0ZjcyZDQ0ZWJhNzY1ZjQxMDgiLCJlbWFpbCI6InBlbHVkaXRvc3RyZW5keWRldmVsb3AyMDIzQGdtYWlsLmNvbSIsImZpc3J0TmFtZSI6Im1hcmxvbiB5b2VsIiwibGFzdE5hbWUiOiJlc3RlYmFuIHZhbGVuY2lhIiwicm9sIjoiYWRtaW4iLCJ1c2VyU3RhdGUiOnRydWUsImxhc3RDb25uZWN0aW9uIjpbIlRodSBTZXAgMjggMjAyMyAyMjoxMzoxMyBHTVQtMDUwMCAoaG9yYSBlc3TDoW5kYXIgZGUgQ29sb21iaWEpIiwiRnJpIFNlcCAyOSAyMDIzIDIyOjAzOjU2IEdNVC0wNTAwIChob3JhIGVzdMOhbmRhciBkZSBDb2xvbWJpYSkiLCJTdW4gT2N0IDAxIDIwMjMgMDA6MTY6MjAgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDEgMjAyMyAwMDoxNjo1OSBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwMSAyMDIzIDAwOjIxOjAwIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDAxIDIwMjMgMDA6MzI6MTAgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDEgMjAyMyAwMDozMzoxOSBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwMSAyMDIzIDEwOjA5OjQ1IEdNVC0wNTAwIChob3JhIGVzdMOhbmRhciBkZSBDb2xvbWJpYSkiLCJTdW4gT2N0IDAxIDIwMjMgMTA6MTE6MjggR01ULTA1MDAgKGhvcmEgZXN0w6FuZGFyIGRlIENvbG9tYmlhKSIsIlN1biBPY3QgMDggMjAyMyAxODoyOToxNiBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE4OjQwOjU2IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTg6NDA6NTggR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxODo0MToxNiBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE4OjQ0OjU3IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTg6NDY6MjEgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxODo0ODozMyBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE4OjUwOjMwIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTg6NTA6NTYgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxODo1NjoyNSBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE4OjU2OjMzIEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTk6MDE6MTEgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxOToxMjoxNCBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE5OjEyOjE2IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTk6MTM6MzMgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxOToxMzo0NiBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE5OjEzOjQ4IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiLCJTdW4gT2N0IDA4IDIwMjMgMTk6MTQ6MzAgR01UKzAwMDAgKENvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lKSIsIlN1biBPY3QgMDggMjAyMyAxOToyMDoyNyBHTVQrMDAwMCAoQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWUpIiwiU3VuIE9jdCAwOCAyMDIzIDE5OjIwOjM3IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkiXSwiYWdlIjoyNiwiYWRkZWRTaG9waW5nQ2FyIjpbXSwiZmF2b3JpdGVQcm9kdWN0cyI6W10sImlhdCI6MTY5NjgwMjgxMn0.Ub3_bJQLgk6iGqa0TKrI26v5Amn4xOLYPwOy_V3QoQA'

  useEffect(() => {
    GetUserList();
    GetVideoList();
    GetProductList();
   // pasare el token temporalmente asi
    localStorage.setItem('accessToken', tokenManual)
  }, []);

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

    useEffect(() => {
      if (dataGetUser) {
        const storedToken = localStorage.getItem('accessToken');
        const decodedToken = jwt_decode(storedToken);
        setDecodedToken(decodedToken);
        const loggedUserFound = dataGetUser.find(user => user._id === decodedToken._id);
        setLoggedUser(loggedUserFound);
      }
    }, [dataGetUser]);
  
    const imageWidth = screenWidth < 600 ? '220px' : '350px';
  
  useEffect(()=> {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      try {
        setToken(storedToken);
        const decodedToken = jwt_decode(storedToken);
        setDecodedToken(decodedToken)
    } catch (e) {
        console.error("Error al decodificar el token:", e);
        localStorage.removeItem('accessToken');
    }
    }

  },[]);

  const GetProductList = async () => {
    try {
      const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/product/`);
      setDataGetProduct(response.data);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };

  const GetUserList = async () => {
    try {
      const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/user/`);
      setDataGetUser(response.data);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };

  const GetVideoList = async () => {
    try {
      const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/video/`);
      console.log("response videos:", response);
      setDataGetVideo(response.data);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };


  const handleReceiveCode = (code) => {
    setReceivedCode(code);
  };

  const renderVideoCode = () => {
    return {__html: '<iframe width="100%" height="200" src="https://www.youtube.com/embed/qc4_pAbBafM" title="小狗清洁时间到，沉浸式小狗spa（带好耳机）#柴犬 #多巴胺 #豆柴 #抖音 #柴犬可愛い" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'};
    // return {__html: receivedCode};
  }

  const modalCreateProductFunction = (dataFromModal) => {
    setCreateProductValues(prev => ({
      ...prev,
      ...dataFromModal,
    }));
  }
  
  const selectSizesShoppingCart = ({target}) => {
    const {name, value} = target
    setCreateProductValues({
      ...CreateProductValues,
      [name]: value
    })
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const informationMessage = () => {
    Swal.fire({
      title: 'Hola!',
      text: 'Aún estamos desarrollando algunas funciones de la página, estarán disponibles pronto!',
      imageUrl: wtfcat,
      imageWidth: 270,
      imageHeight: 270,
      imageAlt: 'Custom image',
    })
  };
  
  const handleMenuCloseSesion = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    Swal.fire({
      title: 'Estas seguro?',
      text: "Su sesion cerrará",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesion'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesion finalizada!',
          'Su sesion ha sido cerrada.',
          'success'
        )
        localStorage.removeItem('accessToken');
      }
    })

  };

  const createProduct= async () => {
    console.log("CreateProductValues:", CreateProductValues);
    if(CreateProductValues.productName && CreateProductValues.price && CreateProductValues.description){
      try{
        const PostProduct = await axios.post(`${BASE_API_BACKEND_HOST}/api/product`,CreateProductValues)
      } catch(error){
        console.log("error al enviar datos:", error);
      }
    }
    else{
      setOpenModalCreateProduct(false);
      Swal.fire({
        title: "complete los campos obligatorios",
        icon: "error",
        confirmButtonText: "Entendido"
      })
    }
    setOpenModalCreateProduct(false);
    GetProductList();
  }

  const AddShoppingCar = async (product) => {
    product.size = CreateProductValues.size;
    try{      
      const response = await axios.patch(`${BASE_API_BACKEND_HOST}/api/user/shoppinCar`, {
        item: product},
        {
          headers: {
            'authorization': token
          }
        }
      )
      if (response) {
        Swal.fire({
          title: response.data,
          text: 'Que bien ! vamos por más ?',
          imageUrl: funnycat,
          imageWidth: 270,
          imageHeight: 270,
          imageAlt: 'Custom image',
          timer: 2000,
          timerProgressBar: true,
          confirmButtonText: "Vamos!"
        })
      } else {
        console.error('Error:', response.data.message);
      }
      GetUserList();
    } catch (error){
      console.error('Axios error:', error);
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuCloseSesion}>Cerrar Sesion</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={screenWidth<600?isMobileMenuOpen:false}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton 
          size="large" 
          aria-label="show 4 new mails" 
          color="inherit" 
          style={{outline:"none"}}
          >
          <Badge badgeContent={4} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favoritos</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          style={{outline:"none"}}
          onClick={() => setModalOpen(true)}
        >
          <Badge badgeContent={loggedUser ? loggedUser.addedShopingCar.length : 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Compras</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="cerrar sesion"
          color="inherit"
          style={{outline:"none"}}
          onClick={handleMenuCloseSesion}
        >
          <LogoutIcon />
        </IconButton>
        <p>Salir</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{outline:"none"}}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
  <Fragment>
    {/* <NavBar/> */}
   <Grid style={{        
         background: 'linear-gradient(360deg, rgba(2,0,36,1) 1%, rgba(2,29,89,1) 6%, rgba(1,94,146,1) 21%, rgba(1,108,146,0.95) 37%, rgba(1,108,146,0.9) 72%, rgba(255,255,255,0.7259278711484594) 86%)', 
       }}>
   <CssBaseline />
     {/* //& ********  APP BAR  ********** */}
     <Box sx={{ flexGrow: 1 , width:"100%"}}>
      <AppBar position="static">
        <Toolbar>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           Peluditos store
          </Typography>
     
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton 
                 size="large" 
                 aria-label="show 4 new mails" 
                 color="inherit" 
                 outline="transparent" 
                 style={{outline:'none'}}
                 >
              <Badge badgeContent={2} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              style={{outline:'none'}}
              onClick={() => setModalOpen(true)}
            >
              <Badge badgeContent={loggedUser ? loggedUser.addedShopingCar.length : 0} color="error" >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{outline:'none'}}
            >
             <Avatar 
               alt="Remy Sharp" 
               src="https://play-lh.googleusercontent.com/lWHfECVA-VmkTKVY8_kSMYmownC3dTt4-4FNqML-1_ijQ8B2RhjsKFhhP0a4O4CIIQ" 
               />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              style={{outline:'none'}}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>  
     {/* //& ***************************** */}
      <Grid>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 3,
          }}
        >
          <Container maxWidth={false}>
            {screenWidth<600?
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
              >
              PeluditosTrendy
            </Typography>
            :
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              >
              PeluditosTrendy
            </Typography>
            }
            <PetsIcon/>
            <Grid style={flexcomponent}>
             <Typography 
              variant="h5" 
              align="center" 
              color="text.secondary" 
              paragraph width={screenWidth <600 ? "85%":"60%"}>
               Aqui enconrarás productos maravillosos para tu mascota, somos una tienda 
               comprometida con el cuidado y amor por tu peludito.
             </Typography>
            </Grid>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={informationMessage}>Muestrame lo mas reciente</Button>
              <Button variant="outlined" onClick={informationMessage}>Lo más recomendado</Button>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        <Container sx={{ py: 9 }} maxWidth={false} spacing={20}>
          <Grid container style={{justifyContent:"space-between", width:"100%"}}>
            {dataGetVideo 
              ? 
              dataGetVideo.filter(video => video.moduleRute === "productos")
              .map((video) =>{
               return (
                <Grid item xs={12} md={4} marginLeft={screenWidth <900 ? 1 : 10}>
                   <Card 
                      elevation={7}
                      style={{ maxWidth: 345, width:350, marginBottom:25 }}
                      >
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                         <div dangerouslySetInnerHTML={{__html: `${video.insertionCode}`}} />
                      </div>
                      <CardContent>
                         <Typography variant="h5" component="div">
                            {video.title}
                         </Typography>
                      </CardContent>
                   </Card>
                </Grid>
               );
              })
              :
               <></>
            }
          </Grid>
          {/*tarjeta del producto */}
          <Divider sx={{marginBottom:2.5}}/>
          <Grid 
             container 
             spacing={screenWidth<600 ? 1:2.0} 
             style={{ width: screenWidth<600 ? "94vw":"100vw"}}
             >
            {dataGetProduct.map((product, index) => (
              <Grid item key={product._id} xs={6} sm={6} md={2} 
                style={{
                    marginBottom:5, 
                    marginRight:0,
                    marginLeft:screenWidth <600? 0:-7,
                    backgroundColor:""
                    }}>
                <Card
                  onMouseOver={() =>  setscalingCard(product._id)}
                  onMouseOut={() => setscalingCard(null)}
                  onClick={() => setscalingCard(product._id)}
                  sx={{
                    maxWidth:350,
                    borderRadius:4,
                    width:"100%",
                    height:'100%',
                    display:'flex', 
                    flexDirection:'column',
                    transform: product._id === scalingCard ? "scale(1.05)" : "scale(0.99)",
                    borderBlockColor:"black",
                    boxShadow: product._id === scalingCard ?'3px 3px 25px rgba(100, 100, 255, 0.7)':'10px 10px 25px rgba(255, 0, 0, 0.2)'
                   }}
                  >
                  <SwipeableTextMobileStepper 
                     productArray={product} 
                     productArrayIndex={index} 
                     FunctionOpenModalImage={(clickedIndex) => {
                      setBaseModalOpen(true);
                      setClickedIndex(clickedIndex);
                      }}
                     />
                  <CardContent sx={{ flexGrow: 1}}>
                    <Typography 
                      gutterBottom
                      marginTop={1} 
                      variant="h5" 
                      component="h2" 
                      fontSize={ screenWidth<600? 14: 16}
                      >
                      <strong>
                        {product.productName}
                      </strong>
                    </Typography>
                    <Typography 
                       style={{width:"100%",overflowWrap: 'break-word', wordWrap: 'break-word'}}
                       fontSize={ screenWidth<600? 12: 14}
                       letterSpacing={screenWidth<600? 0.2: "auto"}
                       lineHeight={screenWidth<600? 1.1: 1.4}
                      >
                     {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Grid container 
                      style={{
                          display:'flex', 
                          justifyContent:"space-between", 
                          alignItems:'center', 
                          marginTop: screenWidth<600 ? -35:-30
                          }}>
                      <Grid style={{width:'30%'}}>
                       <IconButton 
                         href='' 
                         style={{outline:'none', transform: screenWidth<600 ?"scale(0.75)":"scale(0.9)"}}
                         value={product._id}
                         onClick={()=> {AddShoppingCar(product)}}
                         >
                         <AddShoppingCartTwoToneIcon sx={{ mr: 0 , fontSize:'inherit',  color:'warning'}} />
                       </IconButton>
                      </Grid>
                      <Grid style={{width:'39%', marginLeft:screenWidth<600?-15:0}}>
                      <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue=""
                        style={{ 
                            width:screenWidth<600? 95:120, 
                            transform: screenWidth<600 ?"scale(0.65)":"scale(0.8)",
                            marginLeft:screenWidth<600 ? -6:-20,
                          }}
                        label="Talla"
                        margin="normal"
                        name="size"
                        onChange = {selectSizesShoppingCart}
                        disabled = { !ArraySizes.some(size => product.sizes.includes(size.value)) }
                       >
                        {
                          product.sizes.map((option) => (
                           <MenuItem key={option} value={option}>
                             {option}
                           </MenuItem>
                          ))
                        }
                     </TextField>
                      </Grid>
                      <Grid style={{width:'30%'}}> 
                       <IconButton 
                         href='' 
                         style={{outline:'none', transform: screenWidth<600 ?"scale(0.8)":"scale(1.0)"}}
                          onClick = {()=> {
                           setFavorite(true)
                          }}
                         >
                         
                          <FavoriteIcon 
                            sx={{fontSize:'inherit'}}
                          />
       
                       </IconButton>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
      <Divider />
      {/* Comentarios */}
      <FixedBottomComentaries/>
      {/*Fin Comentarios */}
      {/* Footer */}
       <Footer/>
      {/* End footer */}

     {/* Speed Dial */}
     {(screenWidth < 600) || (decodedToken== null ? decodedToken== null:decodedToken.rol !='admin') ?
     <></>
     :    
     <>
       <SpeedDial
        className={classesSpeedDial.speedDial}
         ariaLabel="SpeedDial basic example"
         icon={<SpeedDialIcon />}
       >
         {actions.map((action) => (
           <SpeedDialAction
             key={action.name}
             icon={action.icon}
             tooltipTitle={action.name}
             onClick={()=> {
               if (action.name === 'crear Producto') {
                setOpenModalCreateProduct(true);
                } else if(action.name === 'Update Video') {
                  setModalInsertVideoOpen(true)
               }else{
                handleClose();
              }
             }
             }
           />
         ))}
       </SpeedDial>
       <ModalAddProduct 
          isOpen={openModalCreateProduct} 
          onClose={() => setOpenModalCreateProduct(false)}
          onDataChange={modalCreateProductFunction}
          executeFunction={createProduct}
          />
     </> 
      }
      
     {/* Modal carrito compras */}
      <ModalShoppingCar 
      isOpen={isModalOpen} 
      setIsOpen={(()=>setModalOpen(true))}
      onClose={() => setModalOpen(false)} 
      />
     {/*Fin Modal carrito compras */}

     {/* Modal Base para visualizar imagenes*/}
      <BaseModal 
         isOpen={isBaseModalOpen} 
         onClose={() => setBaseModalOpen(false)} 
         productObject={dataGetProduct}
         indexProduct={clickedIndex}
         />
     {/*Fin Modal Base para visualizar imagenes */}

     {/* Modal para insertar video */}
      <InsertVideoCode 
         isOpen={isModalInsertVideoOpen} 
         onClose={() => setModalInsertVideoOpen(false)} 
         onSend={handleReceiveCode}/>
     {/* Fin Modal para insertar video */}
  </Grid>
 </Fragment>
 );
}