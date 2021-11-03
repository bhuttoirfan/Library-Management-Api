import { Document } from "mongoose";
import { IOrder } from "../order";

export interface ICustomer extends Document {
    _id ?: string;
    name : string;
    email : string;
    password: string;
    order: IOrder[];
    totalFees: number;
    createdAt ?: string;
    updatedAt ?: string;
}