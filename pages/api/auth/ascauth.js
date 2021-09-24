

export default function handler(request, response) {

    //POST -ok
    //GET any not OK
    console.log("Entro a la api")
    console.log(request.method)
    if (request.method !== 'POST') {
        response.status(405).end()
        return
    }

    //VALIDAR CREDENCIALES
    if (request.body.password === process.env.PASS_APP)
    {
        const userApp = {
            name: 'Paco',
            email: 'paco@jones.com',
            image: ''
        }
        console.log(userApp)
        return response.status(200).json(userApp)
    }
 
    response.status(401).end()
}


