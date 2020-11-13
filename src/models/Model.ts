import { BaseEntity, BeforeInsert, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

export default abstract class Model extends BaseEntity {

    constructor(initialValues?) {
        super();
        if(initialValues) {
            Object.apply(this, initialValues);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid();
    }

    toJSON() {
        return { ...this, id: undefined };
    }

}