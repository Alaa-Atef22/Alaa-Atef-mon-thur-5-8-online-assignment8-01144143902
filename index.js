
import express from 'express'
import "./db/dbCon.js"
import bookRouter from './modules/book/book.routes.js'
import authorRouter from './modules/author/author.routes.js'




const app = express()
const port =  3000

app.use(express.json())
app.use('/books', bookRouter)
app.use('/authors', authorRouter)





app.listen(port, () => console.log(`Example app listening on port ${port}!`))














// import express from 'express'
// // import userRouter from './modules/user/user.routes.js'

// const app = express()
// const port = process.env.PORT || 3000

// app.use(express.json())

// // app.use('/user', userRouter)
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

