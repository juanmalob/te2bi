import Layout from "../../components/Layout"
import Link from 'next/link'


export default function index({data}) {
    return (
        <Layout
            title="Blog | Lista de post"
            description = 'Descripción de post'
        >
            <h1 className="display-2">Lista de Post</h1>

            {
                data.map((post) => (

                    <div key={post.id}>
                        <Link href={`/blog/${post.id}`}>
                        <a className="display-6">{post.id} - {post.title}</a>
                        </Link>
                        <p className="display-7">{post.body}</p>
                    </div> 

                ))

            }


        </Layout>
    )
}

//esto sólo se ejecuta en el servidor 
//se compila en el sitio del servidor
//no queda expuesto en el cliente
//No lo ve el cliente
//se pùeden poner credenciales
export async function getStaticProps() {

    try {

        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()

        return {
            props: {
                data: data
            }
        }
    } catch(error) {
        console.log(error)
    }


}
