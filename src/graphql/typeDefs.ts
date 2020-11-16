import { gql } from "apollo-server";

export default gql`

    type Market {
        name: String!
        type: String!
        uuid: String!
    }

    type Product {
        name: String!
        brand: String!
        originalPrice: Float!
        salePrice: Float!
        market: Market!
        uuid: String!
        imageUrl: String!
        start: String
        end: String
        additionalInfo: String
    }

    type Query {
        getProducts: [Product]
        getProduct(id: ID!): Product
        getMarkets: [Market]
        getMarket(id: ID!): Market
    }
`;