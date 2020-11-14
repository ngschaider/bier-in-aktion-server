import {Entity, Column, ManyToOne, UpdateDateColumn, OneToMany} from "typeorm";

import Model from "./Model";
import Product from "./Product";

@Entity()
export default class Market extends Model {

    @Column()
    name: string;

    @Column()
    type: string;

    @OneToMany(() => Product, product => product.market)
    products: Product[];

}
