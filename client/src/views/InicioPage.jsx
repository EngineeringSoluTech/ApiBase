import { Fragment } from 'react';
import Grid from '@mui/material/Grid';

import Navbar from '../components/Navbar'
import Login from '../components/Login';

const InicioPage = ()=> {

    return (
        <Fragment>
          <Grid container style={{width:"100vw", height: "100%"}}>
            <Navbar />
            <Login />
          </Grid>
        </Fragment>
)}

export default InicioPage;