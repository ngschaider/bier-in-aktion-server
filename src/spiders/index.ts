import Spider from "./Spider";
import BillaSpider from "./BillaSpider"
import SparSpider from "./SparSpider"

const scrapers: Spider[] = [
    new BillaSpider("https://www.billa.at/api/search/full?searchTerm=bier&pageSize=1000"),
    //new SparSpider("https://sp1004e4e6.guided.lon5.atomz.com/?q=bier&category=products&count=1000")
]

const getProducts = async () => {
    const products = [];

    scrapers.forEach(scraper => {
        products.concat(scraper.getProducts());
    });

    return products;
}

export default {
    getProducts,
};