import { UserProvider } from "contexts/UserContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import 'utils/chart-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;


