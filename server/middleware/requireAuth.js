const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded

        next()
    } catch (e) {
        console.error("JWT verification failed:", e)
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}

module.exports = requireAuth