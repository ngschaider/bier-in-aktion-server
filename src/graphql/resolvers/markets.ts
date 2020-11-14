import Market from "../../models/Market";

export default {
    Query: {
        getMarkets: async () => {
            const markets = await Market.find({
                relations: ["products"],
            });
            return markets;
        },
        getMarket: async (parent, args, context, info) =>  {
            const market = await Market.findOne({
                where: { uuid: args.uuid },
                relations: ["products"]
            });
            return market;
        },
    },

    Mutation: {
    },
};