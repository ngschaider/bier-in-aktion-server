import { BaseEntity, BeforeInsert, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export default abstract class Model extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    uuid: String;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid();
    }

}