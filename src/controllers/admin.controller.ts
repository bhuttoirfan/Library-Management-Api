import { Body, Route, Tags, Post, Delete, Get, Put, SuccessResponse, Security } from 'tsoa';
import customError from '../utils/error';

import { MainAdmin } from '../repositories/admin.repositories';
import { IAdmin } from '../types/document/admin';
import { GetAdmin, UpdateReqAdmin, SaveReqAdmin, DeleteAdmin, LoginAdmin } from '../types/request/admin.request';

import { SaveUpdateResAdmin } from '../types/response/admin.response';

@Route('Admin')
@Tags('Admin Routes')
export class AdminController {
    constructor() {}

    @Post('/saveAdmin')
    async saveAdmin(@Body() admin: SaveReqAdmin) : Promise<SaveUpdateResAdmin> {
        
        const new_admin: IAdmin =<any> await new MainAdmin().saveAdmin(<IAdmin>admin);
        if(!new_admin) throw new customError(404, 'Admin not saved');

        return <SaveUpdateResAdmin>new_admin;
    }

    @Security('api_key')
    @Put('/updateAdmin')
    async updateAdmin(@Body() admin: UpdateReqAdmin): Promise<SaveUpdateResAdmin> {
        console.log('update controller');
        const updated_admin: IAdmin =<any> await new MainAdmin().updateAdmin(<IAdmin>admin);
        if(updated_admin === null) throw new customError(404, 'Admin not updated');
        
        return <SaveUpdateResAdmin>updated_admin;
    }

    @Security('api_key')
    @Post('/getAdmin')
    async getAdmin(@Body() getReq: GetAdmin): Promise<SaveUpdateResAdmin> {
        
        const _id = getReq._id;
        const admin: IAdmin =<any> await new MainAdmin().getAdmin(_id);

        return <SaveUpdateResAdmin>admin;
    }

    @Security('api_key')
    @Get('/getAdminList')
    async getAdminList(): Promise<SaveUpdateResAdmin[]> {
        
        const admin_List: IAdmin[] = await new MainAdmin().getAdminList();
        return <SaveUpdateResAdmin[]>admin_List;
    }

    @Security('api_key')
    @Delete('/deleteAdmin')
    @SuccessResponse('200', 'Admin Deleted')
    async deleteAdmin(@Body() delReq: DeleteAdmin) {
        
        const _id = delReq._id;
        return await new MainAdmin().deleteAdmin(_id);
    }

    @Post('/loginAdmin')
    async loginAdmin(@Body() reqLogin: LoginAdmin): Promise<SaveUpdateResAdmin> {
        
        const login_admin: IAdmin =<any> await new MainAdmin().findAdmin(reqLogin); 
        if(!login_admin) throw new customError(404, 'Admin not logged in successfully');
        
        return <SaveUpdateResAdmin>login_admin;
    }

}