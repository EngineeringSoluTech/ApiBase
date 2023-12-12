import express  from 'express';
const route = express.Router();

import {CreateComentary,GetAllComentary} from '../controllers/comentaries.controller.js'

route.get('/', GetAllComentary);
route.post('/', CreateComentary);

export default route;