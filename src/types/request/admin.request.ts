export interface SaveReqAdmin{
    name : string;
    email : string;
    password: string;
}

export interface UpdateReqAdmin {
    _id: string;
    name : string;
    email : string;
    password: string;
}

export interface DeleteAdmin {
    _id: string;
}

export interface GetAdmin {
    _id: string;
}

export interface LoginAdmin {
    email: string;
    password: string;
}
