import { Schema, model } from "mongoose";
import { IBook } from "../types/document/books";

const IBookSchema = new Schema({
    name: {type: String},
    desc: {type: String}
}, {timestamps: true});

export const BookSchema = model<IBook> ('book-schema', IBookSchema);