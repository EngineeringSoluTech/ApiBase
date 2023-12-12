import * as React from 'react';
import { Fragment, useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

import '../App.css';
import PetsIcon from '@mui/icons-material/Pets';
import hellopug from '/images/gif/hellopug.gif'

import configuraciones from '../config'
const BASE_API_BACKEND_HOST = configuraciones.BASE_API_BACKEND_HOST;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        peluditostrendystore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

 const theme = createTheme();

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
};

const Login= () => {
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [dataregister, setDataRegister] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const imageWidth = screenWidth < 600 ? '220px' : '350px';
  const colorWidth = screenWidth < 600 ? 'rgba(219,230,238,0.5)' : 'ButtonShadow';
  
  const inputChange = ({target})=> {
    const {name, value} = target
    setData({
      ...data,
      [name]: value
    })
  }

  const modalRegister = ({target}) => {
    const {name, value} = target;
    setDataRegister({
      ...dataregister,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {  
    e.preventDefault()
    await axios.post(`https://peluditostrendydevelop.fly.dev/api/login`, data)
     .then(({data})=> {
      console.log("hola en login:", data);
       const token = data.token
       localStorage.setItem('accessToken', token);
       const decodedToken = jwt_decode(token, { header: false });
       if(decodedToken.rol === "admin"){
         Swal.fire("Bienvenido administrador")
          .then(()=> {
            window.location='/productos'
           })
       }
     })
     .catch(error=> {
       console.log(error);
       console.log("hola en login error:", data);
       Swal.fire('usuario o contraseña incorrectos')
     })
   };

   const registerNewUser = async (e) => {  
    e.preventDefault()
    if( e.preventDefault() == undefined){
      setOpen(false)
      Swal.fire({
        title: "SIN CONEXIÓN",
        width: 450,
        padding: '4em',
        color: "black",
        confirmButtonText: 'Aceptar',
        background: '#fff url(/images/mascotica.gif)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        customClass: {
          title: 'tituloConBordesSweetAlert'
        }
      })
    }

    if(dataregister.password === dataregister.repeatPassword)
    {
      await axios.post(`${BASE_API_BACKEND_HOST}/api/user`, dataregister)
       .then(()=> {
         Swal.fire("Registrado correctamente, Bienvenido ")
            .then(()=> {
              window.location='/'
             })
       })
       .catch(error=> {
         setOpen(false)
         console.log(error);
         Swal.fire({
          title: error.response.data,
          width: 450,
          padding: '4em',
          color: 'gray',
          background: '#fff url(/images/mascotica.gif)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
          customClass: {
            title: 'tituloConBordesSweetAlert'
          }
        })
       })
    }else{
      setOpen(false)
      Swal.fire("Las contraseñas no Coinciden")
    }
   };

  return (
    <Fragment >
    <ThemeProvider theme={theme} >
     <Container component="main" maxWidth={false} style={{backgroundColor:"transparent"}}>
        <Box
         sx={{
          position:"fixed",
          bottom: 0,
          right: 0, 
         }}
        >
          <img src={hellopug} alt='hello pug' style={{ width: imageWidth , bottom: 0, right:0}}/>
        </Box>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, mt:4, bgcolor: 'secondary.main' }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={inputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputChange}
            />
            <Grid style={{width:"100%", textAlign:"start"}}>
             <FormControlLabel
               control={<Checkbox value="remember" color="primary" />}
               label="Remember me"
             />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 4 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs textAlign={"center"}>
                <Link href="#" variant="body3" style={{color:"purple"}}>
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 3 , backgroundColor: colorWidth, color: "black"}}
              onClick={handleOpen}
            >
              Registrate
            </Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 1, mb: 3 }} />
      </Container>
    </ThemeProvider>

    {/* modal para registro */}
    <Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Grid sx={{mt:2}} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>  
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <LockOutlinedIcon />
           </Avatar>     
           <Typography component="h1" variant="h5">
             Sign up
           </Typography>
         </Grid>
          <Box component="form" noValidate sx={{ m:2, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={modalRegister}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={modalRegister}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={modalRegister}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={modalRegister}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatPassword"
                  autoComplete="new-password"
                  onChange={modalRegister}
                />
              </Grid>
              <Grid item xs={12} >
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Me gustaria recibir informacion y ofertas a mi correo."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={registerNewUser}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item sx={{mb:3}}>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Grid>
    </Fragment>
  );
}

export default Login