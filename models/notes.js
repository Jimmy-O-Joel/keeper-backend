import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }, 
    likes: {
        type: Map,
        of: Boolean
    }
}, {timestamps: true})

const Note = mongoose.model("Note", NoteSchema)

export  default Note