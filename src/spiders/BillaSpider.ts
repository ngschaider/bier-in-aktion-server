import request from "request-promise";

import Spider from "./Spider";
import Product from "../models/Product";

export default class BillaSpider extends Spider {

    marketType = "billa";

    url = "https://www.billa.at/api/search/full?searchTerm=bier&pageSize=1000";

    blacklistedIds = [ 
        "00-414102", // "Da komm ich her! Bierrettich aus Österreich" Nr. 143
        "00-491896", // "Haas Stiegl Biersenf" Nr. 144
        "00-911108", // "Almsenner Pinzgauer Bierkäse" Nr. 145
        "00-590286", // "Oswald Steinpilze halbiert" Nr. 146
    ]

    async getProducts(): Promise<Product[]> {
        console.log("Running BillaSpider");

        const market = await this.getAssociatedMarket();

        const products = [];
        const body = await request(this.url, {json: true});

        body.tiles.forEach(rawProduct => {
            const data = rawProduct.data;

            const product = new Product();
            product.brand = data.brand;
            product.name = data.name;

            const replace = product.brand + " ";
            if(product.name.startsWith(replace)) {
                product.name = product.name.substring(replace.length, product.name.length);
            }

            product.originalPrice = parseFloat(data.price.normal);
            product.salePrice = parseFloat(data.price.sale);
            product.foreignId = data.articleId;
            product.market = market;
            product.description = data.description;
            product.imageUrl = "https://files.billa.at/files/artikel/" + product.foreignId + "_01__150x150.jpg";

            if(data.price.priceAdditionalInfo) {
                product.additionalInfo = data.price.priceAdditionalInfo.vptxt;
            }

            if(product.salePrice !== product.originalPrice && !this.blacklistedIds.includes(product.foreignId) ) {
                products.push(product);
            }
        });
        return products;
    }


}