import {Entity, Column, ManyToOne} from "typeorm";

import Model from "./Model";

@Entity()
export default class Market extends Model {

    @Column()
    name: String;

}
