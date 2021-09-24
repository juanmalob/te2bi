import Layout from '../../components/Layout'
import conectarDB from '../../lib/dbConnect'
import Tarifa from '../../models/Tarifa'
import Link from 'next/link'
//esto se ejecuta en el cliente
export default function TarifasList({tarifas}) {
  console.log(tarifas)
  return (



    <Layout 
      title="Home | Next.js"
      description="pagina inical de la app"
      home>
   
           
        <Link href="/tarifa/new">
          <a  className="btn btn-primary w-100 mb-2">Agregar</a>
        </Link>

        {
          tarifas.map(({_id, material, description, prize}) => (

              <div className="card mb-2" key={_id}>
                <div className="card-body">
                  <div className="h5 text-uppercase">{material}</div>
                  <p className="fw-light">{description}</p>
                  <Link href={`/tarifa/${_id}`} >
                    <a className="btn btn-success mb-2">Ver detalle</a>
                  </Link>
                </div>
              </div>
          ))
        }


    </Layout>
  )
}

//esto se ejecuta en el servidor
//ataca directamente a la BBDD sin acceder por las APIs
export async function getServerSideProps(){
    try {
      await conectarDB() //se ejecuta en el servidor
      const res = await Tarifa.find({})
  
      const tarifas = res.map(doc => {
        const tarifa = doc.toObject()
        tarifa._id = `${tarifa._id}` //convertimos el id de mongo en string para que no de error
        return tarifa
      })
      console.log(res)
      console.log('conectado 🦘'  )
      return { props: { tarifas }}
    } catch (error) {
      console.log("Error al conectar la BBDD")
      console.log(error)
      return { props: { tarifas: '123' }}
      
    }
  }
  
  
  //Si se quiere llamar a una API de next. No hacerlo con un fetch en el 
  //getServerSideProps
  //En su lugar importar la logica de la ruta de API
  
  //Diferencia entre SSR y SWR
  //SSR : Renderizando en el servidor. getServerSideProps . El servidor nos trae los datos y los pinta
  //      El seo es mejor.
  
  //SWR : El renderizado se lo lleva el navegador. Vuelve del servidor un javascript 
  //      con los datos. Luego lo pinta el navegador.
  //      SWR. Es el navegador el que pinta...se comporta como Vue pero optimizado.
  //      Se utiliza con paneles de administrador, etc
  
  //si se necesita SEO --> SSR
  //Sino se utiliza SWR
  

  