import request from "request-promise";

import Spider from "./Spider";
import Product from "../models/Product";
import Market from "../models/Market";

export default class BillaSpider extends Spider {

    marketType = "billa";

    url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    async getProducts(): Promise<Product[]> {
        const market = await this.getAssociatedMarket();

        const products = [];
        const body = await request(this.url, {json: true});

        body.tiles.forEach(rawProduct => {
            const data = rawProduct.data;

            const product = new Product();
            product.name = data.name;
            product.brand = data.brand;
            product.originalPrice = data.price.normal;
            product.salePrice = data.price.sale;
            product.foreignId = data.articleId;
            product.market = market;
            product.imageUrl = "https://files.billa.at/files/artikel/" + product.foreignId + "_01__150x150.jpg";

            products.push(product);
        });
        return products;
    }


}