import axios from "axios";
import { Provider } from "../decorators";
import Product from "../models/Product";
import BaseProvider from "./BaseProvider";
import htmlparser from "node-html-parser";
import DateParser from "../utils/DateParser";
import puppeteer from "puppeteer";

@Provider()
class BillaProvider extends BaseProvider {

    async crawl(): Promise<Product[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://www.billa.at/aktionen-und-maerkte/flugblatt?showAccessiblePublication=true", {
            waitUntil: "networkidle2",
        });

        const body = await page.content();

        const root = htmlparser(body);
        const table = root.querySelector("table.ws-accessibility-publication__data");
        const tbody = table?.querySelector("tbody");
        const rows = tbody?.querySelectorAll("tr");

        const availabilityText = root.querySelectorAll(".ws-accessibility-publication p")[1].innerText;

        const startPrefix = "Alle Angebote gültig von";
        const startSuffix = " bis ";
        const startDateStartIndex = availabilityText.indexOf(", ", availabilityText.indexOf(startPrefix) + startPrefix.length) + 2;
        const startDateEndIndex = availabilityText.indexOf(startSuffix, startDateStartIndex);
        const startDateText = availabilityText.substring(startDateStartIndex, startDateEndIndex);
        const startDate = DateParser.parse(startDateText);

        const endPrefix = " bis ";
        const endSuffix = ", ausgenommen Wochenende Aktionen.";
        const endDateStartIndex = availabilityText.indexOf(", ", availabilityText.indexOf(endPrefix) + endPrefix.length) + 2;
        const endDateEndIndex = availabilityText.indexOf(endSuffix, endDateStartIndex);
        const endDateText = availabilityText.substring(endDateStartIndex, endDateEndIndex);
        const endDate = DateParser.parse(endDateText);

        const products: Product[] = [];

        if(rows == null) {
            throw new Error("Could not find rows.");
        }

        for(const row of rows) {
            const nameAndBrand = row.querySelector("th")?.innerText.replace(", aus Österreich", "").trim();
            const brand = nameAndBrand?.split(" ")[0]?.trim();
            const name = nameAndBrand?.split(" ").slice(1).join(" ").trim();

            const tds = row.querySelectorAll("td");
            const exclusivelyAt = tds[0].innerText.trim();
            const packagingSize = tds[1].innerText.trim();
            const packagingType = tds[2].innerText.trim();
            const discountType = tds[3].innerText.trim();
            const discountPrice = parseFloat(tds[4].innerText.replace(",", "."));
            const originalPrice = parseFloat(tds[5].innerText.replace(",", "."));
            const normalizedPrice = tds[6].innerText.trim();
            const additionalInfo = tds[7].innerText.trim();
            const category = tds[8].innerText.trim();

            if(category !== "Bier" || name == null || brand == null) {
                continue;
            }

            const product: Product = new Product();
            product.brand = brand;
            product.name = name;
            product.originalPrice = originalPrice;
            product.discountPrice = discountPrice;
            product.startDate = startDate;
            product.endDate = endDate;
            product.discountPrice = discountPrice;
            product.marketType = "billa";
            product.additionalInfo = "";
            products.push(product);
        }

        return products;
    }

}

export default BillaProvider;