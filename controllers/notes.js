const Note = require("../models/notes")
const getNotes = async (req, res) =>{
    try {
        const notes = await Note.find({})
        res.status(200).json({notes})
    } catch (error) {
        res.status(500).json({msg: error})
    }

}

const deleteNote = async (req, res) =>{
    try {
        const {id:noteID} = req.params //destructuring and giving the id an alias for easier identification
        const note = await Note.findOneAndDelete({_id:noteID})// command to delete a single note from db

        if (!note) {
            return res.status(404).json({ msg: `No note with id ${noteID}` })
        }
        res.status(200).json({note})

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const addNote = async (req, res) => {

    try {
        const note = await Note.create(req.body)
        res.status(201).json({note})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getNotes,
    deleteNote,
    addNote
}