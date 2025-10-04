
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require('dotenv').config()


exports.createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body
        console.log(username, email, password, confirmPassword)

        // await validateRegister(username, email, password, confirmPassword)
        // const hashedPassword = await hashPassword(password)
            
        const user = await User.create({
            username,
            email,
            hashedPassword: password
        })

        const token = jwt.sign(
            { id: user._id.toString(), username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: (1000 * 60 * 60 * 24 * 7)   // 1 week
        })

        return res.status(200).send({
            user: { _id: user._id, username: user.username}
        })

    } catch (e) {
        console.error(e)
        return res.status(400).send({ error: e.message})
    }
}


const validateRegister = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords must match')
    }

    const existingUsername = await User.findOne({ username })
    console.log("um, existingUsername:", existingUsername)
    if (existingUsername) {
        throw new Error('Username already in use')
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        throw new Error('Email already in use')
    }
}


const hashPassword = async (password, saltRounds = 10) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword

    } catch (e) {
        throw e
    }
}
