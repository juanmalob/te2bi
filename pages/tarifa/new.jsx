
import Layout from "../../components/Layout"
import React from "react"
import FormTarifa from "../../components/FormTarifa"
export default function New() {

    const formData = {
        material: '',
        description: '',
        prize: '0'
    }

    return (
        <Layout className="container">
            <h1 className="my-3">Agregar Tarifa</h1>
            <FormTarifa formData={formData}>

            </FormTarifa>
            
        </Layout>
    )
}
