import { GraphQLClient } from "graphql-request";

// Check if running in the browser
const isClient = typeof window !== "undefined";

// Create a function to initialize the GraphQL client
export const createGraphQLClient = () => {
  const token = isClient ? localStorage.getItem("__twitter_token") : null;

  return new GraphQLClient("http://localhost:8000/graphql", {
    headers: token
      ? { Authorization: `Bearer ${token}` } // Include Authorization header if token exists
      : {}, // Omit Authorization header if token is not available
  });
};

// Create and export a GraphQL client instance
export const graphqlClient = createGraphQLClient();
