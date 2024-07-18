
import Book from '../../db/model/book.model.js'
import Author from '../../db/model/author.model.js'


//POST request to create a new book.
export const addBook= async (req, res) =>{
    const { title, content, authorId , authorName } = req.body;
    try {
        const newBook = new Book({
            title,
            content,
            authorId ,
            authorName
        });
        const savedBook = await newBook.save();
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        author.books.push(savedBook._id); 
        await author.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//GET request to retrieve all books.
export const allBooks= async (req, res) =>{
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    try {
        const books = await Book.find()
                                .skip((page - 1) * limit)
                                .limit(limit)
                                .exec();
        res.json(books); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//GET request to retrieve a single book by its ID.
export const book= async (req, res) =>{
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//PATCH request to update a book by its ID.
export const updateBook= async (req, res) =>{
    try {
        const { title, content} = req.body;
        if (!title && !content  ) {
            return res.status(400).json({ message: 'At least one field (title, content, authorName) must be provided to update' });
        }
        const book = await Book.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true } 
        );
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//DELETE request to delete a book by its ID.
export const deleteBook = async (req, res) =>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id); 
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' }); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

//GET request to search books by title or author
export const search = async (req, res) =>{
    const { title, authorName } = req.query;
    const query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }
    if (authorName) {
        query.authorName = { $regex: authorName, $options: 'i' }; 
    }
    try {
        const books = await Book.find(query);
        res.json(books); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}