import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token) { 
            return res.status(403).send("access denied")

        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, verified)=>{
            if (err) {
                console.log(err)
            }
            req.user = verified
        })

        next()
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}