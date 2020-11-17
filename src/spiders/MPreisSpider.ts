import axios from "axios";

import Product from "../models/Product";
import Spider from "./Spider";

export default class SparSpider extends Spider {

    marketType = "unimarkt";

    url = "https://ax2ixv4hll-dsn.algolia.net/1/indexes/prod_mpreis/query?X-Algolia-API-Key=NDkwZmIwODhhMzQ1ZDI5NGQwNDgzOTI5YWMyMzI1YzllYjZlZGZmYzI5MmU1NzM0NGZjMDM5OWYyYzYyM2VkY2ZpbHRlcnM9cHVibGlzaGVkJTIwQU5EJTIwYXZhaWxhYmxlJTNBdHJ1ZSUyMEFORCUyMHByaWNlcy5lZmZlY3RpdmVBbW91bnQlMjAlM0UlMjAw&X-Algolia-Application-Id=AX2IXV4HLL&X-Algolia-Agent=Vue.js";

    async getProducts(): Promise<Product[]> {
        console.log("Running MPreisSpider");

        const market = await this.getAssociatedMarket();

        const products = [];
        const res = await axios({
            method: "POST",
            url: this.url,
            data: {
                "params": "facetFilters=category_ids%3A38118&facets=mixins.mpreisAttributes.%2A%2Cmixins.markantAttributes.%2A%2Cmixins.productCustomAttributes.%2A&hitsPerPage=1000&page=0&query=bier"
            },
        });

        res.data.hits.forEach(data => {
            const product = new Product();

            product.imageUrl = data.image;

            const splits: string[] = data.name[0].split(" ");
            product.brand = data.mixins.markantAttributes.data[0].description;
            try {
                product.name = data.mixins.mpreisAttributes.productName;
            } catch (error) {
                console.log(data);
            }
            
            product.originalPrice = data.prices[0].originalAmount;
            product.salePrice = data.prices[0].effectiveAmount;
            product.foreignId = data.objectID;
            product.description = data.description[0];
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