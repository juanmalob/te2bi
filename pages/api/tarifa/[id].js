
import conectarDB from "../../../lib/dbConnect"
import Tarifa from "../../../models/Tarifa"

export default async function handler(req, res) {
  
  //conectar a la bbdd
  await conectarDB()
  
  //GET api/tarifa/:id (obtener un id y listarlo)
  //la api viene bloqueada con los CORS y solo se pueden hacer peticiones 
  //desde su api de next.
  const {method, query: {id} } = req
  switch(method){
    case 'GET':
      try {

            const tarifa = await Tarifa.findById(id).lean()
            if(!tarifa){
                return res.status(404).json({success: false, error: 'No se encuenta.'})
            }
            return res.json({success:true, data: tarifa })
      }catch(error){
        return res.status(404).json({success: false, error: 'No se encuenta.'})
      }
    //DELETE api/tarifa/:id (elimina el doc con la id)
    case 'DELETE':
        try {
              //devuelve la tarifa que va a eliminar.
              const tarifa = await Tarifa.findByIdAndDelete(id)
              if(!tarifa){
                  return res.status(404).json({success: false, error: 'No se encuenta.'})
              }
              return res.json({success:true, data: tarifa })
        }catch(error){
          return res.status(404).json({success: false, error: 'No se encuenta.'})
        }
    //PUT api/tarifa/:id (modificar el doc con la id)
    case 'PUT':
        try {
              //devuelve la tarifa que va a eliminar.
              //new true nos devolvera la tarifa modificada
              //runValidators ejecutará las validaciones de la BBDD.
              const tarifa = await Tarifa.findByIdAndUpdate(
                  id,
                  req.body,
                  {
                      new: true,
                      runValidators: true
                  }
              )
              if(!tarifa){
                  return res.status(404).json({success: false, error: 'No se encuenta.'})
              }
              return res.json({success:true, data: tarifa })
        }catch(error){
          return res.status(404).json({success: false, error})
        }
    default:
      return res.status(500)
                .json({success: false, error: 'Fallo del servidor'})
  }
}

