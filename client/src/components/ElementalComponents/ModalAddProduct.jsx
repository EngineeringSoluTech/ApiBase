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
import { Modal, Tooltip } from '@mui/material';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/lab/Autocomplete';

import { styled } from '@mui/system';
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
import CancelIcon from '@mui/icons-material/Cancel';

import configuraciones from '../../config'
const BASE_API_BACKEND_HOST = configuraciones.BASE_API_BACKEND_HOST;

const flexcomponent = {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
} 

const currencies = [
    {
      value: '',
      label: '',
    },
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'COP',
      label: '$',
    }
  ];
  
  // estos deberian ir en la base de datos para poder ser modificados
   const Referencias = [
    {value: 'Higiene'},
    {value: 'Ropa'},
    {value: 'Accesorios'},
    {value: 'Otros'}
  ];
   
  const Sizes = [
    {value: 'ㅤㅤㅤ'},
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

export default function ModalAddProduct({ isOpen, onClose, onDataChange, executeFunction}) {
    
    const [productNames , setproductNames ] = useState(null)
    const [CreateProductValues, setCreateProductValues] = useState({
        productName: "",
        reference: "",
        photo : "",
        quantityStock: 1,
        sizes : [],
        size : '',
        description:"",
        price:1,
        typeOfCurrency:""
      });

      useEffect(()=> {
        GetProductList();
      },[]);
    
      const GetProductList = async () => {
        try {
          const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/product/`);
          const names = response.data.map(product => product.productName);
          setproductNames(names);
        } catch (error) {
          console.log("Error al obtener los productos:", error);
        }
      };

    const modalCreateProductFunction = ({target}) => {
        const {name, value} = target;
        onDataChange({ [name]: value });
        setCreateProductValues({
            ...CreateProductValues,
            [name]: value
          })
      }
 
      const clearField = (name) => {
        setCreateProductValues({
            ...CreateProductValues,
            [name]: ''
          })
      }

     const defaultPhoto = 'https://us.123rf.com/450wm/vladvm/vladvm1507/vladvm150701112/42394555-el-icono-de-la-foto-imagen-e-imagen-s%C3%ADmbolo-de-fotos-ilustraci%C3%B3n-del-vector-plana-bot%C3%B3n.jpg?ver=6'
     
     const handleButtonClick = () => {
        executeFunction(); // Llama a la función del componente principal.
      };

     return(        
     <Modal open={isOpen} onClose={onClose}  >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            borderRadius:2,
            p: 2,
            mt:0
          }}
        >
           <Grid container style={flexcomponent} spacing={2}>
            <Grid item sx={{width:"50%"}}>
              <Box style={{width:440}}>
               <Grid style={{width:"100%", justifyContent:"center", alignItems:"center", display:"flex"}}>
                <img style={{width:"60%"}} src={CreateProductValues.photo == ''?defaultPhoto:CreateProductValues.photo}/>
               </Grid>
              </Box>
              <TextField
                fullWidth
                margin="normal"
                label="link del producto"
                name="photo"
                helperText="Copia el enlace de donde se encuentra la imagen almacenada"
                onChange = {modalCreateProductFunction}
                value={CreateProductValues.photo}
                InputProps={{
                  endAdornment: (
                    <Tooltip 
                      row 
                      title='Clear' 
                      placement='left'
                      >
                      <InputAdornment position="end">
                          <IconButton
                              edge="end"
                              onClick={()=>{clearField("photo")}}
                              style={{outline:'none'}}
                          >
                              <CancelIcon/>
                          </IconButton>
                      </InputAdornment>
                    </Tooltip>
                  )
                 }}
              />
              <Autocomplete
  freeSolo
  options={productNames}
  onChange={(event, newValue) => {
    // Llama a tu función para manejar cambios
    modalCreateProductFunction({
      target: {
        name: "productName",
        value: newValue
      }
    });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      fullWidth
      margin="normal"
      value={CreateProductValues.productName}
      label="Nombre del Producto"
      name="productName"
      helperText="Escriba un nombre claro, corto y legible"
      inputProps={{
        ...params.inputProps,
        maxLength: 18
      }}
      placeholder='Máximo 18 caracteres'
      onChange = {modalCreateProductFunction}
      InputProps={{
        ...params.InputProps, // Extiende las props InputProps para el funcionamiento de Autocomplete
        endAdornment: (
            <Tooltip title='Clear' placement='left'>
              <>
               {params.InputProps.endAdornment} 
              </>
            </Tooltip>
        )
      }}
    />
  )}
/>
              {/* <TextField
                fullWidth
                margin="normal"
                label="Nombre del Producto"
                name="productName"
                helperText="Escriba un nombre claro, corto y legible"
                onChange = {modalCreateProductFunction}
                inputProps={{ maxLength: 18 }}
                placeholder='Máximo 18 caracteres'
                InputProps={{
                  endAdornment: (
                    <Tooltip 
                     row 
                     title='Clear' 
                     placement='left'
                    >
                      <InputAdornment position="end">
                          <IconButton
                              edge="end"
                              onClick={()=>{clearField("productName")}}
                              style={{outline:'none'}}
                          >
                              <CancelIcon/>
                          </IconButton>
                      </InputAdornment>
                    </Tooltip>
                  )
                 }}
              /> */}
            </Grid>
            <Grid item sx={{width:"50%"}}>
            <Typography style={{textAlign:"center", fontSize:28, marginBottom:10}}>Crear Producto</Typography>
              <Grid container style={flexcomponent} spacing={2}>
               <Grid item sx={{width:"50%"}}>                
                <TextField
                  fullWidth
                  margin="normal"
                  helperText="Ingresa el valor"
                  value={CreateProductValues.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  label="Precio"
                  name="price"
                  onChange = {modalCreateProductFunction}
                />
               </Grid>
               <Grid item sx={{width:"50%"}}>
                <TextField
                  id="outlined-select-currency"
                  select
                  value={CreateProductValues.typeOfCurrency}
                  defaultValue=""
                  helperText="Selecciona la moneda"
                  fullWidth
                  margin="normal"
                  label="Moneda"
                  name="typeOfCurrency"
                  onChange = {modalCreateProductFunction}
                >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                       {option.value}
                      </MenuItem>
                    ))}
                </TextField>
               </Grid>
              </Grid>
            
              <Grid container style={flexcomponent} spacing={2}>
               <Grid item sx={{width:"50%"}}>                
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label="Referencia"
                  name="reference"
                  value={CreateProductValues.reference}
                  defaultValue=""
                  onChange = {modalCreateProductFunction}
                >
                    {Referencias.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                       {option.value}
                      </MenuItem>
                    ))}
                </TextField>
               </Grid>
               <Grid item sx={{width:"50%"}}>
                <TextField
                  fullWidth
                  select
                  margin="normal"
                  label="Talla"
                  value={CreateProductValues.size}
                  name="sizes"
                  onChange = {modalCreateProductFunction}
                >
                   {Sizes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                       {option.value}
                      </MenuItem>
                    ))}
                </TextField>
               </Grid>
              </Grid>
              <TextField
                 fullWidth
                 sx={{marginTop:3}}
                 margin="normal"
                 id="outlined-multiline-flexible"
                 label="Descripción"
                 value={CreateProductValues.description}
                 multiline
                 defaultValue=""
                 name='description'
                 onChange = {modalCreateProductFunction}
                 minRows={3}
                 placeholder='Descripción del producto'
                 helperText="Escriba una breve descripción del producto"
                 inputProps={{ maxLength: 70 }}
                 InputProps={{
                  endAdornment: (
                     <Tooltip 
                      row 
                      title='Clear' 
                      placement='left'
                     >
                      <InputAdornment 
                        position="end"
                        style={{ position: 'absolute', bottom: 15, right: 8}}
                        >
                          <IconButton
                              edge="end"
                              onClick={()=>{clearField("description")}}
                              style={{outline:'none'}}
                          >
                              <CancelIcon/>
                          </IconButton>
                      </InputAdornment>
                     </Tooltip>
                  )
                 }}
              />
            </Grid>
           </Grid>
           <Grid container style={{justifyContent:"flex-end"}}>
            <Grid item sx={{width:"13%"}}>
             <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Guardar
             </Button>
            </Grid>
           </Grid>
        </Box>
      </Modal>
      )
}
