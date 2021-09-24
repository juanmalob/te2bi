import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/client"

const name = 'AscIntranet'

const desloguea = async () => {
    await signOut()

}
const loguea = async () => {

    await signIn()
    
}
export default function Header({home}) {

    //usamos un hook de user
    //const { user, mutateUser } = useUser();
    const [session, loading] = useSession()

    //asi evitamos el flash reloading. El segundo parametro del useSession es loading que nos indica si estamos cargando la sesion
    //Entonces le decimos que se estamos cargando que renderice un Null. Así no se muestra nada.
    if(loading) {
        return null
    }
    console.log(session)
    if (session) {
        return (
        <div className="mb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/">
                        <a className="navbar-brand" >Ascable-Recael</a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link href="/blog">
                                <a className="nav-link" >Blog</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about">
                                <a className="nav-link" >About</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact">
                                <a className="nav-link" >Contacto</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/tarifa">
                                <a className="nav-link" >Tarifas</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                    <span className="navbar-text">Signed in as <strong>{session.user?.email}</strong></span>
                    <button className="btn btn-light" onClick={desloguea}><span className="navbar-text">Sign out</span></button>
                </div>
                
            </nav>

        </div>
        )
    }
    return (
        <div className="mb-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link href="/">
                    <a className="navbar-brand">Ascable-Recael</a>
                    </Link>
                    <span className="navbar-text">Not signed in </span>
                <button className="btn btn-light" onClick={loguea}>Sign in</button>
                </div>
            </nav>
        </div>
    )


}
