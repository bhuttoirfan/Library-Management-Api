import { Schema, model } from "mongoose";
import { ICustomer } from "../types/document/customer";

const ICustomerSchema = new Schema({
    name : {type: String},
    email : {type: String},
    password: {type: String},
    order: [{
        bookName: {type: String},
        issuanceDate: {type: Date},
        returnDate: {type: String},
        fees: {type: Number},
        fine : {type: Number}
    }],
    totalFees: {type: Number}
}, {timestamps: true});

export const CustomerSchema = model<ICustomer>('customer-schema', ICustomerSchema);