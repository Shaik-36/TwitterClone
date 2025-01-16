import express from "express";
import { ApolloServer } from "@apollo/server";
import bodyparser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { User } from "./user";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";

async function initServer() {
  const app = express();

  // Middleware for parsing JSON and enabling CORS
  app.use(bodyparser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
      ${User.types}
      type Query { 
        ${User.queries}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
    introspection: true, // Enable schema introspection
  });

  // Start the GraphQL server
  await graphqlServer.start();

  // GraphQL middleware for context setup
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => {
        try {
          // Extract Authorization header
          const authHeader = req.headers.authorization;

          // Validate header format
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // console.warn("Authorization header missing or invalid format.");
            return { user: null }; // Return null if no valid token
          }

          // Extract the token and decode it
          const token = authHeader.split(" ")[1];


          const user = JWTService.decodeToken(token);

          // Handle invalid or expired tokens
          if (!user) {
            console.warn("Invalid or expired token.");
            return { user: null };
          }

          // Return the decoded user in the context
          return { user };
        } catch (error) {
          console.error("Error in context setup:", error);
          return { user: null }; // Gracefully handle unexpected errors
        }
      },
    })
  );

  return app;
}

export { initServer };
