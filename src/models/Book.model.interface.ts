import { Model } from "sequelize";

export interface BookAttributes {
   id?: string,
   isbn: string,
   title: string,
   author: string;
   year: string,
   genre: string,
   copiesAvailable: number,
   copiesTotal: number,
   publisher: string,
   deletedAt?:Date
}

export interface BookInstance extends Model<BookAttributes>, BookAttributes { }