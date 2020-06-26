import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_HASURA_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
