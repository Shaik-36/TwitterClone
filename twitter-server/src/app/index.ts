import express from "express";
import { ApolloServer } from '@apollo/server';
import bodyparser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';

async function initServer() {
    
    const app = express();

    app.use(bodyparser.json());

    const graphqlServer = new ApolloServer({
        typeDefs: `
                type Query { 
                    hello: String 
                }`,

        resolvers: {
            Query: {
                hello: () => "Hello World!"
            },
            
        } ,
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer));

    return app;

}

export { initServer };