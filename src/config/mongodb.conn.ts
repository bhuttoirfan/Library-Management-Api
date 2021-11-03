import { connection, connect } from "mongoose";

export class DbMongo {
    constructor() {}

    connect(h: string, dbName: string, u?: string, pass?: string) {
        
        let connectionUri = `mongodb://${h}/${dbName}`;

        if(u != undefined && pass != undefined) {
            // mongodb+srv://Irfan-Khan:<password>@cluster0.bqp57.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
            connectionUri = `mongodb+srv://${u}:${pass}@cluster0.bqp57.mongodb.net/${dbName}?retryWrites=true&w=majority`
        }

        connect(connectionUri, (err: any) => {
            if(err) {
                console.log(err)
                console.log('connection failed to database');
            }else {
                console.log('connection successful with database');
            }
        })
    }
}

export const MonStatConnection = connection.readyState;