import { Fragment } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

function Copyright() {
    return (
      <Typography variant="body2" align="center" color={"ButtonHighlight"}>
        {'Copyright © '}
        <Link color="inherit" href="https://peluditostrendyambientepruebas.netlify.app/inicio/">
          peluditostrendyambientepruebas.netlify.app/inicio
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default function Footer(){
    return(
    <Fragment>
          <Divider sx={{ borderColor: "gray"}}/>
          <Box 
          sx={{ p: 5, mb:4 }} 
          component="footer"
          style={{backgroundColor: '#023c50'}}
          >
          <Typography variant="h6" align="center" gutterBottom color={"ButtonHighlight"}>
            Peluditos trendy
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            component="p"
            color={"ButtonHighlight"}
          >
            visitanos en nuestras redes 
          </Typography>
          <Copyright />
        </Box>
    </Fragment>
    )
  }