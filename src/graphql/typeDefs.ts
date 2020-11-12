import { gql } from "apollo-server";

export default gql`
    type MarketGroup {
        name: String!
    }

    type Market {
        name: String!
        marketGroup: MarketGroup!
    }

    type Product {
        name: String!
        market: Market!
    }

    type Query {
        getSales: [Product]
        getProducts: [Product]
        getProduct(id: ID!): Product
    }
`;