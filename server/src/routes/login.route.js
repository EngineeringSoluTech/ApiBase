import express  from 'express';
const route = express.Router();

import {Login} from '../controllers/user.controller.js'

route.post('/', Login);

export default route;