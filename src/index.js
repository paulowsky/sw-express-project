require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

const port = process.env.port

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return res.status(200)
  }
  next()
})

// Auth
app.use('/', authRoutes)

// Users
app.use('/user', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => console.log(`Server running in port ${port}`))
