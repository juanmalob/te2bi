import '../styles/globals.css'
import { Provider as AuthProvider } from "next-auth/client"

// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'


function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps }
 }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>

  )
}

export default MyApp
