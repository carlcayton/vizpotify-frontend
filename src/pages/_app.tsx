import { UserProvider } from "contexts/UserContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import 'utils/chart-config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp;

