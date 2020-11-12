import {Entity, Column, OneToOne} from "typeorm";

import Market from "./Market";
import Model from "./Model";

@Entity()
export default class Product extends Model {

    @Column()
    name: String;

    @Column()
    originalPrice: Number;

    @Column()
    salePrice: Number;

    @Column()
    foreignId: Number;

    @OneToOne(() => Market)
    market: Market;

}
