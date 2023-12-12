
import userModel from '../models/users.models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configuraciones from '../config/config.js';
import { now } from 'mongoose';

const JWT_SECRET = configuraciones.JWT_SECRET;

export const Login = async (req, res)=> {
    const {email, password} = req.body
    console.log("body recibido desde el frontend:", email, password);
    if(!email || !password){
        return res.status(422).json({error:"please add an email or password"});
    }
    userModel.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"});
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({
                    _id:savedUser._id, 
                    email: savedUser.email,
                    fisrtName : savedUser.fisrtName,
                    lastName : savedUser.lastName,
                    rol: savedUser.rol,
                    userState: savedUser.userState,
                    lastConnection: savedUser.lastConnection,
                    age: savedUser.age,
                    Photo: savedUser.Photo,
                    addedShopingCar: savedUser.addedShopingCar,
                    lastConnection :savedUser.lastConnection,
                    favoriteProducts :savedUser.favoriteProducts,
                }, JWT_SECRET);
                res.json({token})
                //console.log("token:", token);
            }else {
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err);
        })

    })
    await userModel.findOneAndUpdate({email: email}, {$push: {lastConnection: Date(now)} }, { new: true, useFindAndModify: false }, (err, updatedUser) => {
        if (err) {
            console.error(err);
        } else {
            console.log(updatedUser.lastConnection[(updatedUser.lastConnection.length)-2]);
            console.log("ultima conexion actualizada");
        }
    });
 };

export const GetAllUser = async (req,res)=> {
    try { 
        const allusers = await userModel.find()
        res.status(200).json(allusers)
        //console.log(allusers);
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetUserId = async (req,res) => {
    try{
        const userId = await userModel.filter({_id:id})
        .then(user => res.status(200).json(user))
        console.log(userId);
      }catch (error) {
        res.json({message: error.message})
     }
}

export const CreateUser = async (req, res) => {

    const {fisrtName,lastName,email,password,repeatPassword} = req.body
    const userExist = await userModel.findOne({email});
    
    try{
      if(fisrtName && lastName && email && password && repeatPassword)
      {
        if(userExist)
        {
            res.json('este usuario ya existe en la base de datos')
            console.log(('usuario ya existe en la base de datos '));
        }else {  
            bcrypt.hash(password,12,(err, hash) => {
                const CreatedUser = new userModel({
                      fisrtName : fisrtName,
                      lastName : lastName,
                      email: email,
                      password: bcrypt.hashSync(password,12) 
                    }
                )
                CreatedUser.save();
                console.log("Se ha creado un nuevo usuario ", CreatedUser);
                res.json(CreatedUser);
                //res.json('Se ha creado un nuevo usuario')
            })
        }
      }else{
        res.status(404).json('Ingrese datos validos')
      }
    } catch(error) {
        res.json({message: error.message})
        console.log("Error al crear el usuario");
    }
}

export const UpdateUser = async (req, res) => {
    try{
        const {id} = req.params
        const updatedUser = await userModel.updateOne({_id:id}, req.body)
        .then(()=>res.json({"message": "Se ha actualizado el usuario correctamente"}))
        console.log("usuario actualizado: ", updatedUser);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al actualizar el usuario");
    }
}

export const DeleteUser = async (req, res) => {
    try{
        const {id} = req.params
        const deletedUser = await userModel.deleteOne({_id:id})
        .then(()=> res.json({"message": "Se ha eliminado el usuario correctamente"}))
        console.log("usuario eliminado: ", deletedUser);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al eliminar el usuario");
    }
}

export const DeleteUserProduct = async (req, res) => {
    // en el params voy a recibir el idUSER+idProduct+size
    // [ '6516404f72d44eba765f4108', '6516404f72d44eba765f410d', 'XL' ]

    const arrayParams = (req.params.id).split("+"); // me retornará un array separandome los parametros
    const userId = arrayParams[0];
    const productId = arrayParams[1];
    const size = arrayParams[2]

    console.log("recibiendo el _id de params",req.params.id);
    console.log("userid",arrayParams[0]);
    console.log("productid",arrayParams[1]);
    console.log("size",arrayParams[2]);

    try{
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const productIndex = user.addedShopingCar.findIndex(product => 
            product._id === productId && product.size === size
        );

        if (productIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }

        user.addedShopingCar.splice(productIndex, 1);
        await user.save();
        res.json({ message: "Producto eliminado del carrito." });

    } catch(error) {
        res.json({message: error.message})
        console.log("error al eliminar el producto");
    }
}

export const AddProductsShopingCar = async (req, res) => {
    try{
        const token = req.headers['authorization']
        const {item} = req.body
        const decodedToken = jwt.decode(token);

        console.log("item:",item);
        
        const userFound = await userModel.findOne({_id:decodedToken._id})

        console.log("userFound:", userFound);
        
        if(userFound){
            const existId = userFound.addedShopingCar.some(itm => itm._id === item._id)
            const existSize = userFound.addedShopingCar.some(itm => itm.size === item.size)
            const noBlankSelectRopa = userFound.addedShopingCar.some(itm => itm.size === '')
            console.log("noBlankSelectRopa:", noBlankSelectRopa);

            if(item && userFound.addedShopingCar.length>0 && !(existId && existSize) && !noBlankSelectRopa){
                userFound.addedShopingCar.push(item);
                await userFound.save();
                res.json('Añadido al carrito!');
            }else if(item && userFound.addedShopingCar.length==0 && (userFound.addedShopingCar.length==0? true:noBlankSelectRopa)){
                //primer producto del carrito
                userFound.addedShopingCar.push(item);
                await userFound.save();
                res.json('Genial! tu primer producto en el carrito!');
              }else{
                item.size === '' ? 
                res.json("Seleccione un item válido")
                :
                res.json("Este producto ya existe en tu carrito")
              }
        }else{
          res.json('Usuario no encontrado/ item invalido')
        }
    } catch(error) {
        res.json({error})
        console.log("error al agregar al carrito:", error);
    }
}

