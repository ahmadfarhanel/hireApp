require('dotenv').config()

const express = require('express')
const bodyparse = require('body-parser')
const app = express()

const port = process.env.PORT

const morgan = require('morgan')
const cors = require('cors')

const projectRouter = require('./src/routers/routers')
const userRouter = require('./src/routers/user')

app.use(bodyparse.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/image', express.static('./upload'))
app.use('/hireApp', userRouter)
app.use('/hireApp', projectRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port)
