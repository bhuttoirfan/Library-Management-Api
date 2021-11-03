import {Route, Tags, Body, SuccessResponse, Post, Put, Get, Delete, Security} from 'tsoa';
import customError from '../utils/error';

import { MainCustomer } from '../repositories/customer.repositories'; 
import { ICustomer } from '../types/document/customer';
import { GetCustomer, SaveReqCustomer, UpdateReqCustomer, DeleteCustomer } from '../types/request/customer.request';
import { SaveUpdateResCustomer } from '../types/response/customer.response';

@Route('customer')
@Tags('Customer Routes')
export class CustomerController {

    /**
     * @summary Summary for saving customer
     * @param customer 
     * @returns 
     */

    @Security('api_key')
    @Post('/saveCustomer')
    async saveCustomer(@Body() customer: SaveReqCustomer): Promise<SaveUpdateResCustomer> {
        
        let fee = 0;
        const new_customer: ICustomer =<any> await new MainCustomer().saveCustomer(<ICustomer>customer);

        

        new_customer.order.map((cur) => {
            
            fee += cur.fees + cur.fine;
        });

        new_customer.totalFees = fee;
        
        return <SaveUpdateResCustomer>new_customer;
    }

    @Security('api_key')
    @Post('/getCustomer')
    async getCustomer(@Body() getReq: GetCustomer): Promise<SaveUpdateResCustomer> {
        const customer: ICustomer =<any> await new MainCustomer().getCustomer(getReq._id);

        if(customer === null) throw new customError(404, 'Customer not  Found');

        return <SaveUpdateResCustomer>customer;
    }

    @Security('api_key')
    @Get('/getCustomerList')
    async getCustomerList(): Promise<SaveUpdateResCustomer[]> {

        const customer_list: ICustomer[] = await new MainCustomer().getCustomerList();
        return <SaveUpdateResCustomer[]>customer_list;
    } 

    @Security('api_key')
    @Put('/updateCustomer')
    async updateCustomer(@Body() customer: UpdateReqCustomer): Promise<SaveUpdateResCustomer>{

        const updated_customer: ICustomer =<any> await new MainCustomer().updateCustomer(<ICustomer>(customer));

        if(updated_customer === null) throw new customError(404, 'Customer not updated successfully.');

        return <SaveUpdateResCustomer>updated_customer;
    }
    
    @Security('api_key')
    @Delete('/deleteCustomer')
    @SuccessResponse('200', 'Customer Deleted')
    async deleteCustomer(@Body() delReq: DeleteCustomer) {
        console.log(delReq._id)
        return await new MainCustomer().deleteCustomer(delReq._id);
    }
}