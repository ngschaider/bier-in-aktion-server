import MarketType from "../MarketType";
import markets from "../markets";
import Market from "../Market";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Market)
class MarketResolver {

    @Query(() => [Market])
    async getMarkets() {
        return markets;
    }

    @Query(() => Market)
    async getMarket(@Arg("type") type: string) {
        return markets[type as MarketType];
    }
}

export default MarketResolver;