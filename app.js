
import notes from './routes/notes.js'
import auth from "./routes/auth.js"
import connectDB from './db/connect.js'
import express, { urlencoded, json } from "express"
import cors from 'cors'
import dotenv from "dotenv"


const app = express()

//middleware

app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors())

//configurations
dotenv.config()


// routes

app.use("/api/notes", notes)
app.use("/api/auth", auth)

const port =  process.env.PORT || 5000


const start = async ()=>{
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()