import express from "express";
import { ApolloServer } from '@apollo/server';
import bodyparser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from "@prisma/client";
import prisma from "../client/db";
import cors from 'cors';


import { User } from './user';
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";

async function initServer() {
    
    const app = express();

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
            
        } ,
        introspection: true, // Enable schema introspection
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req }) => {

            return {
                user: req.headers.authorization
                        ? JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1])
                        : undefined
            }

        
          }
          
}));

    return app;

}

export { initServer };