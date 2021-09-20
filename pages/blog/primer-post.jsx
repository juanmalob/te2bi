import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout';

export default function primerPost() {
    return (
        <Layout
            title="Primer Post"
            description = 'Primer Post'
        
        >
   
            <h1>Articulo1</h1>
            <Image 
                src="/images/1.jpg"
                width={600}
                height={600}
                alt="Mi imagen con Image"
            >
            </Image>
            <Link href="/">
                <a>Volver a Inicio</a>
            </Link>
        </Layout>
    );
}

