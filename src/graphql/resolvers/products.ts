import Product from "../../models/Product";

export default {
    Query: {
        getProducts: async () => {
            const products = await Product.find({ 
                relations: ["market"] 
            });
            return products;
        },
        getProduct: async (parent, args, context, info) =>  {
            const product = await Product.findOne({
                where: { uuid: args.uuid },
                relations: ["market"],
            });
            return product;
        },
    },

    Mutation: {
    },
};