import {AdminSchema} from "../models/admin.model";
import {IAdmin} from "../types/document/admin";
import { LoginAdmin } from "../types/request/admin.request";


export class MainAdmin {
    saveAdmin(admin: IAdmin) {
        return new AdminSchema(admin).save();
    }

    getAdmin(_id: string) {
        return AdminSchema.findById(_id);
    }

    updateAdmin(admin: IAdmin) {
        return AdminSchema.findByIdAndUpdate(admin._id, admin, {new: true});
    }

    deleteAdmin(_id: string) {
        return AdminSchema.findByIdAndDelete(_id);
    }

    getAdminList() {
        return AdminSchema.find();
    }

    findAdmin(admin: LoginAdmin){
        return AdminSchema.findOne({
            email: admin.email,
            password: admin.password
        })
    }
}