import marketsResolver from "./markets";
import productsResolver from "./products";

export default {
    Query: {
        ...marketsResolver.Query,
        ...productsResolver.Query,
    },
    /*Mutation: {
        ...marketsResolver.Mutation,
        ...productsResolver.Mutation,
    }*/
}