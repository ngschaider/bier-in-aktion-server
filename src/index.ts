import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import path from "path";
import express from "express";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import scheduler from "./util/scheduler";

dotenv.config();
if(process.env.NODE_ENV === "production") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
} else {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.development") })
}

const app = express();
app.use(express.static("public"));


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

createConnection().then(async connection => {    
    console.log("Connected to database");
    return apolloServer.listen({
        port: process.env.APOLLO_PORT,
    });
}).then(res => {
    console.log("API Server running at " + res.url);

    const listener = app.listen(process.env.EXPRESS_PORT, () => {
        console.log("Content Server running on port " + process.env.EXPRESS_PORT);
    })
    scheduler();
}).catch(error => {
    console.log(error);
});
