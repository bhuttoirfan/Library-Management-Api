import { Route, Tags, Post, Body, Put, Delete, SuccessResponse, Get } from 'tsoa';
import customeError from '../utils/error';

import { MainBook } from '../repositories/books.repositories';
import { IBook } from '../types/document/books';
import { GetBook, DeleteBook, SaveReqBook, UpdateReqBook } from '../types/request/books.request';
import { SaveUpdateResBook } from '../types/response/books.response';

@Route('book')
@Tags('Book Routes')
export class BookController {

    @Post('/saveBook')
    async saveBook(@Body() book: SaveReqBook): Promise<SaveUpdateResBook> {
        
        const new_book: IBook =<any> await new MainBook().saveBook(<IBook>book);
        if(!new_book) throw new customeError(404, 'Book not saved');

        return <SaveUpdateResBook>new_book;
    }

    @Post('/getBook')
    async getBook(@Body() getReq: GetBook): Promise<SaveUpdateResBook> {
        
        const _id = getReq._id;
        const book: IBook =<any> await new MainBook().getBook(_id);
    
        return <SaveUpdateResBook>book;
    }

    @Get('/getBookList')
    async getBookList(): Promise<SaveUpdateResBook[]> {
        
        const book: IBook[] =<any> await new MainBook().getBookList();
        
        return <SaveUpdateResBook[]>book;
    }

    @Put('/updateBook')
    async updateBook(@Body() book: UpdateReqBook) {

        const updated_book: IBook =<any> await new MainBook().updateBook(<IBook>book);
        if(!updated_book) throw new customeError(404, 'Book not updated');

        return <SaveUpdateResBook>updated_book;
    }

    @Delete('deleteBook')
    @SuccessResponse('200', 'Book deleted successfully')
    async deleteBook(@Body() delReq: DeleteBook) {
        return await new MainBook().deleteBook(delReq._id);
    }
}