import request from "request-promise";

import Spider from "./Spider";
import Product from "../models/Product";
import Market from "../models/Market";

export default class BillaSpider extends Spider {

    marketType = "billa";

    url: string;
    market: Market;

    constructor(url: string) {
        super();
        this.url = url;
    }

    async getProducts(): Promise<Product[]> {
        const market = this.getAssociatedMarket();

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
            product.market = this.market;

            products.push(product);
        });
        return products;
    }


}