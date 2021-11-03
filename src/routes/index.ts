//Key
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY2OWNmZTZhMzlkN2Y0MDQ3NGQyYzUiLCJpYXQiOjE2MzQxMTk4NTh9.HSxEcvxJVUfnrFIPB8MIzRaEhnSjUFarOxwrpUQAk7E


import { admin_routes_api } from "./admin.routes";
import { customer_routes_api } from "./customer.routes";
import { book_routes_api } from "./book.routes";

import express from 'express';

export class MainRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        this.router.use('/Admin', admin_routes_api)
        this.router.use('/customer', customer_routes_api);
        this.router.use('/Book', book_routes_api);
   }
}

export const main_api = new MainRouter().router;