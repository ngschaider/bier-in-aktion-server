import { Field, ObjectType } from "type-graphql";
import MarketType from "./MarketType";

@ObjectType()
class Market {
    constructor(imageUrl: string, name: string, type: MarketType) {
        this.type = type;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    @Field()
    type: MarketType;

    @Field()
    name: string;

    @Field()
    imageUrl: string;
}


export default Market;