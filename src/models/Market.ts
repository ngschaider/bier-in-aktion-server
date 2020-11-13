import {Entity, Column, ManyToOne, UpdateDateColumn} from "typeorm";

import Model from "./Model";

@Entity()
export default class Market extends Model {

    @Column()
    name: string;

    @Column()
    type: string;

}
