
import Author from '../../db/model/author.model.js'
//POST request to create a new author.
export const addAuthor= async (req, res) =>{
    try {
        const { name, bio, birthDate } = req.body;
        const newAuthor = new Author({
            name,
            bio,
            birthDate
        });
        const savedAuthor = await newAuthor.save();
        res.status(201).json(savedAuthor); 
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
}

// //GET request to retrieve all author.
export const allAuthors= async (req, res) =>{
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    try {
        const authors = await Author.find()
                                    .skip((page - 1) * limit)
                                    .limit(limit)
                                    .exec();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//GET request to retrieve a single author by its ID.
export const author= async (req, res) =>{
    try {
        const authorId = req.params.id;
        const author = await Author.findById(authorId).populate('books'); 
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 //PATCH request to update a author by its ID.
export const updateAuthor= async (req, res) =>{
    try {
        const { name, bio, birthDate } = req.body;
        if (!name && !bio && !birthDate) {
            return res.status(400).json({ message: 'At least one field (name, bio, birthDate) must be provided to update' });
        }
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

//DELETE request to delete a Author by its ID.
export const deleteAuthor = async (req, res) =>{
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

//GET request to search authors by name or bio
export const search = async (req, res) =>{
    const { name, bio } = req.query;
    const query = {};
    if (name) {
        query.name = { $regex: name, $options: 'i' }; 
    }
    if (bio) {
        query.bio = { $regex: bio, $options: 'i' }; 
    }
    try {
        const authors = await Author.find(query);
        res.json(authors); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}

// GET request to retrieve an author by ID, including their books
export const authorBooks = async (req, res) =>{
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
}
