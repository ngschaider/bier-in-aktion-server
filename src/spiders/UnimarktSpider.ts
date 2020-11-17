import request from "request-promise";

import Product from "../models/Product";
import Spider from "./Spider";

export default class SparSpider extends Spider {

    marketType = "unimarkt";

    url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    async getProducts(): Promise<Product[]> {
        console.log("Running UnimarktSpider");

        const market = await this.getAssociatedMarket();

        const products = [];
        const body = await request(this.url, {json: true});

        body.RESULT.ITEMS.forEach(data => {
            const product = new Product();

            product.imageUrl = "https://shop.unimarkt.at" + data.IMAGE;
            product.brand = data.MARKE;
            product.name = data.NAME;
            product.originalPrice = data.NORMALPREIS;
            product.salePrice = data.PREIS;
            product.foreignId = data.ARTIKELID;
            product.market = market;

            const replace = product.brand + " ";
            if(product.name.startsWith(replace)) {
                product.name = product.name.substring(replace.length, product.name.length);
            }

            if(product.salePrice !== product.originalPrice) {
                products.push(product);
            }
        });
        return products;
    }


}