import bcrypt, { genSalt } from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/users.js"


/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const salt = await genSalt()

        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            password: passwordHash
        })

        const user = await newUser.save()
        const token = jwt.sign({ id: user._id}, `${process.env.JWT_SECRECT}`) 
        delete user.password
        res.status(201).json({token, user})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

/* LOGGING IN */

export const login = async (req, res) => {
    try {
        
        const {username, password} = req.body

        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({msg: "User does not exist"})

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"})

        const token = jwt.sign({ id: user._id}, `${process.env.JWT_SECRECT}`) //used string literal here as a solution ??
        delete user.password
        res.status(200).json({token, user})

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}