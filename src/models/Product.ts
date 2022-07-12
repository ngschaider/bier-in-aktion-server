import {Entity, Column, OneToOne, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import markets from "../markets";
import Market from "../Market";
import MarketType from "../MarketType";
import productImageUrls from "../productImageUrls";
import { ID, ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
class Product extends BaseEntity {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    brand!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({type: "float"})
    originalPrice!: number;

    @Field()
    @Column({type: "float"})
    discountPrice!: number;

    @Field()
    @Column()
    marketType!: MarketType;

    @Field()
    public get market(): Market {
        return markets[this.marketType];
    }

    @Field()
    public get imageUrl(): string {
        const url = productImageUrls[this.name];
        return url ?? "https://causeofaction.org/wp-content/uploads/2013/09/Not-available.gif"
    }

    @Field()
    @Column()
    startDate!: Date;

    @Field()
    @Column()
    endDate!: Date;

    @Field()
    @Column()
    additionalInfo!: string;

    @Field()
    @Column()
    description!: string;

}

export default Product;