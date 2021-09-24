import NextAuth from "next-auth"
import Providers from "next-auth/providers"

//para registrar gibhub como provider https://github.com/settings/developers

const options = {
    debug: true,
    session: {},
    jwt: {},
    providers: [
        Providers.Credentials({
            name: 'AscAuth',
            credentials: {
                user: {
                    type: 'text',
                    label: 'Nombre usuario'
                },
                password: {
                    type: 'password',
                    label: 'Contraseña:'
                }
            },
            async authorize(credentials) {
                console.log(credentials)
                //creamos una API personalizado
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/ascauth`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {'Content-type': 'application/json'}

                })
                console.log("Salgo del fetch")
                const user = await res.json()
                //console.log(user)
                // JSON rta API
                if (res.ok && user)
                {
                    return user
                }


                //return useer ?? null
                return null
            }
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET

        }),
        Providers.GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,

        })
    ]



}

export default NextAuth(/*{
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
}*/options)