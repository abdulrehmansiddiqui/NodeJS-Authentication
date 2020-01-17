//npm init
//npm install bcrypt express jsonwebtoken mongoose body-parser
// npm install nodemon
//nodemon index

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000

const { mongoUrl } = require('./key')

require('./models/User')

const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo db finally")
})

mongoose.connection.on('error', (err) => {
    console.log("This is error", err)
})

app.listen(PORT, () => {
    console.log("Server Running " + PORT)
})