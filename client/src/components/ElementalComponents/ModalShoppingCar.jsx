import * as React from 'react';
import axios from 'axios';
import { Fragment, useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Modal, Tooltip } from '@mui/material';
import {TextField} from '@mui/material';
import jwt_decode from "jwt-decode";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import PetsIcon from '@mui/icons-material/Pets';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import IconButton from '@mui/material/IconButton';

import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2' 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';  // Importa el ícono de cierre
import AlertTitle from '@mui/material/AlertTitle';
import { Snackbar, Alert } from '@mui/material';

import configuraciones from '../../config'
const BASE_API_BACKEND_HOST = configuraciones.BASE_API_BACKEND_HOST;

const flexcomponent = {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    width:"100%" 
} 

export default function ModalShoppingCar({ isOpen, onClose, setIsOpen }) {

  const [dataGetUser, setDataGetUser] =useState(null)
  const [loggedUser, setLoggedUser] =useState(null)
  const [decodedToken, setDecodedToken] =useState(null)
  const [Token, setToken] =useState(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [total, setTotal] = useState(0);
  const [cantidades, setCantidades] = useState({});
  const [openSnackbarDelete, setOpenSnackbarDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  
  console.log("cantidades:", cantidades);

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

   const GetUserList = async () => {
      try {
        const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/user/`);
        setDataGetUser(response.data);
        //configuracion para fijar como 1 cantidad en el carrito por defecto
        const storedToken = localStorage.getItem('accessToken');
            const decodedToken = jwt_decode(storedToken);
            setToken(storedToken);
            setDecodedToken(decodedToken);

            const loggedUserFound = response.data.find(user => user._id === decodedToken._id);
            setLoggedUser(loggedUserFound);

            //validamos el usuario loggeado y que tenga productos en el carrito
            if (loggedUserFound && loggedUserFound.addedShopingCar ) {
              const initialQuantities = {...cantidades};;
              loggedUserFound.addedShopingCar.forEach(product => {
                const key = `${product._id}+${product.size}`;
                if (!initialQuantities[key]) {  // Solo asigna 1 si el producto no tiene un valor en cantidades
                    initialQuantities[key] = 1;
                }
            });
              setCantidades(initialQuantities);
          }
      } catch (error) {
        console.log("Error al obtener los productos:", error);
      }

    };

    const totalPrices = ()=> {

      if (!loggedUser || !loggedUser.addedShopingCar) {
        return;
      }

      const totalPrecioFotos = loggedUser?.addedShopingCar.reduce((acumulador, producto) => {
        const matchingPhoto = producto.photo.find(v => v.label == producto.size);
        const precioProducto = matchingPhoto ? matchingPhoto.price : 0;
        return acumulador + (precioProducto * (cantidades[`${producto._id}+${producto.size}`] || 1));

      }, 0);
      setTotal(totalPrecioFotos)
    }
    console.log("loggedUser:", loggedUser);

    useEffect(() => {
      GetUserList();
    }, []);

    useEffect(() => {
      totalPrices();
    }, [cantidades]);
    
    useEffect(() => {
      if (dataGetUser) {
        const storedToken = localStorage.getItem('accessToken');
        const decodedToken = jwt_decode(storedToken);
        setToken(storedToken)
        setDecodedToken(decodedToken);
    
        const loggedUserFound = dataGetUser.find(user => user._id === decodedToken._id);
        setLoggedUser(loggedUserFound);
      }
    }, [dataGetUser]);

    const quantityShopingCartFunction = (id, action = null, event) => {
      const currentValue = cantidades[id] || 1;
      let nuevoValor = currentValue;
      if (action === 'add') {
        nuevoValor += 1;
      } else if (action === 'subtract') {
        nuevoValor -= 1;
        if (nuevoValor < 1) nuevoValor = 1; // Evita valores negativos
      } else if (action === null) {
        nuevoValor = parseInt(event.target.value, 10) || 1;
      }
      setCantidades(prev => ({ ...prev, [id]: nuevoValor }));
    };

  const handleRemoveProduct = (productId, size) => {
    onClose();
      Swal.fire({
        title: 'Estas seguro?',
        text: "Su producto se eliminará permanentemente del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(productId, size);
        }
      })
    };
    
    const deleteProduct = async (productId, size) => {
      try {
        const deletedProductResponse = await axios.delete(`${BASE_API_BACKEND_HOST}/api/user/delete/${loggedUser._id}+${productId}+${size}`, 
          {
            headers: {
              'authorization': Token
            }
          }
        );
    
        if (deletedProductResponse.status === 200) {
          setIsOpen(true);
          const updatedShoppingCart = loggedUser.addedShopingCar.filter(
            product => !(product._id === productId && product.size === size)
            );
            setLoggedUser(prev => ({ ...prev, addedShopingCar: updatedShoppingCart }));
            setOpenSnackbarDelete(true);
        }
      } catch(error) {
        isOpen(true);
        console.log("error:", error);
        Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
      }
    }

    const BuySelectedItems = ()=> {

    }

  const renderHeaders = () => {
    if (screenWidth >= 600) {
        return (
            <>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Referencia</TableCell>
                <TableCell align="center">SubTotal</TableCell>
                <TableCell align="center">Descartar</TableCell>
            </>
        );
    }
    return null;
  };
  
return(
<Grid container style={flexcomponent} spacing={2}>
 <Modal open={isOpen} onClose={onClose}>
  <Box
   sx={{
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: screenWidth<600? "99%":900,
     height: screenWidth<600? "95%":580,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 20,
     borderRadius:3,
     p: 2,
     mt:0
    }}
   >   
     {/* Botón de cierre */}
      <IconButton 
        onClick={onClose} 
        style={{
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',  // fondo ligeramente transparente
        color: '#fff',  // color del icono
        margin: '5px',  // un poco de margen para que no esté pegado al borde
        zIndex: 10, // asegurarnos de que esté encima de otros elementos
        transform : 'scale(0.8)'
         }}
        >
          <CloseIcon />
      </IconButton>
   <Paper style={{ height: screenWidth <600?420:490, width: '100%', overflow:"scroll" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {renderHeaders()}
        </TableRow>
      </TableHead>
      <TableBody>
       {loggedUser == null ? null : loggedUser.addedShopingCar.map((producto, index) => (
       <TableRow key={`${producto._id}+${producto.size}`}>
        {screenWidth<600? 
        <Box 
            mb={2} 
            style={{
                borderRadius:6, 
                border: "1px solid #000", 
                width:"100%", 
                height:"auto",
                backgroundColor:"rgba(75, 207, 250,0.05)"
                }}>
          <Grid style={flexcomponent}>
            <Grid style={{ 
                         width:"31%", 
                         justifyContent:"center", 
                         alignItems:"center", 
                         display:"flex", 
                         marginTop:5,
                         marginLeft:1
                         }}>
             <Typography>
              <Box style={{width:90}}>
                <Grid>
                  <img style={{width:"100%",}} src={ 
                            (() => {
                              const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                              return matchingPhoto ? matchingPhoto.imgPath : "Invalid";
                            })()
                   }/>
                </Grid>
               </Box>
              </Typography>
            </Grid>
            <Grid style={{width:"68%"}}> 
              <Grid style={{width:"100%",textAlign:"center",marginBottom:5, display:"flex"}}>
                <Grid style={{width:"20%", fontWeight: "bold"}}>
                  {producto.size}
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid style={{width:"80%"}}>
                 <Typography >{producto.productName}</Typography>  
                </Grid>
              </Grid>
              <Divider/>
              <Grid style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:8, marginLeft:10}}>
               <Grid style={{width:"45%"}}>
                  <Typography fontSize={14} fontFamily={'cursive'}>
                     {producto.typeOfCurrency}
                  </Typography>
                  <Typography fontSize={14}>
                   {
                    (() => {
                    const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                    return matchingPhoto ? (matchingPhoto.price) : 1
                    })()
                   }
                  </Typography>
                  <Typography color={"green"} fontSize={14}>
                    <strong>
                     {
                      (() => {
                       const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                       return matchingPhoto ? (matchingPhoto.price)*cantidades[`${producto._id}+${producto.size}`] 
                        : 
                        "Invalid";
                       })()
                     }
                    </strong>
                  </Typography>
               </Grid>
               <Grid style={{width:"80%"}}>
                 <IconButton 
                   size="small"
                   style={{
                    outline:"none",
                    border: "1px solid #000",
                    borderRadius:10,
                    marginRight:2,
                    transform: "scale(0.7)"
                  }} 
                  value={cantidades}
                  onClick={() => quantityShopingCartFunction(`${producto._id}+${producto.size}`, 'add')}
                  >
                    <AddIcon />
                 </IconButton>
                 <TextField 
                   size="small"
                   style={{width:66, marginTop:-2}}
                   inputProps={{ style: { textAlign: 'center' }, min: 1 }} 
                   type="number" 
                   value={cantidades[`${producto._id}+${producto.size}`] || 1}
                   onChange={(event) => quantityShopingCartFunction(`${producto._id}+${producto.size}`, null, event)}
                 />
                 <IconButton 
                   size="small" 
                   style={{
                    outline:"none",
                    border: "1px solid #000",
                    borderRadius:10,
                    marginLeft:2,
                    transform: "scale(0.7)"
                  }} 
                  value={cantidades}
                  onClick={() => quantityShopingCartFunction(`${producto._id}+${producto.size}`, 'subtract')}
                  >
                   <RemoveIcon />
                 </IconButton>
               </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* footer buttom */}
           <Grid 
              style={{
                 display:"flex", 
                 width:"100%", 
                 alignItems:"center", 
                 justifyContent:"space-between",
                 height:50,
                 }}>
              <Grid style={{marginLeft:10, transform:"scale(0.8)"}}>
               <Button  
                   variant="outlined" 
                   startIcon={<DeleteIcon />}
                   onClick={() => handleRemoveProduct(producto._id, producto.size)}
                   >
                 Eliminar
               </Button>
              </Grid>
              <Grid style={{marginRight:10 , transform:"scale(0.8)"}}>
               <Button  variant="outlined" endIcon={<AddShoppingCartTwoToneIcon />}>
                 Comprar
               </Button>
              </Grid>
             </Grid>
          </Box>
          :
          <>
           <TableCell align="center">
            <Box style={{width:screenWidth<600? 80:110}}>
             <Grid style={{width:"100%", justifyContent:"center", alignItems:"center", display:"flex"}}>
                <img style={{width:"100%"}} src={ 
                            (() => {
                              const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                              return matchingPhoto ? matchingPhoto.imgPath : "Invalid";
                            })()
                }/>
             </Grid>
            </Box>
           </TableCell>
           <TableCell align="center">{producto.productName}</TableCell>
           <TableCell align="center">
           <Typography>
                   {
                    (() => {
                    const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                    return matchingPhoto ? (matchingPhoto.price) : 1
                    })()
                   }
                  </Typography>
           </TableCell>
           <TableCell align="center">
            <TextField 
              size="small"
              defaultValue={1}
              style={{width:100}}
              inputProps={{ style: { textAlign: 'center' }, min: 1}} 
              type="number" 
              value={cantidades[`${producto._id}+${producto.size}`] || 1}
              onChange={(event) => quantityShopingCartFunction(`${producto._id}+${producto.size}`, null, event)}
            />
           </TableCell>
           <TableCell align="center">{producto.size}</TableCell>
           <TableCell align="center">
             {
                    (() => {
                    const matchingPhoto = producto.photo.find(v => v.label == producto.size);
                    return matchingPhoto ? (matchingPhoto.price)*cantidades[`${producto._id}+${producto.size}`] 
                    + ' ' +
                     producto.typeOfCurrency: "Invalid";
                    })()
                   }
            </TableCell>
           <TableCell align="center">
            <Tooltip arrow title={"Descartar"}>
             <IconButton 
              onClick={() => handleRemoveProduct(producto._id, producto.size)}
             >
              <DeleteIcon/>
             </IconButton>
            </Tooltip>
           </TableCell>
        </>
        }
        </TableRow>
        ))}
     </TableBody>
    </Table>
   </Paper>
    <Grid container display="flex" justifyContent="space-between" alignItems="center">
     <Typography mt={3} ml={2}>
        {screenWidth <600?
        <strong style={{ fontSize: '15px', transform:'scale(0.85)'  }}>TOTAL:  </strong>
        :
        <strong>TOTAL COMPRA:  </strong>
       }
       <TextField
          label=""
          id="outlined-size-small"
          defaultValue={0}
          value={total}
          size="small"
          style={{ 
            width:100, 
            marginTop:"-9px", 
            marginLeft:5,
            borderRadius:6,
            transform:screenWidth<600 ?'scale(0.85)' :'scale(1.0)'
          }}
          InputProps={{
            readOnly: true,
        }}
        />
       {screenWidth <600? "":<strong> $ {"COP"}</strong>}
     </Typography>  
      <LoadingButton
          style={{ 
            marginTop:15, 
            marginRight:screenWidth <600?0:10,
            transform: screenWidth <600? "scale(0.76)": "scale(0.8)"}}
          size="large"
          onClick={handleClick}
          endIcon={<ShoppingCartCheckoutIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Pagar</span>
      </LoadingButton>
    </Grid>
  </Box>
 </Modal>
  {/* Snackbar delete producto */}
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={openSnackbarDelete}
    autoHideDuration={6000}
    onClose={() => setOpenSnackbarDelete(false)}
  >
    <Alert onClose={() => setOpenSnackbarDelete(false)} severity="success" sx={{ width: '100%' }}>
      ¡Producto eliminado con éxito!
    </Alert>
  </Snackbar>
</Grid>
 )
}

