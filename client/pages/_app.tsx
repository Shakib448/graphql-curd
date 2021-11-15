import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
