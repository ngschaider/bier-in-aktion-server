import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

dotenv.config();

const bootstrap = async () => {
    const connection = await createConnection();
    console.log("Connected to database");
    
    const schema = await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],
    });
    const server = new ApolloServer({
        schema,
    });
    const apolloServer = await server.listen(process.env.APOLLO_PORT);
    console.log("API Server running at " + apolloServer.url);

    const app = express();
    app.use(express.static("public"));
    const listener = app.listen(process.env.EXPRESS_PORT, () => {
        console.log("Content Server running on port " + process.env.EXPRESS_PORT);
    })
};

bootstrap();



/*
(async () => {

    const billaProvider: BillaProvider = new BillaProvider();
    const products: Product[] = await billaProvider.crawl();
    for(const product of products) {
        console.log("Saving " + product.brand + " " + product.name);
        product.save();
    }

})();
*/