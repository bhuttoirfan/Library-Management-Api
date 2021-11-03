import { IOrder } from "../order";

export interface SaveUpdateResCustomer {
    _id : string;
    name : string;
    email : string;
    password: string;
    order: IOrder[];
    totalFees: number;
    createdAt : string;
    updatedAt : string;
}