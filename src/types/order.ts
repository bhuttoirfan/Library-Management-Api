import { Date } from "mongoose";

export interface IOrder {
    bookName: string;
    issuanceDate: Date;
    returnDate: Date;
    fees: number;
    fine: number;
}