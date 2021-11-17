import "./App.css";
import User from "./Components/User";
import UpdatePassword from "./Components/UpdatePassword";

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

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <User />
        <br />
        <UpdatePassword />
      </div>
    </ApolloProvider>
  );
}

export default App;
