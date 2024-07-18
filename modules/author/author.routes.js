import {Router} from 'express'
 import {addAuthor,allAuthors,author,updateAuthor,deleteAuthor,search,authorBooks} from './author.controller.js'

const authorRouter = Router()


authorRouter.post('/addAuthor',addAuthor)
authorRouter.get('/allAuthors',allAuthors)
authorRouter.get('/authorBooks/:id',authorBooks)
authorRouter.get('/search',search)
authorRouter.get('/:id',author)
authorRouter.patch('/update/:id',updateAuthor)
authorRouter.delete('/delete/:id',deleteAuthor)



export default authorRouter
