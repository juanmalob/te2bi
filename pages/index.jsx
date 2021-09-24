import Layout from '../components/Layout'
//esto se ejecuta en el cliente
export default function Home() {
  return (



    <Layout 
      title="Home | Next.js"
      description="pagina inical de la app"
      home>
   
     
        <h1 className="display-1 text-center">
          Bienvenido a <a href="https://nextjs.org">Ascable T2b</a>
        </h1>

        <p className="display-3 text-center">
          Get started by editing{' '}
        </p>
            

    </Layout>
  )
}

