import { Author } from "./authorModel";

export class Blogs {
    _id?:any;
    tittle!: string;
    content!:string;
    author!:Author;
    updatedAt?:any;
    createdAt?:any;
}