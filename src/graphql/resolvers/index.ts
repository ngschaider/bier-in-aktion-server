import marketsResolver from "./markets";

export default {
    Query: {
        ...marketsResolver.Query,
    },
    Mutation: {
        ...marketsResolver.Mutation,
    }
}