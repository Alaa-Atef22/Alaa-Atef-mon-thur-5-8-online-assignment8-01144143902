
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema)
export default Book
