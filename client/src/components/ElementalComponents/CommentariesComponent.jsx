import * as React from 'react';
import { Fragment, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {Divider, TextField} from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {ListItemSecondaryAction} from '@material-ui/core';

import configuraciones from '../../config'
const BASE_API_BACKEND_HOST = configuraciones.BASE_API_BACKEND_HOST;

export default function FixedBottomComentaries() {

  const ref = React.useRef(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [dataGetUser, setDataGetUser] = useState(null);
  const [dataGetComentary, setDataGetComentary] = useState(null);
  const [comentaryData, setComentaryData] = useState("");
  const [replyData, setReplyData] = useState("");
  const [showCount, setShowCount] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");
  const [seeReply, setSeeReply] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [openedReply, setOpenedReply] = useState(null);

  const location = useLocation();
  const pathName = location.pathname;
  const rutaPartes = pathName.split('/');
  const rutaActual = rutaPartes[1];

  console.log("datagetcomentary:", dataGetComentary);

  useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        initializeData();
    }, []);

    useEffect(() => {
        if (dataGetUser && decodedToken) {
            const loggedUserFound = dataGetUser.find(user => user._id === decodedToken._id);
            setLoggedUser(loggedUserFound);
        }
    }, [dataGetUser, decodedToken]);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    const initializeData = async () => {
        try {
            await Promise.all([GetUserList(), GetComentaryList()]);
            
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
                const decoded = jwt_decode(storedToken);
                setDecodedToken(decoded);
                setToken(storedToken);
            }
        } catch (e) {
            console.error("Error en la inicialización:", e);
        }
    }

    const GetUserList = async () => {
      try {
        const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/user/`);
        setDataGetUser(response.data);
      } catch (error) {
        console.log("Error al obtener los usuarios:", error);
      }
    };

    const GetComentaryList = async () => {
      try {
        const response = await axios.get(`${BASE_API_BACKEND_HOST}/api/comentary/`);
        setDataGetComentary(response.data);
      } catch (error) {
        console.log("Error al obtener los comentarios:", error);
      }
    };

    const postComment = async (event) => {
      event.preventDefault();

      const body = {
        comentary: comentaryData.charAt(0).toUpperCase() + comentaryData.slice(1),
        userName: (loggedUser.fisrtName.split(" ")[0]).charAt(0).toUpperCase() + loggedUser.fisrtName.split(" ")[0].slice(1)
                    + " "
                    + (loggedUser.lastName.split(" ")[0]).charAt(0).toUpperCase() + loggedUser.lastName.split(" ")[0].slice(1),
        userPhoto: loggedUser.photo,
        userId: loggedUser._id,
        module: rutaActual
      }

      try {
        const response = await axios.post(`${BASE_API_BACKEND_HOST}/api/comentary/`, body, {
          headers: {
            'authorization': token
          }
        });
    
        // ¡Comentario añadido con éxito!
        if (response.data && response.status === 200) {
          // Agregamos el comentario al estado local para que se muestre inmediatamente
          setDataGetComentary(prevComments => [...prevComments,  body ]);
    
          setMessageSnack("Comentary Posted");
          setOpen(true);
          setComentaryData("");
          setShowCount((dataGetComentary.length)+1); // para que no me trunque la lista de comentarios
          setShowAll(true);
        } else {
          // Algún error ocurrió mientras agregábamos el comentario
          setMessageSnack("Error Post Comentary");
          setOpen(true);
        }
      } catch (error) {
        setMessageSnack("Error Post Comentary");
        setOpen(true);
      }
    }
    
    const likeComent = ()=>{
      console.log("me gusta este comentario");
    }

    const handleShowMore = () => {
      if (!showAll) {
        setShowCount((dataGetComentary.length)+1); // Mostramos todos los mensajes +1 siempre para visualizar los nuevos
        setShowAll(true); // Cambiamos el estado para saber que estamos mostrando todos
      } else {
        setShowCount(5); // Volvemos a mostrar sólo 5 mensajes
        setShowAll(false); // Cambiamos el estado para saber que no estamos mostrando todos
      }
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose} style={{outline:"none"}}>
          CLOSE
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          style={{outline:"none"}}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

  return (
    <Box sx={{ pb: 7, m: screenWidth <600 ? 0.4: 5 }} ref={ref}>
      <Typography fontSize={20} mb={3} color={"whiteSmoke"}>
        COMENTARIOS
      </Typography>
      <CssBaseline />
      <List>
        {dataGetComentary?.filter(comment => comment.module === "productos" || comment.module === "All")
        .slice(0, showCount)
        .map(({ userName, comentary, userPhoto, likes, _id, replies, module, createdAt }, index) => (
          <Grid>
          <ListItem button key={index + userPhoto}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={userPhoto} />
            </ListItemAvatar>
            <ListItemText 
                  primary={userName+"​ㅤㅤ​ㅤ"+ createdAt.charAt(0).toUpperCase() + createdAt.slice(1)} 
                  secondary={comentary} 
                  primaryTypographyProps={{ style: { color: 'whiteSmoke' } }}
                  secondaryTypographyProps={{ style: { color: '#B0C4DE', fontSize: screenWidth<600? 13:14 } }}
                  style={{width:"95%", color:"whiteSmoke"}}/>
            <IconButton 
              style={{outlineColor:"pink"}}
              onClick={likeComent}
              >
              <Badge color="secondary" badgeContent={likes?.length} max={99} >
                <FavoriteBorderIcon style={{ color: 'white' }}/>
             </Badge>
            </IconButton>
          </ListItem>
          {replies?.map((reply, indej) => (
             seeReply ?
              <Grid style={{width:screenWidth<600?"90%":"70%", marginLeft:screenWidth<600?20:35, marginBottom:screenWidth<600?-35:-35, marginTop:-15}}>
              <List>
               <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{transform:screenWidth<600?"scale(0.9)":"scale(1.0)"}} alt="Profile Picture" src={reply.userPhoto} />
                </ListItemAvatar>
                <ListItemText 
                    primary={replies[indej].userName} 
                    secondary={
                      <>
                      <Typography 
                          component="span"
                          variant="body2"
                          style={{color: '#B0C4DE', fontSize: screenWidth<600? 12:14 }}
                      >
                          {replies[indej].comentary}
                      </Typography>
                      <Divider sx={{ backgroundColor: 'white', mt:1 }}/>
                      <Typography 
                          component="span"
                          variant="caption"
                          display="block"
                          style={{color: 'gray'}}
                      >
                          {new Date().toLocaleDateString()} {/* Asume que quieres mostrar la fecha actual, cámbialo según tus necesidades */}
                      </Typography>
                    </>
                    } 
                    primaryTypographyProps={{ style: { color: 'whiteSmoke', fontSize: screenWidth<600? 13:14 } }}
                    secondaryTypographyProps={{ style: { color: '#B0C4DE', fontSize: screenWidth<600? 12:14 } }}
                    style={{width:"95%", color:"whiteSmoke"}}
                  />
                <IconButton 
                  style={{outlineColor:"pink"}}
                  onClick={likeComent}
                 >
                 <Badge color="secondary" badgeContent={15} max={99} style={{transform:screenWidth<600?"scale(0.8)":"scale(1.1)" }}>
                   <ThumbUpOffAltIcon style={{ color: 'white', transform:screenWidth<600?"scale(0.9)":"scale(1.0)" }}/>
                 </Badge>
                </IconButton>
               </ListItem>
              </List>
              </Grid>
              :
              <></>
            ))
           }
           {
            openReply && openedReply === _id? 
            <Grid style={{marginBottom:10, marginTop:25}}>
             <TextField
               value={replyData}
               placeholder='Comentario'
               style={{width:"90%", background:"white", borderRadius:8}}
               onChange={(event)=> setReplyData(event.target.value)}
               InputProps={{
                   endAdornment: (
                    <>
                       <IconButton onClick={() => setOpenReply(false)}>
                           <CloseIcon/>
                       </IconButton>
                       <IconButton onClick={() => {/* función para enviar el comentario */}}>
                           <SendIcon />
                       </IconButton>
                    </>
                   ),
               }}
              >
             </TextField>
            </Grid>
            :
            <></>
           }
           <Grid style={{
                 width:screenWidth<600?"100%":"30%",  
                 display:"flex", 
                 justifyContent:"center", 
                 alignItems:"center",
                 marginLeft:-20,
                 marginTop:-15
                 }}>
            {openReply?
             <></>
             :
            <Button fullWidth 
               style={{
                outline:"none", 
                color:"white",
                textTransform: 'none',
                marginTop: seeReply ? 15:0,
                transform:screenWidth<600 ? "scale(0.9)":"scale(1.0)"
                }}
                onClick={()=>{
                  setOpenReply(true),
                  setOpenedReply(_id),
                  setSeeReply(true)
                }}
                //onClick={()=>setReply()}
              >
              Comentar
            </Button>
            } 
            {seeReply ?
            <></>
            :
            <Typography 
              color={"white"}
              mr={1.5}
              mt={seeReply?2:0}
              style={{transform:screenWidth<600 ? "scale(0.8)":"scale(1.0)"}}
             >
              {replies?.length || 0}
            </Typography>
            }     
              <Button 
                 onClick={()=>{
                    setSeeReply(!seeReply),
                    setOpenReply(!openReply)
                  }}
                 fullWidth 
                 sx={{
                  mt:screenWidth<600 ? seeReply?2:0:seeReply?2:0
                  }} 
                 style={{
                  outline:"none", 
                  color:"white", 
                  textTransform: 'none',
                  fontSize:screenWidth<600 ? 12:14,
                  marginLeft:screenWidth<600 ?(seeReply || openReply) ? 270:-70 : (seeReply || openReply) ? -150:-90
                  }}
                 >
                 {seeReply ? '...Ver menos' : 'Replies...'}
              </Button>
           </Grid>
          </Grid>
        ))}
       <Button onClick={handleShowMore} fullWidth sx={{mt:2}} style={{outline:"none", color:"ButtonHighlight"}}>
         {showAll ? '...Ver menos' : 'Ver más...'}
       </Button>
      </List>
      <Box sx={{mt:5}}>
       <form variant="standard" onSubmit={postComment}>
        <Grid>
          <TextField
            value={comentaryData}
            placeholder='Comentario'
            style={{width:"94%", background:"white", borderRadius:8}}
            onChange={(event)=> setComentaryData(event.target.value)}
          >
          </TextField>
        </Grid>
        <Grid style={{marginTop:10}}>
          <Button
            type='submit'
            variant="outlined"
            color="primary"
            style={{ 
              outline:"none", 
              color:"white", 
              marginTop:5,
            }}
           >
            comentar
          </Button>
        </Grid>
       </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={messageSnack}
        action={action}
      />
    </Box>
  );
}
