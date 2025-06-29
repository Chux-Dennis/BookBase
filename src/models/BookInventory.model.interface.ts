import { Model } from "sequelize";

export interface BookInventoryAttributes {
    comment: string,
    adjustment: number,
    bookId?: string,
    userId: string,
    transactionType:"entry"|"removal",
    id?:string,

}

export interface BookInventoryInstance extends Model<BookInventoryAttributes>, BookInventoryAttributes { }
