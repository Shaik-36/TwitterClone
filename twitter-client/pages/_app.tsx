import "@/styles/globals.css";
import {GoogleOAuthProvider} from '@react-oauth/google';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
  
  <GoogleOAuthProvider clientId="755112694604-1pr7gjs22gdevs3fuh4n1gmvrr8htce6.apps.googleusercontent.com">
    <Component {...pageProps} />
   </GoogleOAuthProvider>

  );
  
}



