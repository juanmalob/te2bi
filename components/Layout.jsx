
import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Header from './Header'
import { useSession } from "next-auth/client"

export default function Layout({ children, title, description, home }) {
    const [session, loading] = useSession()

    if (session) {
                return (
                    <div className="container">
                        <Head>
                            <link rel="icon" href="/favicon.ico"/>
                            <title>{title}</title>
                            <meta
                                name="description"
                                content={description}
                            />
                        </Head>

                        <Header home={home} >
                        </Header>


                        <main>{children}</main>


                        <br/>

                        {!home && (
                            <div className={styles.backToHome}>
                            <Link href="/">
                                <a>← Volver home</a>
                            </Link>
                            </div>
                        )}

                        <footer className="container text-center">

                            <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Powered by{' '}
                            <span className={styles.logo}>
                                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                            </span>
                            </a>

                        </footer>
                    </div>
                )
    }
    else
    {
        //No hemos iniciado sesion
        return (
            <div className="container">
            <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <title>{title}</title>
                    <meta
                        name="description"
                        content={description}
                    />
            </Head>

            <Header home={home} >
            </Header>
            </div>
            )
    }
}


Layout.defaultProps = {
    title: "Next.js | Intranet",
    description: "descripción del sitio"
}