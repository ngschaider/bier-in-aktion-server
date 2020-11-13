
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
        return [];
    }


}