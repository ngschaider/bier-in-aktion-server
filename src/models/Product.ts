import {Entity, Column, OneToOne, ManyToOne} from "typeorm";

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
    foreignId: string;

    @ManyToOne(() => Market)
    market: Market;

}
