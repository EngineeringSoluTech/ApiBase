 import express from 'express'
import {GetAllVideo,GetVideoName,CreateVideo,UpdateVideo,DeleteVideo} from '../controllers/videos.controller.js'

 const route = express.Router()

route.get('/', GetAllVideo)
// route.get('/:id',GetProductName)
route.post('/',CreateVideo)
//route.patch('/',CreateVideo)
// route.put('/:id',UpdateProduct)
// route.delete('/:id',DeleteProduct)

 export default route