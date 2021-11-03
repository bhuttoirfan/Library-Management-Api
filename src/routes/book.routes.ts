import express from 'express';

import { BookController } from '../controllers/book.controller';
import { GetBook, UpdateReqBook, DeleteBook, SaveReqBook } from '../types/request/books.request';
import { SaveUpdateResBook } from '../types/response/books.response';

export class BookRoutes {
    router: express.Router;

    constructor() {
        
        this.router = express.Router();
        this.routes();
    }

    routes() {
        
        this.router.post('/saveBook', async (req, res, next) => {
            try{

                const book: SaveReqBook = req.body;
                const new_book: SaveUpdateResBook = await new BookController().saveBook(book);

                res.status(200).json({
                    message: new_book
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.post('/getBook', async (req, res, next) => {
            try {

                const get_req: GetBook = req.body;
                const book: SaveUpdateResBook = await new BookController().getBook(get_req);

                res.send(book);
            }catch(err) {
                next(err);
            }
        });

        this.router.get('/getBookList', async (req, res, next) => {
            try{

                const book_list: SaveUpdateResBook[] = await new BookController().getBookList();

                res.status(200).json({
                    book_list
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.put('/updateBook', async (req, res, next) => {
            try{

                const book: UpdateReqBook = req.body;
                const updated_book: SaveUpdateResBook = await new BookController().updateBook(book);
                
                res.status(200).json({
                    message: 'Book Updated',
                    updated_book
                })
            }catch(err) {
                next(err);
            }
        });

        this.router.delete('/deleteBook', async (req, res, next) => {
            try{

                const del_req: DeleteBook = req.body;
                const deleted_customer = await new BookController().deleteBook(del_req);

                res.status(200).json({
                    message: 'Book Deleted'
                })
            }catch(err) {
                next(err);
            }
        });
    }
}

export const book_routes_api = new BookRoutes().router;