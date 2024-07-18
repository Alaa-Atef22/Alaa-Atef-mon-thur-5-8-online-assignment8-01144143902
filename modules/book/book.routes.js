import {Router} from 'express'
import {addBook,allBooks,book,updateBook,deleteBook,search}  from './book.controller.js'

const bookRouter = Router()


bookRouter.post('/addBook',addBook)
bookRouter.get('/allBooks',allBooks)
bookRouter.get('/search',search)
bookRouter.get('/:id',book)
bookRouter.patch('/update/:id',updateBook)
bookRouter.delete('/delete/:id',deleteBook)


export default bookRouter
