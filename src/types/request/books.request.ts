export interface SaveReqBook {
    name : string;
    desc : string;
} 

export interface UpdateReqBook {
    _id ?: string;
    name : string;
    desc : string;
}

export interface GetBook {
    _id: string;
}

export interface DeleteBook {
    _id: string;
}