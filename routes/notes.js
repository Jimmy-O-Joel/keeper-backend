import express from 'express'
import { getNotes, deleteNote, addNote, likeNote} from '../controllers/notes.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* CREATE */
router.post("/", verifyToken, addNote)

/* READ */
router.get("/", verifyToken, getNotes)


//UPDATE LIKES
router.patch("/:id/like", verifyToken, likeNote)

/* DELETE */
router.delete("/:id/:userId", verifyToken, deleteNote)


export default router