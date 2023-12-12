import express from 'express'
import {GetAllUser,GetUserId,CreateUser,UpdateUser,DeleteUser,AddProductsShopingCar, DeleteUserProduct} from '../controllers/user.controller.js'

const route = express.Router()

route.get('/', GetAllUser)
route.get('/:id',GetUserId)
route.patch('/shoppinCar',AddProductsShopingCar)
route.post('/',CreateUser)
route.put('/:id',UpdateUser)
route.delete('/:id',DeleteUser)
route.delete('/delete/:id',DeleteUserProduct)

export default route