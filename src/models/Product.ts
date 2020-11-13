import {Entity, Column, OneToOne} from "typeorm";

import Market from "./Market";
import Model from "./Model";

@Entity()
export default class Product extends Model {

    @Column()
    brand: string;

    @Column()
    name: string;

    @Column()
    originalPrice: number;

    @Column()
    salePrice: number;

    @Column()
    foreignId: number;

    @OneToOne(() => Market)
    market: Market;

}
