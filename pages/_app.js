import "../styles/global.css"
import Nav from '../components/Navigation/Nav'
import { Toaster } from "react-hot-toast";
import "../styles/global.css"
import { SWRConfig } from 'swr';
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head"
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // console.log("hey bro")
    const excludedPaths = ["/v1/[epId]/[epNum]", "/v2/epId/epNum", "/v3/[animeId]/[epId]"];
    if(excludedPaths.includes(router.pathname)) return;
    if(typeof window!== "undefined"){
      if(typeof window.hls !== "undefined" && typeof window.hls.destroy !== "undefined"){
        window.hls.destroy();
        console.log("Destroyed with pathname: ", router.pathname)
      }
    }
  },[router.pathname])

  return <>

  <SWRConfig value={ {
     revalidateOnFocus: false,
     revalidateOnReconnect: false,
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())}}
  >
<Head>
<title>Miyou - Watch Anime Free Online With English Sub and Dub</title>
</Head>
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
