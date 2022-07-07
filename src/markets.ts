import Market from "./Market";
import MarketType from "./MarketType";

const billa: Market = {
    type: "billa",
    name: "Billa",
    imageUrl: "images/markets/billa.png",
}

type MarketDictionary = { [key in MarketType]: Market };
const markets: MarketDictionary = {
    billa,
};

export default markets;