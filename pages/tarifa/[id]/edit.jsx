//hace falta instalar swr de next
//npm i swr
//importamos swr
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";

import FormTarifa from "../../../components/FormTarifa";

//No se trabaja con el getServerSideProps en el servidor.
//se trabaja con apis.

const fetcher = async url => {
    const res = await fetch(url) //fetch de la url
    // If the status code is not in the range 200-209
    // we still try to parse and throw it
    if(!res.ok) { //Entra con errores 400
        const error = new Error('Error al hacer fetching de los datos')
        //Atach extra info to the error object
        error.info = await res.json()
        error.status = res.status
        throw error
    }
    const {data} = await res.json()
    return data;
}


export default function EditTarifa() {

    const router = useRouter()
    const {id} = router.query //recuperamos el valor que pasamos por parametro

    console.log(id)
    //primer parametros donde tiene que  ir 
    //segundo parametro le enviamos la funcion flecha que nos devolvera los daos de vuelta
    //esto se renderiza en el navegador. No en el servidor.
    //luego pinta en el servidor.
    //No sirve para SEO
    const {data: tarifa, error} = useSWR(id ? `/api/tarifa/${id}` : null, fetcher)

    if(error)
    {
        return (
            <div className="container mt-5 text-center">
                <h1>Error...</h1>
            </div> 
         )
    }
    if(!tarifa){
        return (
           <div className="container mt-5 text-center">
               <h1>Loading...</h1>
           </div> 
        )
    }

    const formData = {
        material:  tarifa.material,
        description: tarifa.description,
        prize: tarifa.prize
    }
    return (
        <div className="container">
            <h1>Editar Tarifa</h1>
            <FormTarifa
                formData={formData}
                formNewTarifa={false}
            >

            </FormTarifa>
        </div>
    )
}
