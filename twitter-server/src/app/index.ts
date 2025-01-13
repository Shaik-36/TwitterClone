import express from "express";
import { ApolloServer } from '@apollo/server';
import bodyparser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from "@prisma/client";
import prisma from "../client/db";

import { User } from './user';

async function initServer() {
    
    const app = express();

    app.use(bodyparser.json());


    const graphqlServer = new ApolloServer({
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
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer));

    return app;

}

export { initServer };