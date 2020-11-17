import Spider from "./Spider";
import BillaSpider from "./BillaSpider"
import SparSpider from "./SparSpider"
import UnimarktSpider from "./UnimarktSpider";
import MPreisSpider from "./MPreisSpider";

const scrapers: Spider[] = [
    new BillaSpider(),
    new SparSpider(),
    new UnimarktSpider(),
    new MPreisSpider(),
];

const getProducts = async () => {
    const products = [];

    for(const scraper of scrapers) {
        const scraperProducts = await scraper.getProducts();
        products.push(...scraperProducts);
    }

    return products;
}

export default {
    getProducts,
};