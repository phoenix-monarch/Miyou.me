import Nav from '../components/Navigation/Nav'
import { Toaster } from "react-hot-toast";
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
  <Nav/>
  <Component {...pageProps} />
  <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#242235",
            border: "1px solid #393653",
            color: "#fff",
          },
        }}
      />
  </>
}
