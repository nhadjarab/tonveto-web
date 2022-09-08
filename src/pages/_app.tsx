import '../styles/globals.css'
import type { AppProps } from 'next/app'




import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from "recoil"



function MyApp({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <Component {...pageProps} />
    <ToastContainer />

  </RecoilRoot>
}

export default MyApp
