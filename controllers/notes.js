import Note from "../models/notes.js"


export const getNotes = async (req, res) =>{
    try {
        const notes = await Note.find({})
        res.status(200).json({notes})
    } catch (error) {
        res.status(500).json({msg: error})
    }

}

export const deleteNote = async (req, res) =>{
    try {
        const {id:noteID, userId} = req.params //destructuring and giving the id an alias for easier identification

        const note = await Note.findOneAndDelete({_id:noteID, userId: userId})// command to delete a single note from db

        if (!note) {
            return res.status(404).json({ msg: `No note with id ${noteID}` })
        }
        res.status(200).json({note})

    } catch (error) {
        res.status(500).json({msg: error})
    }
}

export const addNote = async (req, res) => {

    const { userId, title, content } = req.body

    const newNote = new Note({
        userId,
        title,
        content,
        likes: {}
    })

    try {
        await newNote.save()
        const note = await Note.find()
        res.status(201).json({note})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

/* UPDATE */
export const likeNote = async (req, res) => {
    try {

        const { id } = req.params
        const {userId} = req.body
        const note = await Note.findById(id)
        const isLiked = note.likes.get(userId)

        if (isLiked) {
            note.likes.delete(userId)
        } else {
            note.likes.set(userId, true)
        }

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { likes: note.likes},
            {new: true}
        )

        res.status(200).json(updatedNote)
        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}