
import Head from 'next/Head'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import Image from 'next/image'


const name = 'AscIntranet'
export default function Layout({ children, title, description, home }) {
    console.log(home)
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

            <header className="text-center">
            {home ? (
            <>
            <Image
                priority
                src="/images/1.jpg"
                className="rounded-circle"
                height={200}
                width={200}
                alt={name}
            />
            <h1 className="h1">{name}</h1>
            </>
            ) : (
            <>
            <Link href="/">
                <a>
                <Image
                    priority
                    src="/images/1.jpg"
                    className="rounded-circle"
                    height={108}
                    width={108}
                    alt={name}
                />
                </a>
            </Link>
            <h2 className="h2">
                <Link href="/">
                <a>{name}</a>
                </Link>
            </h2>
            </>
            )}
            </header>

            <br/>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <Link href="/blog">
                                  <a class="nav-link" >Blog</a>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/about">
                                  <a class="nav-link" >About</a>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/contact">
                                  <a class="nav-link" >Contacto</a>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <br/>


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


Layout.defaultProps = {
    title: "Next.js | Intranet",
    description: "descripción del sitio"
}