
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

const Author = mongoose.model('Author', authorSchema)
export default Author