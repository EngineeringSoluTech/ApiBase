import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from 'dotenv';

import users from '../src/routes/user.route.js'
import products from '../src/routes/products.route.js'
import login from '../src/routes/login.route.js'
import videos from '../src/routes/video.route.js'
import comentaries from '../src/routes/comentary.route.js'

import db from './database/db.js';

import configuraciones from './config/config.js'
const app = express();
const PORT = configuraciones.PORT || 4040
dotenv.config();

//static files
app.use(express.static('public'))
//middleware
app.use(cors()); //comunica la api con el servidor y ciertos dominios
app.use(morgan('dev'))
app.use(express.json()); //* middleware- analiza solicitudes entrantes con cargas JSON y se basa en body-parser


const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'https://celebrated-platypus-293fba.netlify.app', 'https://peluditostrendyambientepruebas.netlify.app'],
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

//*Rutas
app.use('/api/user', users);
app.use('/api/login', login);
app.use('/api/product', products);
app.use('/api/video', videos);
app.use('/api/comentary', comentaries);
// ***************************************************************

app.listen(PORT, ()=> {
    console.log(`conectado en el puerto: ${PORT}`);
})

export default app;