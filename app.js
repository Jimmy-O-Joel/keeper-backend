
require("dotenv").config()
const notes = require('./routes/notes')
const connectDB = require('./db/connect')
const express = require("express")
const cors = require('cors')


const app = express()

//middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// routes

app.use("/api/notes", notes)

const port =  process.env.PORT || 5000


app.post("/post_note",(req, res)=>{

    const {title, content} = req.body
    console.log(title, content)
    
})

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