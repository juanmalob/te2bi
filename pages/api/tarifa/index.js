// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}*/
import conectarDB from "../../../lib/dbConnect"
import Tarifa from "../../../models/Tarifa"

export default async function handler(req, res) {
  
  //conectar a la bbdd
  await conectarDB()
  
  //POST api/tarifa

  const {method} = req
  switch(method){
    case 'POST':
      try {

        const tarifa = new Tarifa(req.body)
        await tarifa.save()
        return res.status(200).json({success: true, tarifa})

      }catch(error){
          console.log(error)
          return res.status(400).json({success: false, error: error})
      }
    default:
      return res.status(500).json({success: false, error: 'Fallo del servidor'})
  }
}

