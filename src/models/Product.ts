import {Entity, Column, OneToOne, ManyToOne} from "typeorm";

import Market from "./Market";
import Model from "./Model";

@Entity()
export default class Product extends Model {

    @Column()
    brand: string;

    @Column()
    name: string;

    @Column({type: "float"})
    originalPrice: number;

    @Column({type: "float"})
    salePrice: number;

    @Column({nullable: true})
    foreignId: string;

    @Column({type: "text"})    
    description: string;

    @ManyToOne(() => Market)
    market: Market;

    @Column()
    imageUrl: string;

    @Column({nullable: true})
    start: Date;

    @Column({nullable: true})
    end: Date;

    @Column({nullable: true})
    additionalInfo: string;

}
