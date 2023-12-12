import express from 'express'
import {GetAllProduct,GetProductName,CreateProduct,UpdateProduct,DeleteProduct} from '../controllers/products.controller.js'

const route = express.Router()

route.get('/', GetAllProduct)
route.get('/:id',GetProductName)
route.post('/',CreateProduct)
route.put('/:id',UpdateProduct)
route.delete('/:id',DeleteProduct)

export default route