import Product from "../models/Product";
import Market from "../models/Market";

export default abstract class Spider {

    abstract marketType: string = null;

    

    async getAssociatedMarket(): Promise<Market> {
        if(this.marketType === null) {
            throw "Market Type for Spider not set!";
        }

        let market = await Market.findOne({
            where: {type: this.marketType}
        });

        if(!market) {
            market = new Market();
            market.name = this.marketType.substr(0, 1).toUpperCase() + this.marketType.substr(1, this.marketType.length - 1);
            market.type = this.marketType;
            await market.save();
        }

        return market;
    }

    async getProducts(): Promise<Product[]> {
        return [];
    }

}