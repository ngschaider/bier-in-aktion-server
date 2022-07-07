import { Arg, Query, Resolver } from "type-graphql";
import Product from "../models/Product";

@Resolver(Product)
class ProductResolver {
    @Query(() => [Product])
    async getProducts() {
        return await Product.find();
    }

    @Query(() => Product)
    async getProduct(@Arg("id") id: number) {
        return await Product.findOne({
            where: { id },
        });
    }
}

export default ProductResolver;