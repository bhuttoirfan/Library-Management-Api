import express from 'express'
import jwt from 'jsonwebtoken'

import { GetAdmin, DeleteAdmin, UpdateReqAdmin, SaveReqAdmin, LoginAdmin } from '../types/request/admin.request';
import { AdminController } from '../controllers/admin.controller';
import { SaveUpdateResAdmin } from '../types/response/admin.response';
import { auth } from '../middleware/auth.middleware';

export class AdminRoutes {
    router: express.Router;

    constructor() {

        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        this.router.post('/saveAdmin', async (req, res, next) => {
            try {

                const admin: SaveReqAdmin = req.body;
                const new_admin: SaveUpdateResAdmin = await new AdminController().saveAdmin(admin);
                
                res.status(200).json({
                    message: new_admin
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.post('/getAdmin', auth,async(req, res, next) => {
            try{

                const get_req: GetAdmin = req.body;
                const admin: SaveUpdateResAdmin = await new AdminController().getAdmin(get_req);

                res.send(admin);
            }catch(err) {
                next(err);
            }
        });

        this.router.get('/getAdminList', auth,async (req, res, next) => {
            try{
                const admin_list: SaveUpdateResAdmin[] = await new AdminController().getAdminList();

                res.status(200).json({
                    'admin list':admin_list
                    
                })
            }catch(err) {
                next(err);
            } 
        });

        this.router.put('/updateAdmin', auth,async (req, res, next) => {
            try{
                const admin: UpdateReqAdmin = req.body; 
                console.log(admin)
                const updated_admin: SaveUpdateResAdmin = await new AdminController().updateAdmin(admin);
                
                console.log(updated_admin);
                res.status(200).json({
                    message: 'Admin info Updated',
                    updated_admin
                })
            }catch(err){
                next(err);
            }
        });

        this.router.delete('/deleteAdmin', auth,async (req, res, next) => {
            try{

                const del_req: DeleteAdmin = req.body;
                const del_admin = await new AdminController().deleteAdmin(del_req);

                res.status(200).json({
                    message: 'Admin Deleted'
                })
            }catch(err) {
                next(err);
            }
        })

        this.router.post('/loginAdmin', async (req, res, next) => {
            try {

                const auth_req: LoginAdmin = req.body;
                const auth_user: SaveUpdateResAdmin = await new AdminController().loginAdmin(auth_req);

                if(auth_user) {
                    if(auth_req.email === auth_user.email && auth_req.password === auth_user.password) {

                        return res.json({
                            token: jwt.sign({_id: auth_user._id}, 'this is the key')
                        });
                    }else {
                        res.status(400).json({
                            message: 'User info not matched'
                        });
                    }
                } else {
                    res.status(400).json({
                        message: 'User not found'
                    });
                }

            }catch(err) {
                next(err);
            }
        });
    }
}

export const admin_routes_api = new AdminRoutes().router;