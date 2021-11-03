import { CustomerSchema } from "../models/customer.model";
import { ICustomer } from "../types/document/customer";

export class MainCustomer {
    saveCustomer(customer: ICustomer) {
        return new CustomerSchema(customer).save();
    }

    getCustomer(_id: string) {
        return CustomerSchema.findById(_id);
    }

    updateCustomer(customer: ICustomer) {
        return CustomerSchema.findByIdAndUpdate(customer._id, customer, {new: true});
    }

    deleteCustomer(_id: string) {
        return CustomerSchema.findByIdAndDelete(_id);
    }

    getCustomerList() {
        return CustomerSchema.find();
    }
}