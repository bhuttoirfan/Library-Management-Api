import { Document } from "mongoose";

export interface IBook extends Document {
    _id ?: string;
    name : string;
    desc : string;
    createdAt ?: string;
    updatedAt ?: string;
}