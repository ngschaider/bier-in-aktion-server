import request from "request-promise";

import Product from "../models/Product";
import Spider from "./Spider";

export default class SparSpider extends Spider {

    marketType = "spar";

    url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    async getProducts(): Promise<Product[]> {
        console.log("Running SparSpider");

        const market = await this.getAssociatedMarket();

        const products = [];
        const body = await request(this.url, {json: true});

        body.products.results.forEach(data => {
            const product = new Product();
            product.brand = data.title;
            product.name = data["product-name"];

            const replace = product.brand + " ";
            if(product.name.startsWith(replace)) {
                product.name = product.name.substring(replace.length, product.name.length);
            }

            product.originalPrice = parseFloat(data["product-price"]);

            if(data.isOnPromotion === "true") {
                const insteadOf = data["product-insteadofprice"];
                product.salePrice = parseFloat(insteadOf.substring("statt ".length, insteadOf.length));
            } else {
                product.salePrice = product.originalPrice;
            }
            if(product.salePrice === NaN || product.originalPrice === NaN) {
                console.log(data);
            }
            product.description = data.description;
            product.market = market;
            product.imageUrl = data["teaser-image"];

            if(product.salePrice !== product.originalPrice) {
                products.push(product);
            }
        });
        return products;
    }


}