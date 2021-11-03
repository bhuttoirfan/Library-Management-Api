import { BookSchema } from "../models/books.model";
import { IBook } from "../types/document/books";

export class MainBook {
    saveBook(book: IBook) {
        return new BookSchema(book).save();
    }

    getBook(_id: string) {
        return BookSchema.findById(_id);
    }

    updateBook(book: IBook) {
        return BookSchema.findByIdAndUpdate(book._id, book, {new: true});
    }

    deleteBook(_id: string) {
        return BookSchema.findByIdAndDelete(_id);
    }

    getBookList() {
        return BookSchema.find();
    }
}