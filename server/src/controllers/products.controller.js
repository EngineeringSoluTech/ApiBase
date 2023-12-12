
import productModel from '../models/products.model.js'

export const GetAllProduct = async (req,res)=> {
    try { 
        const allProducts = await productModel.find()
        res.status(200).json(allProducts)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetProductName = async (req,res) => {
    try{
        const ProductId = await productModel.filter({_id:id})
        .then(Product => res.status(200).json(Product))
        console.log(ProductId);
      }catch (error) {
        res.json({message: error.message})
     }
}

export const CreateProduct = async (req, res) => {

    const productReceived = req.body
    console.log("productReceived:", productReceived);
    const ProductExist = await productModel.findOne({productName: productReceived.productName});
    
    try{
      if(productReceived.productName && productReceived.price)
      {
        if(ProductExist)
        {
            ProductExist.photo.push({
                label: productReceived.size,
                imgPath: productReceived.photo,
                price: productReceived.price
            })
            if (productReceived.size != '' || productReceived.size != '') {
                ProductExist.sizes.push(productReceived.size);
            }
            await ProductExist.save();
            res.json('Producto actualizado en la base de datos');
        }else {  
           productReceived.size != ''? productReceived.sizes = [productReceived.size] : null
           
           productReceived.photo = {
            label: productReceived.size,
            imgPath: productReceived.photo,
            price: productReceived.price
           }
           productModel.create(productReceived)
             res.json("Se ha creado un nuevo producto ");
        }
      }else{
        res.status(404).json('Ingrese datos validos')
      }
    } catch(error) {
        res.json({message: error.message})
        console.log("Error al crear el producto");
    }
}

export const UpdateProduct = async (req, res) => {
    try{
        const {id} = req.params
        const updatedProduct = await productModel.updateOne({_id:id}, req.body)
        .then(()=>res.json({"message": "Se ha actualizado el producto correctamente"}))
        console.log("producto actualizado: ", updatedProduct);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al actualizar el producto");
    }
}

export const DeleteProduct = async (req, res) => {
    try{
        const {id} = req.params
        const deletedProduct = await productModel.deleteOne({_id:id})
        .then(()=> res.json({"message": "Se ha eliminado el producto correctamente"}))
        console.log("producto eliminado: ", deletedProduct);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al eliminar el producto");
    }
}

