
import VideoModel from '../models/videos.model.js'

export const GetAllVideo = async (req,res)=> {
    try { 
        const allVideos = await VideoModel.find()
        res.status(200).json(allVideos)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const GetVideoName = async (req,res) => {
    try{
        const VideoId = await VideoModel.filter({_id:id})
        .then(Video => res.status(200).json(Video))
        console.log(VideoId);
      }catch (error) {
        res.json({message: error.message})
     }
}

export const CreateVideo = async (req, res) => {

    const productReceived = req.body
    const VideoExist = await VideoModel.findOne({productName: productReceived.productName});
    
    try{
      if(productReceived.productName && productReceived.price)
      {
        if(VideoExist)
        {
            VideoExist.photo.push({
                label: productReceived.sizes,
                imgPath: productReceived.photo,
                price: productReceived.price
            })
            if (productReceived.sizes) {
                VideoExist.sizes.push(productReceived.sizes);
            }
            await VideoExist.save();
            res.json('Video actualizado en la base de datos');
        }else {  
           productReceived.sizes = [productReceived.sizes]
           productReceived.photo = {
            label: productReceived.sizes,
            imgPath: productReceived.photo,
            price: productReceived.price
           }
           VideoModel.create(productReceived)
             res.json("Se ha creado un nuevo Video ");
        }
      }else{
        res.status(404).json('Ingrese datos validos')
      }
    } catch(error) {
        res.json({message: error.message})
        console.log("Error al crear el Video");
    }
}

export const UpdateVideo = async (req, res) => {
    try{
        const {id} = req.params
        const updatedVideo = await VideoModel.updateOne({_id:id}, req.body)
        .then(()=>res.json({"message": "Se ha actualizado el Video correctamente"}))
        console.log("Video actualizado: ", updatedVideo);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al actualizar el Video");
    }
}

export const DeleteVideo = async (req, res) => {
    try{
        const {id} = req.params
        const deletedVideo = await VideoModel.deleteOne({_id:id})
        .then(()=> res.json({"message": "Se ha eliminado el Video correctamente"}))
        console.log("Video eliminado: ", deletedVideo);
    } catch(error) {
        res.json({message: error.message})
        console.log("error al eliminar el Video");
    }
}

