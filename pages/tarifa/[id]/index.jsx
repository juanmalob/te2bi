import Layout from "../../../components/Layout";
import conectarDB from "../../../lib/dbConnect";
import Tarifa from "../../../models/Tarifa";
import Link from "next/link"
import { useRouter } from "next/dist/client/router";

//esto se ejecuta en el cliente
export default function TarifaDetailPage({ success, error, tarifa }) {
    /*console.log(success)
    console.log(error)
    console.log(tarifa)*/

    const router = useRouter()

    if(!success){
        return (
            <div className="container text-center my-5">
                <h1>{error} 🕹️</h1>
                <Link href="/">
                    <a className="btn btn-success">Volver...</a>
                </Link>
            </div>
            

        )
    }


    const deleteData = async(id) => {
        console.log('VOY A BORRAR')
        console.log(id)
        try {
            await fetch(`/api/tarifa/${id}`,{
                method: 'DELETE'
            })
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        
        <Layout className="container">
            <h1> Detalle de Tarifa </h1>
            <h4> { tarifa.material} </h4>
            <p className="fw-light"> { tarifa.description }</p>
            <p className="fw-light"> { tarifa.prize }</p>
            <Link href="/tarifa">
                    <a className="btn btn-success btn-sm me-2">Volver...</a>
            </Link>
            <Link href={`/tarifa/${tarifa._id}/edit/`}>
                    <a className="btn btn-warning btn-sm me-2">Editar...</a>
            </Link>
            
            <button className="btn btn-danger btn-sm" onClick={() => deleteData(tarifa._id)}>Eliminar</button>
            

        </Layout>
        
    )
}


//SSR
//esto se ejecuta en el servidor
//ataca directamente a la BBDD sin acceder por las APIs
export async function getServerSideProps( {params} ){
    try {
      await conectarDB() //se ejecuta en el servidor
      console.log("params" )
      console.log( params.id )
      const lc_id = `${params.id}` 
      const res = await Tarifa.findById(lc_id).lean();

      if(!res){
          return { props: { success: false, error: "Tarifa no encontrada" }}
      }
      res._id = `${res._id}`
      //el lean hace que la carga de mongoose sea menor al hacer la consulta.
      console.log(res)
      console.log('conectado 🦘'  )
      return { props: { success: true, tarifa: res }}
    } catch (error) {
      console.log("Error al conectar la BBDD")
      console.log(error)
      if(error.kind === 'ObjectId')
         {return { props: { success: false, error: "Error en la peticion o id no valido"  }}}
      else{
        return { props: { success: false, error: "Error en el servidor"  }}
      }

      
    }
  }