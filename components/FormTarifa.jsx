import React from 'react'
import Link from "next/link"
import { useRouter } from "next/dist/client/router"

//recibimos formData que en el caso de new será con los campos vacios
//recibimos formData con los campos llenos si queremos editar los datos
//formNewTarifa por defecto sera true si no la informamos. 
export default function FormTarifa({ formData, formNewTarifa = true }) {

    //usamos el useRouter para luego meter un push para ir a la pantalla "/"
    const router = useRouter()

    /*const [form, setForm] = React.useState({
        material: '',
        description: '',
        prize: '0'
    })*/
    const [form, setForm] = React.useState({
        material: formData.material,
        description: formData.description,
        prize: formData.prize
    })

    const [message, setMessage] = React.useState([])

    const handleChange = e => {
        const {value, name} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }
    //va a prevenir lo que hace el navegador de refrescar pantalla
    //llamamos a postData
    const handleSubmit = e => {

        e.preventDefault()
        if(formNewTarifa){
            postData(form) }
        else {
            //editar data
            console.log('Presionaste el botón de editar')
            putData(form)
        }
    }

    const putData = async (form) => {
        setMessage([])
        //varios metodos para recuperar el id, pero con el router lo podemos hacer
        const {id} = router.query

        try {
            const res = await fetch(`/api/tarifa/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            console.log(data)

            if(!data.success){
                console.log("entro en el data.success false")
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage,
                        {message: error.message}
                    ])
                }
               
            }
            else {
                setMessage([])
                router.push("/")
            }
        } catch (error) {
            console.log("Error al actualizar")
            console.log(error)
        }

    }

    //utilizamos las apis
    const postData = async (form) => {
        try {
            console.log(form)
            const res = await fetch('/api/tarifa', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()
            console.log(data)

            if(!data.success){
                console.log("entro en el data.success false")
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldmessage => [
                        ...oldmessage,
                        {message: error.message}
                    ])
                }
               
            }
            else {
                router.push("/")
            }
        } catch (error) {
            console.log("erorororororo")
            console.log(error)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control my-2"
                    type="text"
                    placeholder="Material"
                    autoComplete="off"
                    name="material"
                    value={form.material}
                    onChange={handleChange} 
                />
                <input
                    className="form-control my-2"
                    type="text"
                    placeholder="descripcion"
                    autoComplete="off"
                    value={form.description}
                    onChange={handleChange} 
                    name="description"
                />
                <input
                    className="form-control my-2"
                    type="number"
                    placeholder="prize"
                    autoComplete="off"
                    value={form.prize}
                    onChange={handleChange} 
                    name="prize"
                />
                <button className="btn btn-primary w-100" type="submit">
                    {formNewTarifa ? "Agregar" : "Editar"}
                </button>
                <Link href="/">
                    <a  className="btn btn-warning w-100 mn-2">Volver...</a>
                </Link>
                {
                    message.map(({message}) => (
                        <p key={message}>{message}</p>
                    ))
                }
            </form>
        </div>
    )
}
