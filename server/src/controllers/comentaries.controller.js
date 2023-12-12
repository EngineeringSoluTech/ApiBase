import ComentaryModel from '../models/comentaries.model.js'
import moment from 'moment';

export const GetAllComentary = async (req,res)=> {
  try { 
      const allcomentaries = await ComentaryModel.find()
      res.status(200).json(allcomentaries)
      //console.log(allusers);
  } catch (error) {
      res.json({message: error.message})
  }
}

export const CreateComentary = async (req, res) => {
    const comentaryReceived = req.body

    moment.locale('es');  // Configurar el idioma a español
        
    const fecha = moment("2023-08-10 08:30");
    const fechaFormateada = fecha.format('MMMM D [a las] H:mm');

    console.log(`Fecha: ${fechaFormateada}`);
    console.log(`Hora: ${horaFormateada}`);

    try{
      if(comentaryReceived.comentary && comentaryReceived.userName && comentaryReceived.userId)
      {
           const newComentary = {
            comentary: comentaryReceived.comentary,
            userPhoto: comentaryReceived.userPhoto,
            userName: comentaryReceived.userName,
            userId: comentaryReceived.userId,
            module: comentaryReceived.module,
            createdAt: fechaFormateada,
           }
           ComentaryModel.create(newComentary)
           res.json("Has comentado !");
      }else{
        res.status(404).json('Ingrese datos validos')
      }
    } catch(error) {
        res.json("error al publicar el comentario");
    }
}