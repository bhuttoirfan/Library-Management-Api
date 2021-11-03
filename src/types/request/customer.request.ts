import { IOrder } from "../order";

export interface SaveReqCustomer {
    name : string;
    email : string;
    password: string;
    order: IOrder[];
    totalFees: number;
}

export interface UpdateReqCustomer {
    _id: string;
    name : string;
    email : string;
    password: string;
    order: IOrder[];
    totalFees: number;
}

export interface GetCustomer {
    _id: string;
}

export interface DeleteCustomer {
    _id: string;
}