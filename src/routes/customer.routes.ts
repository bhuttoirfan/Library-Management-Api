import express from 'express'

import { GetCustomer, SaveReqCustomer, DeleteCustomer, UpdateReqCustomer } from '../types/request/Customer.request';
import { CustomerController } from '../controllers/customer.controller';
import { SaveUpdateResCustomer } from '../types/response/Customer.response';
import { auth } from '../middleware/auth.middleware';


export class CustomerRoutes {
    router: express.Router;

    constructor() {

        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        this.router.post('/saveCustomer', auth, async (req, res, next) => {
            try {
                const customer: SaveReqCustomer = req.body;
                const new_customer: SaveUpdateResCustomer = await new CustomerController().saveCustomer(customer);
                
                res.status(200).json({
                    message: new_customer
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.post('/getCustomer', auth, async(req, res, next) => {
            try{
                const get_req: GetCustomer = req.body;
                const customer: SaveUpdateResCustomer = await new CustomerController().getCustomer(get_req);

                res.send(customer);

            }catch(err) {
                next(err);
            }
        });

        this.router.get('/getCustomerList', auth, async (req, res, next) => {
            try{
                
                const customer_list: SaveUpdateResCustomer[] = await new CustomerController().getCustomerList();

                res.status(200).json({
                    customer_list
                })
            }catch(err) {
                next(err);
            }

        });

        this.router.delete('/deleteCustomer', auth, async (req, res, next) => {
            try{

                const del_req: DeleteCustomer = req.body;
                
                const del_customer = await new CustomerController().deleteCustomer(del_req);
                console.log("delete cust:" + del_customer)
                res.status(200).json({
                    message: 'Customer Deleted'
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.put('/updateCustomer', auth, async (req, res, next) => {
            try{
                const customer: UpdateReqCustomer = req.body;
                const updated_customer: SaveUpdateResCustomer = await new CustomerController().updateCustomer(customer);

                res.status(200).json({
                    message: 'Customer info Updated',
                    updated_customer
                })
            }catch(err){
                next(err);
            }
        });
    }
}

export const customer_routes_api = new CustomerRoutes().router; 