import { Schema, model } from "mongoose";
import { IAdmin } from "../types/document/admin";

const IAdminSchema = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
}, {timestamps: true});

export const AdminSchema = model<IAdmin>('admin-schema', IAdminSchema);