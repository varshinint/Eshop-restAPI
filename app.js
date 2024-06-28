const express = require('express')

const app= express()

const bodyParser = require('body-parser')

const authJwt = require('./helpers/jwt')

const morgan = require('morgan') // middleware library to display logs of  the HTTP request

// bodyparser is a middleware used to make the server to understand the json  sent by frontend (During post request)
app.use(bodyParser.json()) 

app.use(morgan('tiny')) // to display log request in speciifc format

// Middleware function is to check everything before executed in server
// check user is authnticated or not
//app.use(authJwt())

//const cors = require('cors')
//app.use(cors())
//app.options('*' , cors())

require('dotenv/config')

const api = process.env.API_URL;

//routers
const productsRouter = require('./routers/products')
const userRouter = require('./routers/users')
const orderRouter = require('./routers/orders')
const categoryRouter = require('./routers/categories')

app.use(`${api}/products`,productsRouter)
app.use(`${api}/users`,userRouter)
app.use(`${api}/orders`, orderRouter)
app.use(`${api}/categories`,categoryRouter)




const mongoose = require('mongoose')


const uri = process.env.CONNECTION_STRING
mongoose.connect(uri).then(()=>{
                    console.log("DB connected successfully")
        }).catch(err => console.log("error found,", err))

// before starting the server , we need to connect with DB
app.listen(8000, ()=>{

    console.log(api)
    console.log(uri)
    console.log("server started now on port 8000")
})