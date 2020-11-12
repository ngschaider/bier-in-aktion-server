import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

createConnection().then(async connection => {    
    console.log("Connected to database");
    return server.listen({
        port: 5000,
    });
}).then(res => {
    console.log("Server running at " + res.url);
}).catch(error => {
    console.log(error);
});
