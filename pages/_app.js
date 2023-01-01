import Nav from '../components/Navigation/Nav'
import { Toaster } from "react-hot-toast";
import "../styles/global.css"
import { SWRConfig } from 'swr';
import "react-loading-skeleton/dist/skeleton.css";
export default function App({ Component, pageProps }) {
  return <>
  <SWRConfig value={ {
     revalidateOnFocus: false,
     revalidateOnReconnect: false,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())}}
  >


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
      </SWRConfig>
  </>
}
